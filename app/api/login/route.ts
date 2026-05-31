import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    if (user.password !== password) {
      return NextResponse.json(
        {
          message: "Invalid password",
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.SECRET_KEY!
    );

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      token,
    });

    response.cookies.set("token", token);

    return response;
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Server error",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}