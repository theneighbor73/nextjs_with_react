"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/useAuth";

export default function ProfilePage() {
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);
  const { user } = useAuth();

  const resendVerificationEmail = async (email: string, userId: string) => {
    try {
      await axios.post("/api/users/resend-email", {
        email,
        emailType: "VERIFY",
        userId,
      });
      toast.success("Verification email sent successfully!");
      setEmailSent(true);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {/* Avatar wrapper for centering */}
        <div className="flex justify-center mt-6">
          <a href="/">
            <img
              className="h-40 w-40 rounded-full border-2 border-indigo-300 object-cover p-1 ring-indigo-500"
              src={
                user?.avatar ||
                "https://res.cloudinary.com/dhjy4oh18/image/upload/v1756629086/Adobe_Express_-_file_trqu1g.png"
              }
              alt="default avatar"
            />
          </a>
        </div>
        {/* <a href="/">
          <img
            className="h-40 w-40 rounded-full border-2 border-indigo-300 object-cover p-1 ring-indigo-500"
            src={
              user?.avatar ||
              "https://res.cloudinary.com/dhjy4oh18/image/upload/v1756629086/Adobe_Express_-_file_trqu1g.png"
            }
            alt="default avatar"
          />
        </a> */}
        <div className="px-5 pb-5 text-center">
          <a href="/">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {user?.username}
            </h5>
          </a>
          <a>
            <h5 className="mt-1 text-lg italic font-serif text-gray-700 dark:text-gray-300">
              {user?.bio || "Bio goes here..."}
            </h5>
          </a>

          <div className="flex items-center justify-between mt-4">
            <span className="bg-yellow-100 text-yellow-800 text-lg font-bold px-3 py-1 rounded-lg border border-yellow-300 shadow-sm">
              Elo: 1000
            </span>
            {!user?.isVerified && (
              <button
                onClick={() => resendVerificationEmail(user?.email, user?._id)}
                disabled={emailSent}
                className={`text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center
      ${
        emailSent
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-green-800 hover:bg-green-900 focus:ring-green-300 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-green-900"
      }`}
              >
                {emailSent ? "Verification Sent" : "Verify account"}
              </button>
            )}
            <a
              href="/profile-settings"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Profile settings
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
