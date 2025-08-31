import { connect } from "@/db/config";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    // Identify which user
    const userId = await getDataFromToken(request);
    // ⚠️ Do NOT exclude password here, we need it for comparison
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // Parse request body
    const reqBody = await request.json();
    const { current, newPassword, confirm } = reqBody;
    console.log(reqBody);

    // Validation: must fill all fields
    if (!current || !newPassword || !confirm) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validation: confirm new password
    if (newPassword !== confirm) {
      return NextResponse.json(
        { error: "New password and confirm password do not match" },
        { status: 400 }
      );
    }

    // Compare current password
    const isMatch = await bcryptjs.compare(current, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Hash and update new password
    const salt = await bcryptjs.genSalt(10);
    const hashedNewPassword = await bcryptjs.hash(newPassword, salt);
    user.password = hashedNewPassword;

    await user.save();

    return NextResponse.json({
      message: "Password updated successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
