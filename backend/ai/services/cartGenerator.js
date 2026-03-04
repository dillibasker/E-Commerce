import axios from "axios";

export const generateFutureCart = async (event, products) => {
  const prompt = `
You are the user's future self.

Upcoming Event: ${event.eventName}
Budget: ₹5000-₹20000

Available Products:
${JSON.stringify(products)}

Generate:
1. Curated cart (product ids)
2. Emotional explanation
3. Total estimated price

Return JSON.
`;

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "mixtral-8x7b-32768",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return JSON.parse(response.data.choices[0].message.content);
};