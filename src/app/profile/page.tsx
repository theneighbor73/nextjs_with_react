"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/useAuth";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [useremail, setEmail] = useState("na");
  const [emailSent, setEmailSent] = useState(false);
  const { setAuth } = useAuth();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      setAuth(null);
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
    setVerifyEmail(res.data.data.isVerfied);
    setEmail(res.data.data.email);
  };

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

  // Run on page load
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2 className="p-1 rounded bg-green-500">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      {!verifyEmail && (
        <div>
          <p className="text-white">
            Account verification email has been sent. Please check your inbox to
            verify your account. If you face any issues, please retry by
            clicking the button below.
          </p>
          <button
            onClick={() => resendVerificationEmail(useremail, data)}
            disabled={emailSent} // ✅ prevent re-click
            className={`mt-4 font-bold py-2 px-4 rounded text-white 
    ${
      emailSent
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-green-800 hover:bg-blue-700"
    }`}
          >
            {emailSent ? "Verification Sent" : "Resend verify email"}
          </button>
        </div>
      )}
    </div>
  );
}
