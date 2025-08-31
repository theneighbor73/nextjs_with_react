import { connect } from "@/db/config";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    // Identify which user
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // Parse request body
    const reqBody = await request.json();
    const { newUsername, newEmail, newBio } = reqBody;
    console.log(reqBody);

    // Validation: at least one field must be provided
    if (!newUsername && !newEmail && !newBio) {
      return NextResponse.json(
        { error: "At least one field must be provided" },
        { status: 400 }
      );
    }

    // Update only provided fields
    if (newUsername) user.username = newUsername;
    if (newEmail) user.email = newEmail;
    if (newBio) user.bio = newBio;

    await user.save();

    return NextResponse.json({
      message: "Profile updated successfully",
      success: true,
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
