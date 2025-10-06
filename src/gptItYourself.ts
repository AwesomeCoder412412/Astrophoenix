import OpenAI from "openai";
import "dotenv";
import { useApiKey } from "./context/ApiKeyContext";


export default async function askGPT(sys: string, use: string) : Promise<string> {
  try {
const apiKey = localStorage.getItem("openai_api_key");
   console.log("Current API Key:", apiKey);
    const client = new OpenAI({ apiKey: apiKey!,dangerouslyAllowBrowser: true });
    const response = await client.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: [
        { role: "system", content: sys },
        { role: "user", content: use },
      ],
    });

    console.log(response.choices[0].message?.content?.trim() || "");
    return response.choices[0].message?.content?.trim() || "";
  } catch (err: any) {
    console.error("Error calling GPT:", err.message || err);
  }
  return "ERROR";
}
