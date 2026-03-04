import axios from "axios";

export const chatWithFutureSelf = async (user, message) => {
  const prompt = `
You are ${user.name}'s future self in 2028.
Be wise, emotional, slightly motivational.
Give shopping + life advice.

User says: ${message}
`;

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "mixtral-8x7b-32768",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.choices[0].message.content;
};