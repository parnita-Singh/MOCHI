export async function askClaude(prompt) {
  const command = new InvokeModelCommand({
    modelId: "us.anthropic.claude-3-5-sonnet-20241022-v2:0",
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify({
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 300,
      system: "You are Mochi, a friendly personal finance assistant. Answer clearly and concisely, using the user's financial context when provided. If you don't have specific data about their finances, say so rather than guessing.",
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const response = await bedrockClient.send(command);
  const responseBody = JSON.parse(new TextDecoder().decode(response.body));
  return responseBody.content[0].text;
}
