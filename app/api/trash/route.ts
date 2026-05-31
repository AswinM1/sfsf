import { prisma } from "@/app/lib/prisma"

export default async function DELETE(req:Request)
{
    const body=req.json()
    try
    {
   const r= await prisma.bookmark.delete({
        where:{
          bid:body.id
        }
    })
  Response.json({"mess":"success"})  
}
catch(err:any)
{
    console.log(err)
    return Response.json({mess:"cant delete"})
}

}