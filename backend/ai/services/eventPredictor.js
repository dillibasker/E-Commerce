import axios from "axios";

export const predictLifeEvents = async (user) => {
  const prompt = `
You are a life-pattern analyst.

User:
Age: ${user.ageRange}
Recent Purchases: ${JSON.stringify(user.purchaseHistory)}
Location: ${user.location}

Predict top 3 life events in next 6 months.
Return JSON array with:
eventName, probability (0-1), expectedMonth.
`;

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "mixtral-8x7b-32768",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
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