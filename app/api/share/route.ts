import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { LinkModel } from "@/app/schema/Link";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const data = await req.json();

  if (data.data === false) {
    return NextResponse.json({
      mess: "hidden"
    });
  }

  const token = req.cookies.get("token")?.value || "";
  const decoded = jwt.verify(token, process.env.secret_key!);
  const id = (decoded as any).id;

  const hashv = await LinkModel.findOne({ userId: id });
  const{hash}=hashv

  console.log("Fetched hash from DB:", hash);

  return NextResponse.json({
    hash,
  });
}
