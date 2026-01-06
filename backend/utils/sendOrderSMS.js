import axios from "axios";

export const sendOrderSMS = async (order) => {
  try {
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",
        message:
          `New Order!\n` +
          `Name: ${order.customerName}\n` +
          `Total: ₹${order.total}\n` +
          `Items: ${order.items.length}`,
        language: "english",
        numbers: process.env.ADMIN_MOBILE, // 🔥 REQUIRED
      },
      {
        headers: {
          authorization: process.env.SMS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("SMS SENT:", response.data);
  } catch (error) {
    console.error("SMS ERROR:", error.response?.data || error.message);
  }
};
