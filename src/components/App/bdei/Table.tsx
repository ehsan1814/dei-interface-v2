import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import utc from 'dayjs/plugin/utc'
import Image from 'next/image'

import Pagination from 'components/Pagination'
import ImageWithFallback from 'components/ImageWithFallback'
import { RowCenter } from 'components/Row'
import Column from 'components/Column'
import { PrimaryButton } from 'components/Button'
import BOND_NFT_LOGO from '/public/static/images/pages/bdei/BondNFT.svg'

import EMPTY_BOND from '/public/static/images/pages/bdei/emptyBond.svg'
import EMPTY_BOND_MOBILE from '/public/static/images/pages/bdei/emptyBondMobile.svg'
import LOADING_BOND from '/public/static/images/pages/bdei/loadingBond.svg'
import LOADING_BOND_MOBILE from '/public/static/images/pages/bdei/loadingBondMobile.svg'

import { formatAmount } from 'utils/numbers'
import { ButtonText } from 'pages/vest'
import { BondNFT } from 'hooks/useBondsPage'
import { getRemainingTime } from 'utils/time'
import useWeb3React from 'hooks/useWeb3'

dayjs.extend(utc)
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
`

const TableWrapper = styled.table<{ isEmpty?: boolean }>`
  width: 100%;
  overflow: hidden;
  table-layout: fixed;
  border-collapse: collapse;
  background: ${({ theme }) => theme.bg1};
  border-bottom-right-radius: ${({ isEmpty }) => (isEmpty ? '12px' : '0')};
  border-bottom-left-radius: ${({ isEmpty }) => (isEmpty ? '12px' : '0')};
`

const Row = styled.tr`
  align-items: center;
  height: 21px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text1};
`

const FirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 5px;
`

const Cell = styled.td<{
  justify?: boolean
}>`
  align-items: center;
  padding: 5px;
  height: 90px;
`

const NoResults = styled.div<{ warning?: boolean }>`
  text-align: center;
  padding: 20px;
  color: ${({ theme, warning }) => (warning ? theme.warning : 'white')};
`

const NFTWrap = styled(Column)`
  margin-left: 10px;
  align-items: flex-start;
`

const PaginationWrapper = styled.div`
  background: ${({ theme }) => theme.bg0};
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  width: 100%;
`

const CellAmount = styled.div`
  font-size: 0.85rem;
  background: ${({ theme }) => theme.deiColor};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 0.95rem;
  `};
`

// const CellDescription = styled.div`
//   font-size: 0.6rem;
//   color: ${({ theme }) => theme.text2};
// `

const Name = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text2};
  white-space: nowrap;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin-top: 12px;
  `};
`

const Value = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.text1};
  margin-top: 10px;
`

const ZebraStripesRow = styled(Row)<{ isEven?: boolean }>`
  background: ${({ isEven, theme }) => (isEven ? theme.bg2 : theme.bg1)};
