import { NextResponse } from "next/server";
import { validateJSONData, validateItemData } from "@/utils/helpers/apiHelpers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, options) {
  //! get id from request
  const id = options.params.id;

  try {
    const item = await prisma.item.findUniqueOrThrow({
      where: { id: Number(id) },
    });
    return NextResponse.json({ data: item }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "item is not found" }, { status: 404 });
  }
}

export async function PUT(req, options) {
  const id = options.params.id;
  //hitta gammla i databas
  try {
    const oldItem = await prisma.item.findUniqueOrThrow({
      where: { id: Number(id) },
    });
  } catch (error) {
    return NextResponse.json("Item not found", { status: 404 });
  }
  // validera inkommannde JSON
  const [bodyHasErrors, body] = await validateJSONData(req);
  if (bodyHasErrors) {
    return NextResponse.json(
      {
        message: "A valid JSON object has to be sent",
      },
      { status: 400 }
    );
  }
  // Validera JSON-object
  const [hasErrors, errors] = validateItemData(body);
  if (hasErrors) {
    return NextResponse.json(
      {
        message: errors,
      },
      { status: 400 }
    );
  }
  //Uppdatera ITEM i databas
  try {
    const update = await prisma.item.update({
      where: { id: Number(id) },
      data: {
        name: body.name,
        description: body.description,
        quantity: body.quantity,
        category: body.category,
      },
    });
    return NextResponse.json(update);
  } catch (error) {
    console.log(error);
    return NextResponse.json("failed update", { status: 400 });
  }
}

export async function DELETE(req, options) {
  const id = options.params.id;
  try {
    await prisma.item.delete({
      where: { id: Number(id) },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Deletion Failed", { status: 400 });
  }
}
