import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/helpers/cloudinary";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connect } from "@/db/config";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    // Identify which user
    const userId = await getDataFromToken(request);

    if (!userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Image file is required" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert buffer to data URL
    const dataUrl = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataUrl, {
      folder: "avatars",
      transformation: [
        { width: 150, height: 150, crop: "fill" },
        { quality: "auto" },
      ],
    });

    // Update user with avatar URL
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar: result.secure_url },
      { new: true }
    ).select("-password");

    return NextResponse.json({
      message: "Avatar uploaded successfully",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
