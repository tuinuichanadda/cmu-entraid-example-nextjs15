import { cookies } from 'next/headers'
import  { NextRequest, NextResponse } from "next/server";

type SuccessResponse = {
  ok: true;
  message: string;
};

type ErrorResponse = {
  ok: false;
};

export type signoutResponse = SuccessResponse | ErrorResponse;
export async function POST(
  req: NextRequest
): Promise<NextResponse<signoutResponse>> { 
// function delete cookie apptoken
 (await cookies()).delete('cmu-entraid-example-token');

  //logout_url for logout session from EntraID and attach url logout redirect
  const logout_url = process.env.LOGOUT_URL as string;
  return NextResponse.json({ ok: true, message:logout_url });
}
