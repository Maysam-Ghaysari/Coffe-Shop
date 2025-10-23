import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";
export async function DELETE(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { id } = body;
    // Validation

    await UserModel.findOneAndDelete({ _id: id }).lean();
    return NextResponse.json({ message: "User removed successfully :))" });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
