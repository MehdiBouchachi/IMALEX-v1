import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { buildInquiryEmailHTML } from "../../_lib/emailTemplate";
import { verifyEmailDomain } from "../../_lib/verifyEmailDomain";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const b = await req.json();

    // Honeypot: if bots fill it, pretend success
    if ((b.company || "").toString().trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    // Basic validation
    const name = (b.name || "").toString().trim();
    const email = (b.email || "").toString().trim();
    if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid name or email" },
        { status: 400 }
      );
    }

    // ✅ Domain-level email validation
    const { ok, reason } = await verifyEmailDomain(email);
    if (!ok) {
      return NextResponse.json(
        {
          ok: false,
          error: `Please check your email — the domain can’t receive mail (${reason}).`,
        },
        { status: 400 }
      );
    }

    // Build text + HTML
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      b.phone && `Phone: ${b.phone}`,
      b.country && `Country: ${b.country}`,
      b.city && `City: ${b.city}`,
      b.sector && `Sector: ${b.sector}`,
      b.stage && `Project stage: ${b.stage}`,
      Array.isArray(b.needs) &&
        b.needs.length &&
        `Needs: ${b.needs.join(", ")}`,
      "",
      "Brief:",
      (b.brief || "(empty)").toString(),
    ]
      .filter(Boolean)
      .join("\n");

    const html = buildInquiryEmailHTML({
      name,
      email,
      phone: b.phone,
      country: b.country,
      city: b.city,
      sector: b.sector,
      stage: b.stage,
      needs: b.needs,
      brief: b.brief,
    });

    // SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: (process.env.TO_EMAIL || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      replyTo: email,
      subject: `New website inquiry — ${name}${
        b.sector ? ` (${b.sector})` : ""
      }`,
      html,
      text,
    });

    if (!info.messageId) throw new Error("Send failed");
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Send failed" },
      { status: 500 }
    );
  }
}
