export interface PaymentLogType {
    tranDate: string;
    tranTime: string;
    inoutType: string;
    tranType: string;
    printContent: string;
    tranAmt: string;
    afterBalanceAmt: string;
    branchMame: string;
}

export interface GetPlanReceiptDto {
    records: PaymentLogType[];
    totalAmt: number;       
    perAmt: number;  
}

export class PaymentLog {
    constructor(
        public tran_date: string,
        public tran_time: string,
        public inout_type: string,
        public tran_type: string,
        public print_content: string,
        public tran_amt: string,
        public after_balance_amt: string,
        public branch_name: string
    ) {
        this.tran_date = tran_date;
        this.tran_time = tran_time;
        this.inout_type = inout_type;
        this.tran_type = tran_type;
        this.print_content = print_content;
        this.tran_amt = tran_amt;
        this.after_balance_amt = after_balance_amt;
        this.branch_name = branch_name;
    }
}

export class PlanReceipt {
    constructor(
        public records: PaymentLog[],
        public totalAmt: number,
        public perAmt: number
    ) {
        this.records = records;
        this.totalAmt = totalAmt;
        this.perAmt = perAmt;
    }

    public getRecords(): PaymentLog[] {return this.records;}
    public getTotalAmt(): number {return this.totalAmt;}
    public getPerAmt(): number {return this.perAmt;}
}

export const MockLogData: PaymentLog[] = [
    {
        tran_date: "2025-01-10",
        tran_time: "09:10",
        inout_type: "IN",
        tran_type: "TRANSFER",
        print_content: "Test Transfer 1",
        tran_amt: "1000",
        after_balance_amt: "9000",
        branch_name: "Branch1"
    },
    {
        tran_date: "2025-01-10",
        tran_time: "09:10",
        inout_type: "IN",
        tran_type: "TRANSFER",
        print_content: "Test Transfer 2",
        tran_amt: "1000",
        after_balance_amt: "9000",
        branch_name: "Branch1"
    },
    {
        tran_date: "2025-01-10",
        tran_time: "09:10",
        inout_type: "OUT",
        tran_type: "TRANSFER",
        print_content: "Test Transfer 3",
        tran_amt: "1000",
        after_balance_amt: "9000",
        branch_name: "Branch1"
    },
    {
        tran_date: "2025-01-10",
        tran_time: "09:10",
        inout_type: "IN",
        tran_type: "TRANSFER",
        print_content: "Test Transfer 4",
        tran_amt: "1000",
        after_balance_amt: "9000",
        branch_name: "Branch1"
    },
    {
        tran_date: "2025-01-10",
        tran_time: "09:10",
        inout_type: "OUT",
        tran_type: "TRANSFER",
        print_content: "Test Transfer 5",
        tran_amt: "1000",
        after_balance_amt: "9000",
        branch_name: "Branch1"
    },
    {
        tran_date: "2025-01-10",
        tran_time: "09:10",
        inout_type: "IN",
        tran_type: "TRANSFER",
        print_content: "Test Transfer 6",
        tran_amt: "1000",
        after_balance_amt: "9000",
        branch_name: "Branch1"
    },
    {
        tran_date: "2025-01-10",
        tran_time: "09:10",
        inout_type: "OUT",
        tran_type: "TRANSFER",
        print_content: "Test Transfer 7",
        tran_amt: "1000",
        after_balance_amt: "9000",
        branch_name: "Branch1"
    }
];
