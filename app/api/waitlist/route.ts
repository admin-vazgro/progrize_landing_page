import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

// Switch from to a verified domain once progrize.com is added in Resend dashboard
// https://resend.com/domains → Add Domain → progrize.com → add DNS records
const FROM_TEAM    = "Progrize Waitlist <onboarding@resend.dev>";
const FROM_USER    = "Progrize <onboarding@resend.dev>";
// Uses NOTIFY_EMAIL env var — set to your Resend account email until progrize.com is verified
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL ?? "progrize.app@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // 1. Notify the Progrize team
    const teamResult = await resend.emails.send({
      from: FROM_TEAM,
      to: NOTIFY_EMAIL,
      subject: `New waitlist signup: ${email}`,
      html: `
        <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:560px;margin:0 auto;padding:40px 24px;background:#f9f9f7;">
          <div style="background:#fff;border-radius:16px;padding:40px;border:1px solid #e8e8e4;">
            <h1 style="font-size:28px;font-weight:400;color:#111;margin:0 0 8px;">New Waitlist Signup 🎉</h1>
            <p style="color:#888;font-size:14px;margin:0 0 28px;">Progrize — Early Access</p>
            <div style="background:#f4f6d4;border-radius:12px;padding:24px;margin-bottom:28px;">
              <p style="font-size:13px;color:#6b7a1a;font-family:monospace;margin:0 0 6px;text-transform:uppercase;letter-spacing:.08em;">Email</p>
              <p style="font-size:20px;color:#111;font-weight:500;margin:0;">${email}</p>
            </div>
            <p style="color:#666;font-size:14px;line-height:1.6;margin:0;">
              Someone just joined the Progrize waitlist. Follow up when you launch!
            </p>
            <hr style="border:none;border-top:1px solid #eee;margin:28px 0;" />
            <p style="color:#bbb;font-size:12px;margin:0;">Progrize · A Vazgro Labs product</p>
          </div>
        </div>
      `,
    });

    if (teamResult.error) {
      console.error("Resend team notify error:", teamResult.error);
      return NextResponse.json({ error: "Failed to process signup. Please try again." }, { status: 500 });
    }

    // 2. Send confirmation to the user
    // Note: on Resend free plan without domain verified, this can only send
    // to the Resend account owner email. Verify progrize.com to send to anyone.
    const userResult = await resend.emails.send({
      from: FROM_USER,
      to: email,
      subject: "You're on the Progrize waitlist 🚀",
      html: `
        <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:560px;margin:0 auto;padding:40px 24px;background:#f9f9f7;">
          <div style="background:#fff;border-radius:16px;padding:40px;border:1px solid #e8e8e4;">
            <div style="text-align:center;margin-bottom:36px;">
              <h1 style="font-size:32px;font-weight:400;color:#111;margin:0 0 12px;font-family:Georgia,serif;">You're on the list.</h1>
              <p style="color:#888;font-size:15px;margin:0;line-height:1.6;">
                We'll be in touch the moment Progrize launches.<br/>
                Get ready to move your career forward.
              </p>
            </div>
            <div style="background:#f4f6d4;border-radius:12px;padding:28px;margin-bottom:32px;text-align:center;">
              <p style="font-size:13px;color:#6b7a1a;font-family:monospace;margin:0 0 4px;text-transform:uppercase;letter-spacing:.08em;">Launching in approximately</p>
              <p style="font-size:36px;font-weight:600;color:#111;margin:0;">90 days</p>
            </div>
            <div style="margin-bottom:32px;">
              <p style="font-size:14px;color:#666;margin:0 0 16px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;">What to expect</p>
              <ul style="margin:0;padding:0 0 0 20px;color:#555;font-size:15px;line-height:2;">
                <li>AI-powered job matching tailored to your skills</li>
                <li>1:1 mentorship from 350+ industry experts</li>
                <li>CV optimiser &amp; ATS checker</li>
                <li>Job application tracker (Kanban board)</li>
              </ul>
            </div>
            <hr style="border:none;border-top:1px solid #eee;margin:28px 0;" />
            <p style="color:#bbb;font-size:12px;margin:0;text-align:center;">
              Progrize · A Vazgro Labs product<br/>
              You received this because you signed up at progrize.com
            </p>
          </div>
        </div>
      `,
    });

    if (userResult.error) {
      // Log but don't fail — team was already notified
      console.warn("Resend user confirmation error:", userResult.error);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist signup error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
