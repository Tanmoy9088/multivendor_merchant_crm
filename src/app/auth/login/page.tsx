"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Store,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import {
  loginSchema,
  LoginFormData,
  loginDefaultValues,
} from "@/services/validation/LoginSchema";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

import { loginMerchant } from "@/store/auth/authThunk";

const MerchantLogin = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const { pending, error } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: loginDefaultValues,
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await dispatch(loginMerchant(data)).unwrap();

      router.replace("/merchant/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const isLoading = pending === "login";

  return (
    <div className="min-h-screen flex bg-white">
      {/* LEFT SECTION */}

      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-950 text-white p-16 flex-col justify-between">
        {/* BRAND */}

        <div className="flex items-center gap-3">
          <div className="bg-white/15 p-3 rounded-xl">
            <Store size={28} />
          </div>

          <span className="text-2xl font-bold tracking-tight">MerchantHub</span>
        </div>

        {/* CONTENT */}

        <div className="max-w-lg">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            Your business, your growth
          </div>

          <h1 className="text-5xl font-bold leading-tight mb-6">
            Manage your store.
            <span className="text-indigo-300"> Grow your business.</span>
          </h1>

          <p className="text-indigo-100 text-lg leading-8">
            Everything you need to manage your products, track orders, monitor
            sales, and grow your e-commerce business in one place.
          </p>

          {/* REVENUE CARD */}

          <div className="mt-12 bg-white/10 border border-white/15 rounded-2xl p-6 backdrop-blur-md">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-indigo-200 text-sm">Total Revenue</p>

                <h2 className="text-3xl font-bold mt-2">₹2,45,890</h2>
              </div>

              <div className="bg-green-400/20 text-green-300 px-3 py-2 rounded-lg text-sm flex items-center gap-2">
                <TrendingUp size={16} />
                +18.5%
              </div>
            </div>

            {/* GRAPH */}

            <div className="flex items-end gap-3 h-24 mt-8">
              {[35, 55, 40, 75, 50, 85, 65, 95, 70, 100, 80, 90].map(
                (height, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-indigo-300/80 rounded-t-md"
                    style={{ height: `${height}%` }}
                  />
                ),
              )}
            </div>

            <div className="flex justify-between text-xs text-indigo-200 mt-3">
              <span>Jan</span>
              <span>Mar</span>
              <span>May</span>
              <span>Jul</span>
              <span>Sep</span>
              <span>Dec</span>
            </div>
          </div>
        </div>

        <p className="text-indigo-300 text-sm">
          © 2026 MerchantHub. All rights reserved.
        </p>
      </div>

      {/* RIGHT SECTION */}

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* MOBILE BRAND */}

          <div className="flex lg:hidden items-center gap-3 mb-12">
            <div className="bg-indigo-600 text-white p-3 rounded-xl">
              <Store size={24} />
            </div>

            <span className="text-2xl font-bold text-slate-900">
              MerchantHub
            </span>
          </div>

          {/* HEADER */}

          <div className="mb-10">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
              <Store size={28} />
            </div>

            <h2 className="text-3xl font-bold text-slate-900">Welcome back!</h2>

            <p className="text-slate-500 mt-3">
              Sign in to access your merchant dashboard.
            </p>
          </div>

          {/* LOGIN FORM */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            {/* EMAIL */}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  placeholder="merchant@example.com"
                  {...register("email")}
                  className={`w-full pl-12 pr-4 py-3.5 border rounded-xl outline-none transition-all focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 ${
                    errors.email ? "border-red-400" : "border-slate-200"
                  }`}
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-slate-700">
                  Password
                </label>

                <button
                  type="button"
                  onClick={() => router.push("/forgot-password")}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <Lock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className={`w-full pl-12 pr-12 py-3.5 border rounded-xl outline-none transition-all focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 ${
                    errors.password ? "border-red-400" : "border-slate-200"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* API ERROR */}

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-3 rounded-xl">
                {error}
              </div>
            )}

            {/* SUBMIT BUTTON */}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-indigo-200"
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={19} />
                </>
              )}
            </button>
          </form>

          {/* REGISTER */}

          <p className="text-center text-sm text-slate-500 mt-8">
            Don't have a merchant account?{" "}
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Create account
            </button>
          </p>

          {/* SECURITY */}

          <div className="flex items-center justify-center gap-2 mt-10 text-xs text-slate-400">
            <ShieldCheck size={16} />
            Secure merchant authentication
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantLogin;
