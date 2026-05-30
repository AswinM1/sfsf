import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma";

export async function POST(req:NextRequest){
    const body=await req.json()
    const {email,password}=body
     const user=await prisma.user.create({data:{email:email,password:password}});
     if(user)
     {
      const tokendata={
         
         userId:user.id
         
      }
        const token=jwt.sign(tokendata,process.env.secret_key!)

       
        const response=NextResponse.json({
         message:"login success",
         token:token,
         success:true
        })
        response.cookies.set("token",token)

        return response
     }
     else
     {
        return NextResponse.json({
           message:"not found",
           success:false
        })
     }


    
}