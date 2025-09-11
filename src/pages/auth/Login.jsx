import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../features/authSlice";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(form));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <div className="w-[400px] bg-neutral-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome Back</h1>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="p-3 rounded-md bg-neutral-800 text-white border border-neutral-700"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="p-3 rounded-md bg-neutral-800 text-white border border-neutral-700"
          />
          <button
            type="submit"
            disabled={loading}
            className="p-3 bg-green-500 hover:bg-green-600 rounded-md font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="text-green-400">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
