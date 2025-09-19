import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSignup } from "../../store/slices/authSlice";
import {
  isValidEmail,
  isStrongPassword,
  isValidPhone,
  isValidName,
} from "../../utils/Helper";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [usePhone, setUsePhone] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error: serverError } = useSelector((state) => state.auth);

  const validateField = (name, value) => {
    if (name === "email") {
      if (!value || !value.trim()) return "Email is required.";
      if (!isValidEmail(value)) return "Please enter a valid email address.";
      return "";
    }
    if (name === "phone") {
      if (!value || !value.trim()) return "Phone number is required.";
      if (!isValidPhone(value))
        return "Enter a valid phone number (10-15 digits).";
      return "";
    }
    if (name === "name") {
      if (!value || !value.trim()) return "Name is required.";
      if (!isValidName(value))
        return "Name must contain only letters and be at least 3 characters.";
      return "";
    }
    if (name === "password") {
      if (!value) return "Password is required.";
      if (!isStrongPassword(value))
        return "Password must be at least 8 chars, include uppercase, lowercase, number and special character.";
      return "";
    }
    if (name === "confirmPassword") {
      if (!value) return "Please confirm your password.";
      if (value !== form.password) return "Passwords do not match.";
      return "";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setGeneralError("");
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleToggleUsePhone = () => {
    setUsePhone((s) => !s);
    if (!usePhone) {
      setForm((p) => ({ ...p, email: "" }));
      setErrors((p) => ({ ...p, email: "" }));
    } else {
      setForm((p) => ({ ...p, phone: "" }));
      setErrors((p) => ({ ...p, phone: "" }));
    }
    setGeneralError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (usePhone) {
      const phoneErr = validateField("phone", form.phone);
      if (phoneErr) newErrors.phone = phoneErr;
    } else {
      const emailErr = validateField("email", form.email);
      if (emailErr) newErrors.email = emailErr;
    }

    const nameErr = validateField("name", form.name);
    if (nameErr) newErrors.name = nameErr;

    const passErr = validateField("password", form.password);
    if (passErr) newErrors.password = passErr;

    const confirmErr = validateField("confirmPassword", form.confirmPassword);
    if (confirmErr) newErrors.confirmPassword = confirmErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setGeneralError("Please fix the highlighted fields.");
      return;
    }

    setGeneralError("");

    const payload = {
      name: form.name.trim(),
      password: form.password,
      ...(usePhone
        ? { phone: form.phone.trim() }
        : { email: form.email.trim() }),
    };

    // Dispatch and redirect on success
    dispatch(userSignup(payload))
      .unwrap()
      .then(() => navigate("/login"))
      .catch(() => {}); // errors handled in slice
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <div className="w-[400px] bg-neutral-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Sign up to start listening
        </h1>

        {generalError && <p className="text-red-500 mb-3">{generalError}</p>}
        {serverError && <p className="text-red-500 mb-3">{serverError}</p>}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-4"
        >
          {!usePhone ? (
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`p-3 rounded-md bg-neutral-800 text-white w-full border ${
                  errors.email ? "border-red-500" : "border-neutral-700"
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
              <p
                className="text-sm text-green-400 cursor-pointer mt-2"
                onClick={handleToggleUsePhone}
              >
                Use phone number instead.
              </p>
            </div>
          ) : (
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`p-3 rounded-md bg-neutral-800 text-white w-full border ${
                  errors.phone ? "border-red-500" : "border-neutral-700"
                }`}
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
              )}
              <p
                className="text-sm text-green-400 cursor-pointer mt-2"
                onClick={handleToggleUsePhone}
              >
                Use email instead.
              </p>
            </div>
          )}

          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="p-3 rounded-md bg-neutral-800 text-white w-full border border-neutral-700"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-2">
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`p-3 w-full rounded-md bg-neutral-800 text-white border pr-10 ${
                  errors.password ? "border-red-500" : "border-neutral-700"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-2">
            <div className="relative flex items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`p-3 w-full rounded-md bg-neutral-800 text-white border pr-10 ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-neutral-700"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((s) => !s)}
                className="absolute right-3 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

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