`

const MaturityTimePassed = styled.div`
  & > * {
    color: ${({ theme }) => theme.yellow4};
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: flex;
    width: 100%;
    justify-content: space-between;
  `};
`

const MobileCell = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
  margin-left: 10px;
`

const MobileWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
`

const RedeemButton = styled(PrimaryButton)`
  border-radius: 8px;

  ${({ theme, disabled }) =>
    disabled &&
    `
      background: ${theme.border3};
      border: 1px solid ${theme.border1};

      &:focus,
      &:hover {
        background: inherit;
      }
  `}
`

const itemsPerPage = 10

export default function Table({
  nfts,
  isMobile,
  isLoading,
}: {
  nfts: BondNFT[]
  isMobile?: boolean
  isLoading: boolean
}) {
  const { account } = useWeb3React()

  const [offset, setOffset] = useState(0)

  const paginatedItems = useMemo(() => {
    return nfts.slice(offset, offset + itemsPerPage)
  }, [nfts, offset])

  const pageCount = useMemo(() => {
    return Math.ceil(nfts.length / itemsPerPage)
  }, [nfts])

  const onPageChange = ({ selected }: { selected: number }) => {
    setOffset(Math.ceil(selected * itemsPerPage))
  }

  return (
    <>
      <Wrapper>
        <TableWrapper isEmpty={paginatedItems.length === 0}>
          <tbody>
            {paginatedItems.length > 0 &&
              paginatedItems.map((nft: BondNFT, index) => (
                <TableRow key={index} index={index} nft={nft} isMobile={isMobile} />
              ))}
          </tbody>
          {paginatedItems.length === 0 && (
            <tbody>
              <tr>
                <td>
                  <div style={{ margin: '0 auto' }}>
                    {isLoading ? (
                      <Image src={isMobile ? LOADING_BOND_MOBILE : LOADING_BOND} alt="loading-bond" />
                    ) : (
                      <Image src={isMobile ? EMPTY_BOND_MOBILE : EMPTY_BOND} alt="empty-bond" />
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  {!account ? (
                    <NoResults warning>Wallet is not connected!</NoResults>
                  ) : isLoading ? (
                    <NoResults>Loading...</NoResults>
                  ) : (
                    <NoResults>No DEI bond NFT found</NoResults>
                  )}
                </td>
              </tr>
            </tbody>
          )}
        </TableWrapper>
        <PaginationWrapper>
          {paginatedItems.length > 0 && (
            <Pagination count={nfts.length} pageCount={pageCount} onPageChange={onPageChange} />
          )}
        </PaginationWrapper>
      </Wrapper>
    </>
  )
}

function TableRow({ nft, index, isMobile }: { nft: BondNFT; index: number; isMobile?: boolean }) {
  const { tokenId, deiAmount, redeemTime } = nft
  const [diff, day] = useMemo(() => {
    if (!nft.redeemTime) return [null, null]
    const { diff, day } = getRemainingTime(nft.redeemTime)
    return [diff, day]
  }, [nft])

  // subtracting 10 seconds to mitigate this from being true on page load
  const lockHasEnded = useMemo(() => dayjs.utc(redeemTime).isBefore(dayjs.utc().subtract(10, 'seconds')), [redeemTime])

  function getMaturityTimeCell() {
    if (!lockHasEnded)
      return (
        <>
          <Name>Maturity Time</Name>
          <Value>{dayjs.utc(redeemTime).format('LLL')}</Value>
        </>
      )
    return (
      <MaturityTimePassed>
        <Name>Expired in</Name>
        <Value>{dayjs.utc(redeemTime).format('LLL')}</Value>
      </MaturityTimePassed>
    )
  }

  function getTableRow() {
    return (
      <>
        <Cell>
          <RowCenter>
            <ImageWithFallback src={BOND_NFT_LOGO} alt={`Bond logo`} width={30} height={30} />
            <NFTWrap>
              <CellAmount>DEI Bond #{tokenId}</CellAmount>
            </NFTWrap>
          </RowCenter>
        </Cell>

        <Cell>
          <Name>Bond Value</Name>
          <Value>{formatAmount(parseFloat(deiAmount ? deiAmount.toString() : ''), 8)} bDEI</Value>
        </Cell>
        {/* 
        <Cell>
          <Name>Claimable DEI</Name>
          <Value>{'N/A'}</Value>
        </Cell> */}

        <Cell style={{ padding: '5px 10px' }}>{getMaturityTimeCell()}</Cell>

        <Cell style={{ padding: '5px 10px' }}>
          <RedeemButton disabled={diff && diff > 0 ? true : false} onClick={() => console.log('')}>
            <ButtonText>{diff && diff > 0 ? `Redeem in ${day} days` : 'Redeem bDEI'}</ButtonText>
          </RedeemButton>
        </Cell>
      </>
    )
  }

  function getTableRowMobile() {
    return (
      <MobileWrapper>
        <FirstRow>
          <RowCenter>
            <ImageWithFallback src={BOND_NFT_LOGO} alt={`Bond logo`} width={30} height={30} />
            <NFTWrap>
              <CellAmount>DEI Bond #{tokenId}</CellAmount>
            </NFTWrap>
          </RowCenter>

          <RowCenter style={{ padding: '5px 10px' }}>
            <RedeemButton disabled={diff && diff > 0 ? true : false} onClick={() => console.log('')}>
              <ButtonText>{diff && diff > 0 ? `Redeem in ${day} days` : 'Redeem BDEI'}</ButtonText>
            </RedeemButton>
          </RowCenter>
        </FirstRow>

        <MobileCell>
          <Name>Bond Value</Name>
          <Value>{formatAmount(parseFloat(deiAmount ? deiAmount.toString() : ''), 8)} bDEI</Value>
        </MobileCell>

        {/* <MobileCell>
          <Name>Claimable DEI</Name>
          <Value>{'N/A'}</Value>
        </MobileCell> */}

        <MobileCell>{getMaturityTimeCell()}</MobileCell>
      </MobileWrapper>
    )
  }

  return <ZebraStripesRow isEven={index % 2 === 0}>{isMobile ? getTableRowMobile() : getTableRow()}</ZebraStripesRow>
}
