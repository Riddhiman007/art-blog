import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * 
 * @param req takes an email or username
 * @returns the email if found or find the email from the username
 */
export async function POST(req: NextRequest) {
    const body = await req.json();
    const emailOrUsername = body.email;
    const findEmail = await prisma.user.findFirst({ where: { email: emailOrUsername } })
    if (!findEmail) {
        const user = await prisma.user.findFirst({ where: { username: emailOrUsername } })
        return NextResponse.json({email: user?.email}, {status: 200, statusText: 'found email'})
    }
    else 
        return NextResponse.json({email:findEmail.email}, {status: 200, statusText: 'found email'});
    
}