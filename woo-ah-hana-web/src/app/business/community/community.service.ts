"use server";
import { APIResponseType, instance } from "@/app/utils/http";
import { API_PATH } from "@/app/utils/http/api-query";
import { InternetServerError } from "@/app/utils/http/http-error";
import { Community } from "./community";
export interface CommunityResponseDTO {
  communityId: string;
  name: string;
}
export interface CommunityInfoResponseDTO {
  name: string;
  accountNumber: string;
  balance: number;
}
export interface GetMembersDto {
  id: string;
  name: string;
}
export interface Member {
  id: string;
  name: string;
}
export interface ValidationCodeRequestDTO {
  bankTranId: string;
  accountNumber: string;
}
export interface MemberFeeStatus {
  memberName: string;
  memberId: string;
  amount: number;
}
export interface CommunityFeeStatus {
  paidMembers: MemberFeeStatus[];
  unpaidMembers: MemberFeeStatus[];
}
export interface CreateCommunityRequestDTO {
  name: string;
  accountNumber: string;
  validationCode: string;
  credits: number;
  fee: number;
  feePeriod: number;
}
export interface Transfer {
  tranDate: string;
  tranTime: string;
  inoutType: string;
  tranType: string;
  printContent: string;
  tranAmt: string;
  afterBalanceAmt: string;
  branchName: string;
}
export interface getRecapRequestDTO {
  communityId: string;
  fromDate: string;
  toDate: string;
}

export interface getRecapPlanInfoDTO {
  title: string;
  category: string;
}
export interface getRecapResponseDTO {
  planInfoList: getRecapPlanInfoDTO[];
  numberOfPlans: number;
  howMuchSpentThanLastQuarter: number;
  thisQuarterExpense: number;
  thisQuarterIncome: number;
  highestMonth: number;
  monthlyExpenses: number[];
  highestPlanName: string;
  highestPlanExpense: number;
  imageUrl: string;
}

export interface RegisterCommunityResponseDTO {
  memberName: string;
  communityName: string;
  success: boolean;
}
export async function getCommunityList(): Promise<
  APIResponseType<CommunityResponseDTO[]>
