"use client";

import { useAuthContext } from "@/context/AuthProvider";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ErrorResponse {
  message: string;
}

const Signup = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthContext();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
      password2: { value: string };
    };

    const username = target.username.value;
    const password = target.password.value;
    const password2 = target.password2.value;

    if (password !== password2) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8080/auth/register",
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      setUser(res.data);
      router.push("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);

      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response?.data?.message) {
        return setError(axiosError.response.data.message);
      }
    }
  };

  return (
    <div className="mt-20">
      <div
        className={`bg-red-500 text-white text-center py-2 h-12 border border-zinc-200 w-[40rem] mx-auto flex justify-center items-center rounded-lg ${
          error ? "" : "invisible"
        }`}
      >
        {error}
      </div>
      <form
        action=""
        className="flex flex-col w-[40rem] m-auto border border-zinc-200 px-6 py-8 mt-2 rounded-lg gap-6 shadow-lg"
        onSubmit={handleSubmit}
      >
        <label htmlFor="username">
          <p className="text-lg font-medium text-indigo-800">Username</p>
          <input
            type="text"
            id="username"
            className="w-full border outline-none ps-3 py-2 mt-2 focus:shadow-lg"
            required
            onFocus={() => setError("")}
          />
        </label>

        <label htmlFor="password">
          <p className="text-lg font-medium text-indigo-800">Password</p>
          <input
            type="password"
            id="password"
            className="w-full border outline-none ps-3 py-2 mt-2 focus:shadow-lg"
            required
            onFocus={() => setError("")}
          />
        </label>

        <label htmlFor="password2">
          <p className="text-lg font-medium text-indigo-800">Password Again</p>
          <input
            type="password"
            id="password2"
            className="w-full border outline-none ps-3 py-2 mt-2 focus:shadow-lg"
            required
            onFocus={() => setError("")}
          />
        </label>
        <Link href="/login" className="text-center underline">
          Do have an account? Login here
        </Link>
        <button
          className="bg-indigo-600 text-white px-6 py-2 w-28 m-auto rounded hover:bg-indigo-700 transition-all disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Loading..." : "SIGNUP"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
