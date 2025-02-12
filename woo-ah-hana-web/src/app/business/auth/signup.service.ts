'use server'
import { z } from 'zod';
import { FormState } from '@/app/ui/molecule/form/form-root';
import { BankName, convertBankNameToCode } from '@/app/utils/convert';
import { HttpError } from '@/app/utils/http/http-error';
import { httpErrorHandler } from '@/app/utils/http/http-error-handler';
import { AxiosError } from 'axios';
import { API_PATH } from '@/app/utils/http/api-query';

const SignUpFormSchema = z.object({
  username: z.string(),
  password: z.string(),
  name: z.string(),
  phoneNumber: z.string(),
  accountNumber: z.string(),
  bankTranId: z.string(),
  fcmToken: z.string()
})

type SignUpRequestBody = z.infer<typeof SignUpFormSchema>

export async function signup(prevState: FormState, formData: FormData):Promise<FormState> {
  
  console.log('fcm token', formData.get("token") as string);
  console.log('username', formData.get("username") as string);
  console.log('accnum', formData.get("accontNumber") as string);
  console.log('bank code',formData.get("bankName") as string);
  
  const validatedFields = SignUpFormSchema.safeParse({
    username: formData.get("username") as string,
    password: formData.get("password") as string,
    name: formData.get("name") as string,
    phoneNumber: formData.get("username") as string,
    accountNumber: formData.get("accountNumber") as string,
    bankTranId: convertBankNameToCode(formData.get("bankName") as BankName),
    fcmToken: formData.get("token") as string
  })

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      isFailure: true,
      validationError: validatedFields.error.flatten().fieldErrors,
      message: "양식에 맞춰 다시 입력해주세요.",
    };
  }

  const body: SignUpRequestBody = { ...validatedFields.data };

  try{
    const response = await fetch(`${API_PATH}/member/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });

    if (response.status === 409) {
      throw new HttpError(response.status, "중복된 아이디");
    }

    else if(response.status === 403) {
      throw new HttpError(response.status, "비밀번호 조건 불만족");
    }

    return {
      isSuccess: true,
      isFailure: false,
      validationError: {},
      message: "회원가입에 성공했습니다.",
    };

  }catch(error){
    //console.log(error)
    if(error instanceof Error && error instanceof AxiosError){
      const exception = await httpErrorHandler(error);
      return {
        isSuccess: false,
        isFailure: true,
        validationError: {},
        message: exception.message,
      };
    }else{
      if(error instanceof HttpError && error.statusCode === 403){
        return {
          isSuccess: false,
          isFailure: true,
          validationError: {},
          message: '비밀번호는 영문자/숫자/특수문자를 조합하여 8자 이상이어야 합니다.'
        }
      }
      if(error instanceof HttpError && error.statusCode === 409){
        return {
          isSuccess: false,
          isFailure: true,
          validationError: {},
          message: '중복된 전화번호입니다.'
        }
      }
      return {
        isSuccess: false,
        isFailure: true,
        validationError: {},
        message: '회원가입에 실패했습니다. 다시 시도해주세요.'
      }
    }
  }
}
