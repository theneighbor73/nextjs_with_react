import { NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

export async function POST(req: Request) {
  try {
    const { email, userId } = await req.json();
    await sendEmail({ email, emailType: "VERIFY", userId });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
