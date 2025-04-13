import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
console.log("Resend API Key:", process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "no-reply@/test-next.tenposfoodplace-hp.com",
      to: ["yoshimasakawaguchi@gmail.com", email],
      subject: "お問い合わせありがとうございます",
      html: `<p>${name} さん、<br>お問い合わせありがとうございます。<br>内容: ${message}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("エラーが発生しました:", error);
    return NextResponse.json(
      { error: "メール送信に失敗しました。" },
      { status: 500 }
    );
  }
}
