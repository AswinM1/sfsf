import { prisma } from "@/app/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import * as cheerio from 'cheerio';

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
export async function getMetadata(url: string) {
  try {
    const response = await fetch(url);

    const html = await response.text();

    const $ = cheerio.load(html);

    // title
    const title =
      $("title").text() ||
      $('meta[property="og:title"]').attr("content") ||
      "Untitled";

    // og image
    let content =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") ||
      "";

    // favicon
    let icon =
      $('link[rel="icon"]').attr("href") ||
      $('link[rel="shortcut icon"]').attr("href") ||
      "";

    const parsed = new URL(url);

    if (content.startsWith("/")) {
      content = parsed.origin + content;
    }

    if (icon.startsWith("/")) {
      icon = parsed.origin + icon;
    }

    if (!icon) {
      icon = `${parsed.origin}/favicon.ico`;
    }

    return {
      title,
      icon,
      content,
    };

  } catch (err) {
    console.log(err);

    return {
      title: "Untitled",
      icon: "",
      content: "",
    };
  }
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
const metadata = await getMetadata(body.link);

  const bookmark = await prisma.bookmark.create({
     data: {
      link: body.link,
      name:body.title||metadata.title  ,
      icon:metadata.icon || "",
      content:metadata.content || "",
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