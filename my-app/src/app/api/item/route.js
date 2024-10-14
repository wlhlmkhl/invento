import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { validateItemData, validateJSONData } from "@/utils/helpers/apiHelpers";

const prisma = new PrismaClient();

export async function GET(req, options) {
  const url = new URL(req.url);
  const category = url.searchParams.get("category");
  const quantity = url.searchParams.get("quantity");
  const filters = {};
  if (category) {
    filters.category = {
      equals: category,
      mode: "insensitive",
    };
  }

  if (quantity === "true") {
    filters.quantity = {
      gt: 0,
    };
  }
  const items = await prisma.item.findMany({
    where: {
      AND: [filters],
    },
  });
  return NextResponse.json({ data: items }, { status: 200 });
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
  const [hasErrors, errors] = validateItemData(body);
  if (hasErrors) {
    return NextResponse.json(
      {
        message: errors,
      },
      { status: 400 }
    );
  }
  try {
    const user = await prisma.item.create({
      data: {
        name: body.name,
        description: body.description,
        quantity: body.quantity,
        category: body.category,
      },
    });
    return NextResponse.json({ data: user }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Invalid data sent for item creation",
      },
      {
        status: 400,
      }
    );
  }
}