> {
  try {
    const response = await instance.get(`${API_PATH}/community/list`);
    if (response.status === 500) {
      throw new InternetServerError({
        message: "서버가 불안정합니다. 잠시후 시도해주세요.",
        statusCode: response.status,
        response: response.data,
      });
    }
    const data: CommunityResponseDTO[] = response.data;
    return {
      isSuccess: true,
      isFailure: false,
      data: data,
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      isFailure: true,
      data: undefined,
    };
  }
}
export async function getCommunity(
  communityId: string
): Promise<APIResponseType<Community>> {
  const response = await instance.get(`${API_PATH}/community/${communityId}`);
  if (response.status === 500) {
    throw new InternetServerError({
      message: "서버가 불안정합니다. 잠시후 시도해주세요.",
      statusCode: response.status,
      response: response.data,
    });
  }
  try {
    return {
      isSuccess: false,
      isFailure: true,
      data: response.data,
    };
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      isFailure: true,
      data: undefined,
    };
  }
}
export async function getCommunityInfo(
  communityId: string
): Promise<APIResponseType<CommunityInfoResponseDTO>> {
  try {
    const response = await instance.get(
      `${API_PATH}/community/info?communityId=${communityId}`
    );
    if (response.status === 500) {
      throw new InternetServerError({
        message: "서버가 불안정합니다. 잠시후 시도해주세요.",
        statusCode: response.status,
        response: response.data,
      });
    }
    const data: CommunityInfoResponseDTO = response.data;
    return {
      isSuccess: true,
      isFailure: false,
      data: data,
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      isFailure: true,
      data: undefined,
    };
  }
}
export async function getMembers(
  communityId: string
): Promise<APIResponseType<GetMembersDto[]>> {
  const response = await instance.get(
    `${API_PATH}/community/member-list/${communityId}`
  );
  if (response.status == 500) {
    throw new InternetServerError({
      message: "서버가 불안정합니다. 잠시후 시도해주세요.",
      statusCode: response.status,
      response: response.data,
    });
  }
  try {
    const data: GetMembersDto[] = response.data;
    return {
      isSuccess: true,
      isFailure: false,
      data: data,
    };
  } catch (error) {
    console.log(error);
    throw new InternetServerError({
      message: "서버가 불안정합니다. 잠시후 시도해주세요.",
      statusCode: response.status,
    });
  }
}
export async function getCommunityMembers(
  communityId: string
): Promise<APIResponseType<Member[]>> {
  console.log(`${API_PATH}/community/member-list/${communityId}`);
  const response = await instance.get(
    `${API_PATH}/community/member-list/${communityId}`
  );
  if (response.status === 500) {
    throw new InternetServerError({
      message: "서버가 불안정합니다. 잠시후 시도해주세요.",
      statusCode: response.status,
      response: response.data,
    });
  }
  try {
    return {
      isSuccess: true,
      isFailure: false,
      data: response.data as Member[],
    };
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      isFailure: true,
      data: undefined,
    };
  }
}
export async function validateAccount(
  requestBody: ValidationCodeRequestDTO
): Promise<APIResponseType<string>> {
  try {
    const response = await instance.post(
      `${API_PATH}/community/send-code`,
      requestBody
    );
    if (response.status === 500) {
      throw new InternetServerError({
        message: "서버가 불안정합니다. 잠시 후 다시 시도해주세요.",
        statusCode: response.status,
        response: response.data,
      });
    }
    return {
      isSuccess: true,
      isFailure: false,
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      isFailure: true,
    };
  }
}
export async function createCommunity(
  requestBody: CreateCommunityRequestDTO
): Promise<APIResponseType<string>> {
  try {
    const response = await instance.post(
      `${API_PATH}/community/new`,
      requestBody
    );
    if (response.status === 500) {
      throw new InternetServerError({
        message: "서버가 불안정합니다. 잠시 후 다시 시도해주세요.",
        statusCode: response.status,
        response: response.data,
      });
    }
    return {
      isSuccess: true,
      isFailure: false,
      data: response.data as string,
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      isFailure: true,
      data: undefined,
    };
  }
}
export async function getCommunityFeeStatus(
  communityId: string
): Promise<APIResponseType<CommunityFeeStatus>> {
  const response = await instance.post(`${API_PATH}/community/feeStatus`, {
    communityId,
  });
  try {
    return {
      isSuccess: false,
      isFailure: true,
      data: response.data as CommunityFeeStatus,
    };
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      isFailure: true,
      data: undefined,
    };
  }
}
export async function getCommunityTransferRecords(
  communityId: string,
  recentMonth: number
): Promise<APIResponseType<Transfer[]>> {
  const requestBody = { communityId, recentMonth };
  const response = await instance.post(
    `${API_PATH}/community/trsfRecords`,
    requestBody
  );
  if (response.status === 500) {
    throw new InternetServerError({
      message: "서버가 불안정합니다. 잠시 후 다시 시도해주세요.",
      statusCode: response.status,
      response: response.data,
    });
  }
  try {
    return {
      isSuccess: true,
      isFailure: false,
      data: response.data as Transfer[],
    };
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      isFailure: true,
      data: undefined,
    };
  }
}
export async function getRecap(
  requestBody: getRecapRequestDTO
): Promise<APIResponseType<getRecapResponseDTO>> {
  try {
    const response = await instance.post(
      `${API_PATH}/community/expense-info`,
      requestBody
    );
    if (response.status === 500) {
      throw new InternetServerError({
        message: "서버가 불안정합니다. 잠시후 시도해주세요.",
        statusCode: response.status,
        response: response.data,
      });
    }
    const data: getRecapResponseDTO = response.data;
    return {
      isSuccess: true,
      isFailure: false,
      data: data,
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      isFailure: true,
      data: undefined,
    };
  }
}
export async function changeFeeInfo(
  communityId: string,
  fee: number,
  feePeriod: number
): Promise<APIResponseType<string>> {
  try {
    const response = await instance.post(
      `${API_PATH}/community/account/changeFeeInfo`,
      { communityId, fee, feePeriod }
    );
    const data: string = response.data;
    return {
      isSuccess: false,
      isFailure: true,
      data: data,
    };
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      isFailure: true,
      data: undefined,
    };
  }
}
export async function registerCommunity(
  memberId: string,
  communityId: string
): Promise<APIResponseType<RegisterCommunityResponseDTO>> {
  try {
    const response = await instance.post(`${API_PATH}/community/register`, {
      memberId,
      communityId,
    });
    const data: RegisterCommunityResponseDTO = response.data;
    return {
      isSuccess: false,
      isFailure: true,
      data: data,
    };
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      isFailure: true,
      data: undefined,
    };
  }
}
