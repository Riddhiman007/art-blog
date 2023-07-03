import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

/**
 * 
 * @param req NextRequest
 * @returns a registered user
 */
async function POST(req: NextRequest) {
  const form = await req.json();
  const usernameFound = await prisma.user.findFirst({ where: { username: form.username } })
  const emailFound = await prisma.user.findFirst({
    where: { email: form.email }
  })
  const session = await getServerSession();
  if (session?.user) {
    
  }
  if (usernameFound) {
    return NextResponse.json({ message: "A user is found with that username. Please try a different username" }, { status: 405 })
  }
  if (emailFound) {
    return NextResponse.json({ message: "An email is found. Please try a different email or log in." }, { status: 405 })
  } 
    const User = await prisma.user.create({
      data: {
        firstname: form.firstname,
        lastname: form.lastname,
        email: form.email,
        middlename: form.middlename,
        username: form.username
      },
    });
    return NextResponse.json({
      firstname: User.firstname,
      middlename: User.middlename,
      lastname: User.lastname,
      email: User.email,
      username: User.username
    }, {status: 201});
  
}

export { POST };
