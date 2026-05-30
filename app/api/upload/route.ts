import { prisma } from "@/app/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface JwtPayload {
  userId: number;
  email: string;
}
export async function GET(req:Request){
    const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return Response.json({
      message: "No token",
    });
  }

  const decoded = jwt.verify(
    token,
    process.env.secret_key as string
  ) as JwtPayload;

    const body=await prisma.bookmark.findMany({
        where:{
            Ownerid:decoded.userId
        },
        include:{
            tags:true
        }
        
    })
    return Response.json({data:body})
}
export async function POST(req: Request) {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return Response.json({
      message: "No token",
    });
  }

  const decoded = jwt.verify(
    token,
    process.env.secret_key as string
  ) as JwtPayload;

  const body = await req.json();

  const bookmark = await prisma.bookmark.create({
     data: {
      link: body.link,
      tags: {
        connectOrCreate: body.tags.map(
          (tag: string) => ({
            where: {
              name: tag,
            },
            create: {
              name: tag,
            },
          })
        ),
      },
      Owner:{
        connect:{
            id:decoded.userId
        }
      }
    },
  });

  return Response.json(bookmark);
}