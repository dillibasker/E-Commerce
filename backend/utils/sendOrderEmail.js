import nodemailer from "nodemailer";
export const sendOrderEmail = async (order) => {
  if (!order.items || !Array.isArray(order.items) || order.items.length === 0) {
    throw new Error("Order items are missing");
  }
  if (!order.customerName || !order.customerEmail || !order.address) {
    throw new Error("Customer info is missing");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const itemsHTML = order.items.map(
    item => `<li>${item.name} × ${item.quantity} — ₹${item.price}</li>`
  ).join("");

  await transporter.sendMail({
    from: `"E-Commerce" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: "🛒 New Order Received",
    html: `
      <h2>New Order</h2>
      <p><b>Name:</b> ${order.customerName}</p>
      <p><b>Email:</b> ${order.customerEmail}</p>
      <p><b>Address:</b> ${order.address}</p>
      <ul>${itemsHTML}</ul>
      <h3>Total: ₹${order.total}</h3>
    `
  });
};
