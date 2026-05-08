import { Mistral } from "@mistralai/mistralai";

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

const mistralFetch = async (prompt, content) => {
  const completionArgs = {
    temperature: 0.2,
    maxTokens: 2048,
    topP: 1,
    responseFormat: {
      type: "json_object",
    },
  };

  const messages = [
    {
      role: "user",
      content: `${content}`,
    },
  ];

  try {
    const response = await client.beta.conversations.start({
      inputs: messages,
      model: "mistral-medium-latest",
      instructions: prompt,
      completionArgs,
    });

    return { error: false, response: response.outputs[0] };
  } catch (err) {
    return { error: true, errorMsg: err };
  }
};

export default mistralFetch;
