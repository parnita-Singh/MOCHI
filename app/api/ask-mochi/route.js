import { NextResponse } from "next/server";
import { askClaude } from "../lib/bedrock"; 

export async function POST(request) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Missing 'message' in request body" },
        { status: 400 }
      );
    }

    // Fold prior turns into a single prompt Claude can use as context.
    // Swap this for a proper multi-turn `messages` array in bedrock.js
    // once you want Mochi to remember more than the current question.
    const historyText = Array.isArray(history)
      ? history
          .map((m) => `${m.role === "user" ? "User" : "Mochi"}: ${m.text}`)
          .join("\n")
      : "";

    const prompt = historyText
      ? `${historyText}\nUser: ${message}\nMochi:`
      : message;

    const reply = await askClaude(prompt);

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("ask-mochi route error:", err);
    return NextResponse.json(
      { error: "Something went wrong talking to Mochi. Please try again." },
      { status: 500 }
    );
  }
}