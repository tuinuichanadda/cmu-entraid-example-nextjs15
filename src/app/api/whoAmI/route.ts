import { cookies } from 'next/headers'
import jwt from "jsonwebtoken";
import  { NextRequest, NextResponse } from "next/server";
import { JWTPayload } from "../../../../types/JWTPayload";

type SuccessResponse = {
  ok: true;
  cmuAccount: string;
  firstName: string;
  lastName: string;
  studentId?: string;
};

type ErrorResponse = {
  ok: false;
  message: string;
};

export type WhoAmIResponse = SuccessResponse | ErrorResponse;

export async function GET(
  req: NextRequest,
): Promise<NextResponse<WhoAmIResponse>> {

  //This token means apptoke
  const cookieStore = await cookies();
  const token = cookieStore.get('cmu-entraid-example-token')?.value;

  //validate token
  if (typeof token !== "string")
    return NextResponse.json({ ok: false, message: "Invalid token" }, { status: 401 }); 
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JWTPayload;

    return NextResponse.json({
      ok: true,
      cmuAccount: decoded.cmuAccount,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      studentId: decoded.studentId,
    });
  } catch (error) {
    return NextResponse.json({ ok: false, message: "Invalid token" }, { status: 401 });   
  }

}
