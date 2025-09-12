import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSignup } from "../../store/slices/authSlice";
const Signup = () => {
  const [form, setForm] = useState({ email: "", name: "", password: "" });
  const [usePhone, setUsePhone] = useState(false);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userSignup(form));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <div className="w-[400px] bg-neutral-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Sign up to start listening
        </h1>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!usePhone ? (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                className="p-3 rounded-md bg-neutral-800 text-white border border-neutral-700"
                required
              />
              <p
                className="text-sm text-green-400 cursor-pointer"
                onClick={() => setUsePhone(true)}
              >
                Use phone number instead.
              </p>
            </>
          ) : (
            <>
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={form.phone || ""}
                onChange={handleChange}
                className="p-3 rounded-md bg-neutral-800 text-white border border-neutral-700"
                required
              />
              <p
                className="text-sm text-green-400 cursor-pointer"
                onClick={() => setUsePhone(false)}
              >
                Use email instead.
              </p>
            </>
          )}

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="p-3 rounded-md bg-neutral-800 text-white border border-neutral-700"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="p-3 rounded-md bg-neutral-800 text-white border border-neutral-700"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="p-3 bg-green-500 hover:bg-green-600 rounded-md font-semibold"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-green-400">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
