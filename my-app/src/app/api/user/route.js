import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  validateJSONData,
  validateUserData,
} from "../../../utils/helpers/apiHelpers";

const prisma = new PrismaClient();

export async function GET(req, options) {
  const users = await prisma.user.findMany();
  return NextResponse.json({ data: users }, { status: 200 });
}

export async function POST(req, options) {
  const [bodyHasErrors, body] = await validateJSONData(req);
  if (bodyHasErrors) {
    return NextResponse.json(
      {
        message: "A valid JSON object has to be sent",
      },
      { status: 400 }
    );
  }
  const [hasErrors, errors] = validateUserData(body);
  if (hasErrors) {
    return NextResponse.json(
      {
        message: errors,
      },
      { status: 400 }
    );
  }
  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Invalid data sent for author creation",
      },
      {
        status: 400,
      }
    );
  }
}

export async function PUT(req, options) {
  return NextResponse.json(`${req.method}-metoden är inte implenterad`);
}
export async function DELETE(req, options) {
  return NextResponse.json(`${req.method}-metoden är inte implenterad`);
}
