import { MemoryDetail } from "@/app/ui/components/memory/memory-detail";
import { getPostsByPlanId } from "@/app/business/memory/memory.service";
import { getPlan } from "@/app/business/plan/plan.service";
import { MemoryPlan } from "@/app/ui/components/memory/memory-plan";
import MemoryPostModal from "@/app/ui/components/memory/memory-post.modal";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const planId =
    (searchParams.id as string) || "a61f6270-974b-44f3-b9f3-7a8ab9b145ff";
  const detailResponse = await getPostsByPlanId(planId);
  const getPlansResponse = await getPlan(planId);

  const memories =
    detailResponse.isSuccess && Array.isArray(detailResponse.data)
      ? detailResponse.data
      : [];
  const plan = getPlansResponse.data;

  return (
    <main>
      <div className="p-5">
        {plan ? (
          <MemoryPlan
            planId={plan.getId()}
            communityId={plan.getCommunityId()}
            title={plan.getTitle()}
            category={plan.getCategory()}
            startDate={plan.getStartDate()}
            endDate={plan.getEndDate()}
            locations={plan.getLocations()}
            memberNames={plan.getMemberNames()}
          />
        ) : (
          <div>플랜 데이터가 존재하지 않습니다.</div>
        )}

        {memories.length > 0 ? (
          memories.map((memory) => (
            <MemoryDetail
              key={memory.getId()}
              id={memory.getId()}
              memberId={memory.getMemberId()}
              imageUrl={memory.getImageUrl()}
              description={memory.getDescription()}
              createdAt={memory.getCreatedAt()}
            />
          ))
        ) : (
          <div>데이터가 존재하지 않습니다.</div>
        )}
      </div>
      <div className="fixed bottom-5 right-5 mb-5 flex justify-end items-end">
        <MemoryPostModal planId={planId} />
      </div>
    </main>
  );
}
