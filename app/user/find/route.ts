import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const {username} = body;
    const User = await prisma.user.findFirst({ where: { username: username } });

    return User?NextResponse.json({user:User}, {status: 200}):NextResponse.json({message: 'Your account is not found. Please create one.'}, {status:404});
}