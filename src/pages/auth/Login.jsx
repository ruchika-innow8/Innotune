import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../store/slices/authSlice";
import { isValidEmail } from "../../utils/Helper";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error: serverError } = useSelector((state) => state.auth);

  const validateField = (name, value) => {
    if (name === "email") {
      if (!value || !value.trim()) return "Email is required.";
      if (!isValidEmail(value)) return "Please enter a valid email address.";
      return "";
    }
    if (name === "password") {
      if (!value) return "Password is required.";
      return "";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
    setGeneralError("");
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((p) => ({ ...p, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const emailErr = validateField("email", form.email);
    const passErr = validateField("password", form.password);

    if (emailErr) newErrors.email = emailErr;
    if (passErr) newErrors.password = passErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setGeneralError("Please fix the errors below.");
      return;
    }

    setGeneralError("");

    // Dispatch login and redirect on success
    dispatch(userLogin({ email: form.email.trim(), password: form.password }))
      .unwrap()
      .then(() => navigate("/dashboard"))
      .catch(() => {});
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <div className="w-[400px] bg-neutral-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome Back</h1>

        {generalError && <p className="text-red-500 mb-3">{generalError}</p>}
        {serverError && <p className="text-red-500 mb-3">{serverError}</p>}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-4"
        >
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`p-3 rounded-md bg-neutral-800 text-white border w-full ${
                errors.email ? "border-red-500" : "border-neutral-700"
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`p-3 w-full rounded-md bg-neutral-800 text-white border ${
                errors.password ? "border-red-500" : "border-neutral-700"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

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
