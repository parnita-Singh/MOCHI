import { db } from "@/lib/dynamodb";
import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { getServerSession } from "next-auth";
import { randomUUID } from "crypto";

export async function POST(req) {
  const session = await getServerSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const item = {
    userId: session.user.email,
    id: randomUUID(),
    amount: body.amount,
    category: body.category,
    date: body.date,
    payment: body.payment,
    notes: body.notes || "",
    createdAt: new Date().toISOString(),
  };

  await db.send(new PutCommand({
    TableName: "mochi-expenses",
    Item: item,
  }));

  return Response.json({ success: true, item });
}

export async function GET() {
  const session = await getServerSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const result = await db.send(new QueryCommand({
    TableName: "mochi-expenses",
    KeyConditionExpression: "userId = :uid",
    ExpressionAttributeValues: { ":uid": session.user.email },
  }));

  return Response.json({ expenses: result.Items });
}