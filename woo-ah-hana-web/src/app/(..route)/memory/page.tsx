import { PlanListItem } from "@/app/ui/components/plan/plan-list-item";
import {getCompletedPlans} from "@/app/business/memory/memory.service";
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import { IoAdd } from "react-icons/io5";
import Link from "next/link";
import MemoryReceiptModal from "@/app/ui/components/memory/memory-receipt.modal";

export default async function Home({searchParams}:{searchParams: { [key: string]: string | string[] | undefined }}){

    const getPlansResponse = await getCompletedPlans(searchParams.id as string)
    const plans = getPlansResponse.data;

    // TODO: Icon은 랜덤 ?
    const PlansView: React.ReactNode[] | undefined = plans?.map((item, index)=>{

        return (
            <main key={index} >
                <PlanListItem
                    planId={item.getId()}
                    title={item.getTitle()}
                    category={item.getCategory()}
                    startDate={item.getStartDate()}
                    endDate={item.getEndDate()}
                    locations={item.getLocations()}/>
            </main>
        )
    })

    return(
        <main>
            {/* 임시 import */}
            <MemoryReceiptModal planId='b34d0cc1-46fd-4bb7-a192-cf5fda1fc92f' />
            <div className="h-full flex flex-col">
                <div className="flex-1 overflow-y-auto p-5">
                    <div className="grid grid-rows-1 gap-3">
                        {plans ? PlansView : <div>데이터가 존재하지 않습니다.</div>}
                    </div>
                </div>
                <div className="fixed bottom-5 right-5 mb-5 flex justify-end items-end">
                    <Link href={"plan/set"}>
                        <AchromaticButton className="h-14 w-14 rounded-full">
                            <IoAdd color="white" size={40} />
                        </AchromaticButton>
                    </Link>
                </div>
            </div>
        </main>
    )
}