import twilio from "twilio";

export const sendOrderWhatsApp = async (order) => {
  try {
    const client = twilio(
      process.env.TWILIO_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const customerWhatsApp = `whatsapp:+91${order.customerPhone}`;

    const message =
      `✅ *Order Confirmed*\n\n` +
      `👤 ${order.customerName}\n` +
      `🛒 Items: ${order.items.length}\n` +
      `💰 Total: ₹${order.total}\n\n` +
      `📍 Delivery Address:\n${order.address}\n\n` +
      `🙏 Thank you for shopping with us!`;

    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: customerWhatsApp, // 🔥 CUSTOMER NUMBER
      body: message,
    });

    console.log("WhatsApp sent to customer");
  } catch (error) {
    console.error("WhatsApp ERROR:", error.message);
  }
};
