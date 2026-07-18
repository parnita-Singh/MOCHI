import { NextResponse } from "next/server";
import { askClaude } from "@/lib/bedrock";
// import { getUserExpenses } from "@/lib/dynamodb"; // reuse your existing helper

export async function POST(request) {
    try {
    const { question, userId } = await request.json();

    // const financeData = await getUserExpenses(userId); // pull real data
    const financeData = { totalSpent: 8400, budgetLeft: 16600 }; // placeholder until wired

    const prompt = `You are Mochi, a friendly budgeting assistant.
User's finance data: ${JSON.stringify(financeData)}
Question: ${question}
Answer briefly and warmly, referencing real numbers where relevant.`;

    const answer = await askClaude(prompt);
    return NextResponse.json({ answer });
    } catch (err) {
    console.error("Bedrock error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}