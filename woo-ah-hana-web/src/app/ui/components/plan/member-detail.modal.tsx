"use client";
import { Member } from "@/app/business/community/community.service";
import { updateMembers } from "@/app/business/plan/plan-update.service";
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import { Dialog, DialogTrigger } from "@/app/ui/molecule/dialog/dialog";
import { useEffect, useState } from "react";
import { message } from "antd";
import { PlanDialog } from "@/app/ui/molecule/planDialog/planDialog";
import IconClosing from "@/app/assets/img/icon-closing.png";
import { BsPlusLg } from "react-icons/bs";
import Image from "next/image";

interface MemberDetailDilogProps {
  id: string;
  memberIds: string[];
  memberNames: string[];
  communityMemberIds: string[];
  communityMemberNames: string[];
}

export function MemberDetailDilog({
  id,
  memberIds,
  memberNames,
  communityMemberIds,
  communityMemberNames,
}: MemberDetailDilogProps) {
  const [planMembers, setPlanMembers] = useState<Member[]>([]);
  const [communityMembers, setCommunityMembers] = useState<Member[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  function handleAddMember(addedMember: Member) {
    const members = [addedMember, ...planMembers];
    setPlanMembers(members);
  }

  function handleRemoveMember(removedMember: Member) {
    const members = planMembers
      .map((member) => {
        if (member.id !== removedMember.id) {
          return member;
        }
      })
      .filter((member) => {
        return member;
      });
    setPlanMembers(members as Member[]);
  }

  async function handleUpdateMember() {
    const memberIds = planMembers.map((member) => {
      return member.id;
    });
    await updateMembers(id, memberIds).then(() => {
      messageApi.open({
        type: "success",
        content: "참여 멤버 변경에 성공했습니다!",
        duration: 1,
        className: "font-bold",
      });
      setTimeout(() => window.location.reload(), 1000);
    });
  }

  useEffect(() => {
    const members: Member[] = [];
    if (memberIds.length !== memberNames.length) return;
    for (let i = 0; i < memberIds.length; i++) {
      const member: Member = { id: memberIds[i], name: memberNames[i] };
      members.push(member);
    }
    setPlanMembers(members);
  }, []);

  useEffect(() => {
    const members: Member[] = [];
    if (communityMemberIds.length !== communityMemberNames.length) return;
    for (let i = 0; i < communityMemberIds.length; i++) {
      const member: Member = {
        id: communityMemberIds[i],
        name: communityMemberNames[i],
      };
      members.push(member);

      setCommunityMembers(members);
    }
  }, []);

  return (
    <Dialog>
      {contextHolder}
      <DialogTrigger asChild>
        <AchromaticButton variant={"ghost"} className="text-slate-600">
          수정
        </AchromaticButton>
      </DialogTrigger>
      <PlanDialog className="rounded-t-2xl">
        <div className="text-start text-xl font-semibold mb-2 pl-3 pr-3">
          참여 인원 변경
        </div>
        <div className="grid grid-cols1 gap-3 p-3">
          <div className="flex flex-row">
            <Image
              src={IconClosing}
              width={30}
              height={30}
              alt="Robot Icon"
            />
            <div className="text-start font-semibold mb-2 mt-2 ml-1">
              현재 참여하는 사람들
            </div>
          </div>
          <hr></hr>
          <div className="grid grid-cols-1 gap-2 mx-3">
            {planMembers.map((member, index) => {
              return (
                <div key={index} className="grid grid-cols-[9fr_1fr]">
                  <div className="mt-2">{member.name}</div>
                  <AchromaticButton
                    variant={"outline"}
                    onClick={() => {
                      handleRemoveMember(member);
                    }}
                  >
                    삭제
                  </AchromaticButton>
                </div>
              );
            })}
          </div>

          <div>
            <hr></hr>
            <div className="flex flex-row my-3">
              <BsPlusLg className="text-gray-600 bg-gray-100 rounded-full text-2xl mt-1 p-1 mx-1" />
              <div className="text-start font-semibold mb-2 ml-1 mx-2 mt-2">
                초대하기
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 mx-3">
              {communityMembers.map((member, index) => {
                if (
                  !planMembers
                    .map((member) => {
                      return member.id;
                    })
                    .includes(member.id)
                ) {
                  return (
                    <div key={index} className="grid grid-cols-[9fr_1fr]">
                      <div className="mt-2">{member.name}</div>
                      <AchromaticButton
                        variant={"outline"}
                        onClick={() => {
                          handleAddMember(member);
                        }}
                      >
                        추가
                      </AchromaticButton>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <AchromaticButton
            onClick={async () => {
              await handleUpdateMember();
            }}
          >
            저장
          </AchromaticButton>
        </div>
      </PlanDialog>
    </Dialog>
  );
}
