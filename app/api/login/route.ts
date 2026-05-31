import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, password } = body;

    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });

    const tokendata = {
      userId: user.id,
    };

    const token = jwt.sign(
      tokendata,
      process.env.SECRET_KEY!
    );

    const response = NextResponse.json({
      message: "login success",
      token,
      success: true,
    });

    response.cookies.set("token", token);

    return response;
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "server error",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}