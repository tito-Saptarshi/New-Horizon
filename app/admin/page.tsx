"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
    // Expose the password securely through NEXT_PUBLIC_ prefix
    const pass = process.env.NEXT_PUBLIC_PASS_ADMIN;

    const [passKey, setPassKey] = useState(""); // State for the input password
    const router = useRouter(); // Router for navigation

    const handleLogin = () => {
        if (passKey === pass) {
            router.push(`/admin/panel?passKey=${passKey}`); // Redirect if the password matches
        } else {
            alert("Incorrect password!"); // Alert user if the password is wrong
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-center text-xl font-bold">Admin Panel</h1>
            <div className="mt-5">Enter pass key:</div>
            <div className="flex gap-2 items-center mt-3">
                <Input
                    className="w-2/3"
                    value={passKey}
                    onChange={(e) => setPassKey(e.target.value)} // Update state
                    placeholder="Enter admin password"
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleLogin} // Check password and redirect
                >
                    Login
                </button>
            </div>
        </div>
    );
}
