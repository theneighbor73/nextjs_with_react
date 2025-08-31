"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// components for cleaner structure
function ProfileSettings({
  details,
  setDetails,
  onSave,
  buttonDisabled,
  loading,
}: any) {
  return (
    <div className="p-2 md:p-4">
      <div className="mt-8 w-full max-w-xl px-6 pb-8 sm:rounded-lg">
        <h2 className="pl-6 text-2xl font-bold sm:text-xl">Your Profile</h2>

        {/* Profile Image + Buttons */}
        <div className="mx-auto mt-8 grid max-w-2xl">
          <div className="flex flex-col items-start space-y-5 sm:flex-row sm:space-x-6 sm:space-y-0">
            <img
              className="h-40 w-40 rounded-full border-2 border-indigo-300 object-cover p-1 ring-indigo-500"
              src="https://res.cloudinary.com/dhjy4oh18/image/upload/v1756629086/Adobe_Express_-_file_trqu1g.png"
              alt="Profile avatar"
            />

            <div className="flex flex-col space-y-4 sm:ml-6">
              <button
                type="button"
                className="rounded-lg border border-indigo-200 bg-indigo-900 px-7 py-3.5 text-base font-medium text-indigo-50 hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-200"
              >
                Change picture
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="mt-8 text-gray-900 sm:mt-14">
            <div className="mb-6">
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-indigo-900"
              >
                User name
              </label>
              <input
                type="text"
                id="username"
                className="block w-full rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-sm text-indigo-900 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="username"
                value={details.username}
                onChange={(e) =>
                  setDetails({ ...details, username: e.target.value })
                }
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-indigo-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="block w-full rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-sm text-indigo-900 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Your email"
                value={details.email}
                onChange={(e) =>
                  setDetails({ ...details, email: e.target.value })
                }
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="bio"
                className="mb-2 block text-sm font-medium text-indigo-900"
              >
                Bio
              </label>
              <textarea
                id="bio"
                rows={4}
                className="block w-full rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-sm text-indigo-900 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Write your bio here..."
                value={details.bio}
                onChange={(e) =>
                  setDetails({ ...details, bio: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onSave}
                disabled={buttonDisabled || loading}
                className={`rounded-lg px-5 py-2.5 text-sm font-medium text-white 
                  ${
                    buttonDisabled || loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-700 hover:bg-indigo-800"
                  } 
                  focus:outline-none focus:ring-4 focus:ring-indigo-300 sm:w-auto`}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PasswordSettings({
  passwords,
  setPasswords,
  passwordButtonDisabled,
  loading,
  onUpdatePassword,
}: any) {
  return (
    <div className="p-6">
      <h2 className="pl-6 text-2xl font-bold sm:text-xl">Change password</h2>
      <div className="mt-6 space-y-4 max-w-md">
        <div className="mb-6">
          <label
            htmlFor="currentpassword"
            className="mb-2 block text-sm font-medium text-indigo-900"
          >
            Current password
          </label>
          <input
            type="password"
            id="currentpassword"
            className="block w-full rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-sm text-indigo-900 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Current password"
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="newpassword"
            className="mb-2 block text-sm font-medium text-indigo-900"
          >
            New password
          </label>
          <input
            type="password"
            id="newpassword"
            className="block w-full rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-sm text-indigo-900 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="New password"
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, newPassword: e.target.value })
            }
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="confirm"
            className="mb-2 block text-sm font-medium text-indigo-900"
          >
            Confirm new password
          </label>
          <input
            type="password"
            id="confirm"
            className="block w-full rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-sm text-indigo-900 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Confirm new password"
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords({ ...passwords, confirm: e.target.value })
            }
          />
        </div>
        <div>
          <button
            onClick={onUpdatePassword}
            disabled={passwordButtonDisabled || loading}
            className={`rounded-lg px-5 py-2.5 text-sm font-medium text-white 
              ${
                passwordButtonDisabled || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-700 hover:bg-indigo-800"
              } 
              focus:outline-none focus:ring-4 focus:ring-indigo-300 sm:w-auto`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [active, setActive] = useState<"profile" | "password">("profile");
  const [details, setDetails] = useState({
    username: "",
    email: "",
    bio: "",
  });
  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [passwordButtonDisabled, setPasswordButtonDisabled] = useState(true);

  const onSave = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/profile-settings", {
        newUsername: details.username,
        newEmail: details.email,
        newBio: details.bio,
      });
      console.log("Update success", response.data);
      toast.success("Save success");
      setDetails({ username: "", email: "", bio: "" });
    } catch (error: any) {
      console.log("Save failed", error);
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  const onUpdatePassword = async () => {
    if (passwords.newPassword !== passwords.confirm) {
      toast.error("New password and confirmation do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "/api/users/update-password",
        passwords
      );
      console.log("Password updated", response.data);
      toast.success("Password updated successfully");
      // reset fields
      setPasswords({ current: "", newPassword: "", confirm: "" });
    } catch (error: any) {
      console.log("Password update failed", error);
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!Object.values(details).some((val) => val.trim() !== ""));
  }, [details]);

  useEffect(() => {
    // All fields must be filled
    const allFilled = Object.values(passwords).every(
      (val) => val.trim() !== ""
    );
    setPasswordButtonDisabled(!allFilled);
  }, [passwords]);

  return (
    <div className="flex w-full flex-col gap-5 bg-white px-3 text-gray-900 md:flex-row md:px-16 lg:px-28">
      {/* Sidebar */}
      <aside className="hidden py-4 md:block md:w-1/3 lg:w-1/4">
        <div className="sticky top-12 flex flex-col gap-2 border-r border-indigo-100 p-4 text-sm">
          <h2 className="mb-4 pl-3 text-2xl font-semibold">Settings</h2>

          <button
            onClick={() => setActive("profile")}
            className={`flex items-center rounded-full px-3 py-2.5 ${
              active === "profile"
                ? "border font-bold text-indigo-900"
                : "font-semibold hover:border hover:text-indigo-900"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActive("password")}
            className={`flex items-center rounded-full px-3 py-2.5 ${
              active === "password"
                ? "border font-bold text-indigo-900"
                : "font-semibold hover:border hover:text-indigo-900"
            }`}
          >
            Password
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="min-h-screen w-full py-1 md:w-2/3 lg:w-3/4">
        {active === "profile" && (
          <ProfileSettings
            details={details}
            setDetails={setDetails}
            onSave={onSave}
            buttonDisabled={buttonDisabled}
            loading={loading}
          />
        )}
        {active === "password" && (
          <PasswordSettings
            passwords={passwords}
            setPasswords={setPasswords}
            onUpdatePassword={onUpdatePassword}
            passwordButtonDisabled={passwordButtonDisabled}
            loading={loading}
          />
        )}
      </main>
    </div>
  );
}
