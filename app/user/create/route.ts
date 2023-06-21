// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { signIn } from "next-auth/react";
async function POST(req: NextRequest) {
  const form = await req.json();
  const User = await prisma.user.create({
    data: {
      firstname: form.firstname,
      lastname: form.lastname,
      email: form.email,
      middlename: form.middlename,
    },
  });
  return NextResponse.json({
    firstname: User.firstname,
    middlename: User.middlename,
    lastname: User.lastname,
    email: User.email,
  });
}

export { POST };
