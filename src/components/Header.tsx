"use client";
import Link from "next/link";
import { useAuth } from "@/context/useAuth";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Header() {
  const { setAuth, user, loading } = useAuth();
  const router = useRouter();
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

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-gray-200 px-4 lg:px-6 py-2.5">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Link href="/" className="flex items-center">
          <img
            src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
            className="mr-3 h-12"
            alt="Logo"
          />
        </Link>

        <div className="flex items-center lg:order-2">
          {loading ? (
            <span className="text-gray-500 text-sm px-4"> </span>
          ) : user ? (
            <>
              {/* 👤 Hello, username (not clickable) */}
              <span className="text-gray-800 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
                Hello, {user.username}
              </span>
              {/* 🚪 Logout button */}
              <button
                onClick={logout}
                className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              {/* 🔑 Login link */}
              <Link
                href="/login"
                className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Log in
              </Link>
              {/* 🆕 Sign up link */}
              <Link
                href="/signup"
                className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
