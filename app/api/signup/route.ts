import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Email and password required",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
        console.log("already")
      return NextResponse.json(
        {
          message: "User already exists",
          success: false,
        },
        {
          status: 409,
        }
      );
    }

    await prisma.user.create({
      data: {
        email,
        password,
      },
    });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
    });
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