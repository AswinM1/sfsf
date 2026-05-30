import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connector } from "@/app/lib/dbConnect";
import { prisma } from "@/app/lib/prisma";


connector()
export async function POST(req:NextRequest){
 
    const body=await req.json()
    const {email,password}=body
    if(!email||!password){
        return NextResponse.json({
            message:"no data bruuuuuhhhh",
            success:false
        })
    }
    const val=await prisma.user.create({data:{
        email,
        password
    }})
    return NextResponse.json({
        message:"user created succesful",
        success:true
    })

    
     }


    
