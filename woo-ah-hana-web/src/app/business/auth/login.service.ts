'use server'
import { FormState } from "@/app/ui/molecule/form/form-root";
import { API_PATH } from "@/app/utils/http/api-query";
import { HttpError } from "@/app/utils/http/http-error";
import { httpErrorHandler } from "@/app/utils/http/http-error-handler";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { z } from 'zod';

const LogInFormSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type LogInRequestBody = z.infer<typeof LogInFormSchema>;


export async function authenticate(prevState: FormState, formData: FormData):Promise<FormState> {
  const validatedFields = LogInFormSchema.safeParse({
    username: formData.get("username") as string,
    password: formData.get("password") as string,
  });

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      isFailure: true,
      validationError: validatedFields.error.flatten().fieldErrors,
      message: "양식에 맞춰 다시 입력해주세요.",
    };
  }

  const body: LogInRequestBody = { ...validatedFields.data };

  try{
    console.log(`${API_PATH}/member/login`)
    const response = await fetch(`${API_PATH}/member/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new HttpError(response.status, "서버에러");
    }

    const result = await response.json();

    cookies().set("token", result.accessToken, {
      secure: true,
      path: "/",
    });

    cookies().set("refresh-token", result.refreshToken, {
      secure: true,
      path: "/",
    });

    return {
      isSuccess: true,
      isFailure: false,
      validationError: {},
      message: "로그인에 성공했습니다.",
    };
  } catch(error){
    // TODO: 백엔드와 예외 메세지 처리 합의
    console.log(error)
    if(error instanceof Error && error instanceof AxiosError){
      const exception = await httpErrorHandler(error);
      return {
        isSuccess: false,
        isFailure: true,
        validationError: {},
        message: exception.message,
      };
    }else{
      return {
        isSuccess: false,
        isFailure: true,
        validationError: {},
        message: '아이디와 비밀번호가 맞지 않습니다.'
      }
    }
  }
}

export async function logout(): Promise<FormState> {
  try {
    cookies().delete("token");
    cookies().delete("refresh-token");

    const response = await fetch(`${API_PATH}/member/logout`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });
    if(response.ok) {
      return {
        isSuccess: true,
        isFailure: false,
        validationError: {},
        message: "로그아웃에 성공했습니다.",
      };
    }
    else {
      return {
        isSuccess: false,
        isFailure: true,
        validationError: {},
        message: '로그아웃 중 오류가 발생했습니다.',
      };
    }
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      isFailure: true,
      validationError: {},
      message: '로그아웃 중 오류가 발생했습니다.',
    };
  }
}