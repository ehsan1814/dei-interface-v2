import { useCallback, useMemo } from 'react'
import { TransactionResponse } from '@ethersproject/abstract-provider'

import useWeb3React from './useWeb3'
import { useFujinDeployerContract } from './useContract'

import { useTransactionAdder } from 'state/transactions/hooks'
import { CollateralPoolErrorToUserReadableMessage } from 'utils/parseError'
import toast from 'react-hot-toast'
import { calculateGasMargin } from 'utils/web3'

export enum LendingCallbackState {
  INVALID = 'INVALID',
  PENDING = 'PENDING',
  VALID = 'VALID',
}

export default function useLendingCallback(
  name: string,
  rateContract: string[],
  immutables: any,
  liquidationFee: string,
  isBorrowerWhitelistActive: boolean,
  isLenderWhitelistActive: boolean
): {
  state: LendingCallbackState
  callback: null | (() => Promise<string>)
  error: string | null
} {
  const { account, chainId, library } = useWeb3React()
  const addTransaction = useTransactionAdder()
  const fujinDeployerContract = useFujinDeployerContract()

  const constructCall = useCallback(() => {
    try {
      if (
        !account ||
        !library ||
        !fujinDeployerContract ||
        !name ||
        !rateContract ||
        !immutables ||
        !liquidationFee ||
        !isBorrowerWhitelistActive ||
        !isLenderWhitelistActive
      ) {
        throw new Error('Missing dependencies.')
      }

      const args = [name, rateContract, immutables, liquidationFee, isBorrowerWhitelistActive, isLenderWhitelistActive]

      return {
        address: fujinDeployerContract.address,
        calldata: fujinDeployerContract.interface.encodeFunctionData('deployLending', args) ?? '',
        value: 0,
      }
    } catch (error) {
      return {
        error,
      }
    }
  }, [
    account,
    library,
    fujinDeployerContract,
    name,
    rateContract,
    immutables,
    liquidationFee,
    isBorrowerWhitelistActive,
    isLenderWhitelistActive,
  ])

  return useMemo(() => {
    if (!account || !chainId || !library || !fujinDeployerContract) {
      return {
        state: LendingCallbackState.INVALID,
        callback: null,
        error: 'Missing dependencies',
      }
    }
    if (
      !name ||
      !rateContract ||
      !immutables ||
      !liquidationFee ||
      !isBorrowerWhitelistActive ||
      !isLenderWhitelistActive
    ) {
      return {
        state: LendingCallbackState.INVALID,
        callback: null,
        error: 'Missing inputs',
      }
    }

    return {
      state: LendingCallbackState.VALID,
      error: null,
      callback: async function onCreate(): Promise<string> {
        console.log('onCreate callback')
        const call = constructCall()
        const { address, calldata, value } = call

        if ('error' in call) {
          console.error(call.error)
          if (call.error.message) {
            throw new Error(call.error.message)
          } else {
            throw new Error('Unexpected error. Could not construct calldata.')
          }
        }

        const tx = !value
          ? { from: account, to: address, data: calldata }
          : { from: account, to: address, data: calldata, value }

        console.log('CREATE LENDING POOL TRANSACTION', { tx, value })

        const estimatedGas = await library.estimateGas(tx).catch((gasError) => {
          console.debug('Gas estimate failed, trying eth_call to extract error', call)

          return library
            .call(tx)
            .then((result) => {
              console.debug('Unexpected successful call after failed estimate gas', call, gasError, result)
              return {
                error: new Error('Unexpected issue with estimating the gas. Please try again.'),
              }
            })
            .catch((callError) => {
              console.debug('Call threw an error', call, callError)
              toast.error(CollateralPoolErrorToUserReadableMessage(callError))
              return {
                error: new Error(callError.message),
              }
            })
        })

        if ('error' in estimatedGas) {
          throw new Error('Unexpected error. Could not estimate gas for this transaction.')
        }

        return library
          .getSigner()
          .sendTransaction({
            ...tx,
            ...(estimatedGas ? { gasLimit: calculateGasMargin(estimatedGas) } : {}),
            // gasPrice /// TODO add gasPrice based on EIP 1559
          })
          .then((response: TransactionResponse) => {
            console.log(response)
            const summary = `Create ${name} pool`
            addTransaction(response, { summary })

            return response.hash
          })
          .catch((error) => {
            // if the user rejected the tx, pass this along
            if (error?.code === 4001) {
              throw new Error('Transaction rejected.')
            } else {
              // otherwise, the error was unexpected and we need to convey that
              console.error(`Transaction failed`, error, address, calldata, value)
              throw new Error(`Transaction failed: ${error.message}`)
            }
          })
      },
    }
  }, [
    account,
    chainId,
    library,
    fujinDeployerContract,
    name,
    rateContract,
    immutables,
    liquidationFee,
    isBorrowerWhitelistActive,
    isLenderWhitelistActive,
    constructCall,
    addTransaction,
  ])
}
