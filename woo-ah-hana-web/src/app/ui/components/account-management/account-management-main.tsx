'use client'

import Bankbook from "../bankbook"
import { AutoTransferDialog } from "./auto-transfer.modal";
import { ChangeAccountDialog } from "./change-account.modal";

interface AccountManagementProps{
  bankName: string;
  accountNumber: string;
  accountBalance: number;
  fee: number;
  feePeriod: number;
  setAutoDeposit: boolean;
}

export function AccountManagementMain({bankName, accountNumber, accountBalance, fee, feePeriod, setAutoDeposit}:AccountManagementProps){
  return (
    <main>
      <Bankbook
        title={bankName}
        accountNumber={accountNumber}
        balance={accountBalance}
        footer={
          <div className="w-[100%] flex justify-between">
            <AutoTransferDialog accountNumber={accountNumber} fee={fee} feePeriod={feePeriod} hasAutoDeposit={setAutoDeposit}/>
            <ChangeAccountDialog accountNumber={accountNumber}/>
          </div>
          }
      />
    </main>
  )
}