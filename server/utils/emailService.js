import nodemailer from "nodemailer";

export const sendWelcomeEmail = async (toEmail) => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.log("ℹ️ EMAIL_USER or EMAIL_PASS not configured in env. Welcome email logged:", toEmail);
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass
      }
    });

    const mailOptions = {
      from: `"CarRental Cabs" <${user}>`,
      to: toEmail,
      subject: "Welcome to CarRental Cabs! 🚗",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #2563eb; text-align: center;">Welcome to CarRental Cabs!</h2>
          <p>Hi there,</p>
          <p>Thank you for subscribing to our newsletter! You are now locked in for premium discounts, promo coupon drops, and safety ride features.</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #4b5563;">Use your first sign-up referral code:</p>
            <h3 style="margin: 5px 0 0 0; color: #111827; font-size: 24px; letter-spacing: 1px;">CABREF100</h3>
          </div>
          <p>Get ready for a premium ride experience. If you have any questions, our 24/7 AI Chatbot Assistant is always ready to guide you.</p>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;">
            © ${new Date().getFullYear()} CarRental Cabs. Indira Nagar, Bengaluru, India.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 Welcome email sent successfully to:", toEmail);
    return true;
  } catch (error) {
    console.error("Failed to send welcome email:", error.message);
    return false;
  }
};
