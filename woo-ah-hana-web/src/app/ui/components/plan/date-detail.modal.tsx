"use client";
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/ui/molecule/dialog/dialog";
import Form from "../../molecule/form/form-index";
import { updatePlanDate } from "@/app/business/plan/plan-update.service";
import { FormSubmitButton } from "../../molecule/form/form-submit-button";
import {message} from "antd";

interface DateDetailDilogProps {
  id: string;
}

export function DateDetailDilog({
  id,
}: DateDetailDilogProps) {
  // TODO: FormData 활용해서 날짜 업데이트 api 요청
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <Dialog>
      {contextHolder}
      <DialogTrigger asChild>
        <AchromaticButton variant={"ghost"} className="text-slate-600">
          수정
        </AchromaticButton>
      </DialogTrigger>
      <DialogContent title="모임일정 변경">
        <hr></hr>
        <div className="p-5 text-center">
          <Form id="updatedate" action={updatePlanDate} failMessageControl={"alert"}
                onSuccess={() => {
                  messageApi.open({type: 'success',
                    content: '일정 변경에 성공했습니다!',
                    duration: 1,
                    className: 'font-bold'
                  });
                  setTimeout(() => window.location.reload(), 1000);
                }}>
            <Form.TextInput value={id} id='id' className="hidden" placeholder=""/>
            <div className="grid grid-cols-1 gap-2 text-lg text-slate-500">
              <div className="grid grid-cols-[2fr_4fr]">
                <div className="text-left p-3">시작 일:</div>
                <input type="date" name="start-date" id="start-date" className="border-none"/>
              </div>
              <div className="grid grid-cols-[2fr_4fr]">
                <div className="text-left p-3">종료 일:</div>
                <input type="date" name="end-date" id="end-date" className="border-none"/>
              </div>
            </div>
            <div className="mt-7">
              <FormSubmitButton label="수정하기" position="center"/>
            </div>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
