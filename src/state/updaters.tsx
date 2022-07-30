import ApplicationUpdater from './application/updater'
import MulticallUpdater from './multicall/updater'
import TransactionUpdater from './transactions/updater'
import UserUpdater from './user/updater'
import DashboardUpdater from './dashboard/updater'
import RedeemUpdater from './redeem/updater'

export default function Updaters() {
  return (
    <>
      <ApplicationUpdater />
      <MulticallUpdater />
      <TransactionUpdater />
      <UserUpdater />
      <DashboardUpdater />
      <RedeemUpdater />
    </>
  )
}
