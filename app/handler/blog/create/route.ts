import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"

export async function POST(req:NextRequest) {
    const body = await req.json();
    const blog = await prisma.blog.create({ data: { title: body.title, description: body.description, content: body.content, author: body.author } })
    return NextResponse.json(blog, {status:201, statusText:"created a blog successfully"})
}