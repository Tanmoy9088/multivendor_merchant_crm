"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
Store,
Mail,
Lock,
Eye,
EyeOff,
User,
Phone,
ArrowRight,
ShieldCheck,
CheckCircle2,
} from "lucide-react";

import {
signupSchema,
SignupFormData,
signupDefaultValues,
} from "@/services/validation/SignupSchema";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

import {
signupMerchant,
} from "@/store/auth/authThunk";

import {
clearAuthError,
} from "@/store/auth/authSlice";

const MerchantSignup = () => {
const router = useRouter();
const dispatch = useAppDispatch();

const { pending, error } = useAppSelector(
(state) => state.auth
);

const [showPassword, setShowPassword] = useState(false);

const {
register,
handleSubmit,
formState: { errors },
} = useForm<SignupFormData>({
resolver: zodResolver(signupSchema),
defaultValues: signupDefaultValues,
});

const isLoading = pending === "signup";

const onSubmit = async (data: SignupFormData) => {
dispatch(clearAuthError());


try {
  await dispatch(
    signupMerchant({
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password,
      phone: Number(data.phone),
    })
  ).unwrap();

  router.replace("/merchant/dashboard");

} catch (error) {
  console.error("Merchant registration failed:", error);
}


};

return ( <div className="min-h-screen flex bg-white">

```
  {/* LEFT SECTION */}

  <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-950 text-white p-16 flex-col justify-between">

    {/* BRAND */}

    <Link href="/" className="flex items-center gap-3">
      <div className="bg-white/15 p-3 rounded-xl">
        <Store size={28} />
      </div>

      <span className="text-2xl font-bold tracking-tight">
        MerchantHub
      </span>
    </Link>

    {/* CONTENT */}

    <div className="max-w-lg">

      <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm mb-8">
        <span className="w-2 h-2 bg-green-400 rounded-full" />
        Start your business journey
      </div>

      <h1 className="text-5xl font-bold leading-tight mb-6">
        Build your store.
        <span className="text-indigo-300">
          {" "}Reach more customers.
        </span>
      </h1>

      <p className="text-indigo-100 text-lg leading-8">
        Join our merchant platform and get everything
        you need to manage your products, orders,
        customers, and business growth.
      </p>

      {/* BENEFITS */}

      <div className="mt-12 space-y-6">

        {[
          "Manage all your products in one place",
          "Track orders and customer activity",
          "Monitor your store performance",
          "Grow your online business",
        ].map((item) => (
          <div key={item} className="flex items-center gap-3">

            <div className="bg-green-400/20 p-1 rounded-full">
              <CheckCircle2
                size={18}
                className="text-green-300"
              />
            </div>

            <p className="text-indigo-100">
              {item}
            </p>

          </div>
        ))}

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

      <div className="flex lg:hidden items-center gap-3 mb-10">

        <div className="bg-indigo-600 text-white p-3 rounded-xl">
          <Store size={24} />
        </div>

        <span className="text-2xl font-bold text-slate-900">
          MerchantHub
        </span>

      </div>

      {/* HEADER */}

      <div className="mb-8">

        <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
          <User size={28} />
        </div>

        <h2 className="text-3xl font-bold text-slate-900">
          Create your account
        </h2>

        <p className="text-slate-500 mt-3">
          Register your merchant account to get started.
        </p>

      </div>

      {/* SIGNUP FORM */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        noValidate
      >

        {/* NAME */}

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-slate-700 mb-2"
          >
            Full Name
          </label>

          <div className="relative">
            <User
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              {...register("name")}
              className={`w-full pl-12 pr-4 py-3 border rounded-xl outline-none transition-all focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 ${
                errors.name
                  ? "border-red-400"
                  : "border-slate-200"
              }`}
            />
          </div>

          {errors.name && (
            <p className="text-red-500 text-xs mt-2">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* EMAIL */}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-slate-700 mb-2"
          >
            Email Address
          </label>

          <div className="relative">
            <Mail
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="email"
              type="email"
              placeholder="merchant@example.com"
              autoComplete="email"
              {...register("email")}
              className={`w-full pl-12 pr-4 py-3 border rounded-xl outline-none transition-all focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 ${
                errors.email
                  ? "border-red-400"
                  : "border-slate-200"
              }`}
            />
          </div>

          {errors.email && (
            <p className="text-red-500 text-xs mt-2">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* PHONE */}

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-slate-700 mb-2"
          >
            Phone Number
          </label>

          <div className="relative">
            <Phone
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="Enter your phone number"
              autoComplete="tel"
              {...register("phone")}
              className={`w-full pl-12 pr-4 py-3 border rounded-xl outline-none transition-all focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 ${
                errors.phone
                  ? "border-red-400"
                  : "border-slate-200"
              }`}
            />
          </div>

          {errors.phone && (
            <p className="text-red-500 text-xs mt-2">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* PASSWORD */}

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-slate-700 mb-2"
          >
            Password
          </label>

          <div className="relative">
            <Lock
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              autoComplete="new-password"
              {...register("password")}
              className={`w-full pl-12 pr-12 py-3 border rounded-xl outline-none transition-all focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 ${
                errors.password
                  ? "border-red-400"
                  : "border-slate-200"
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              {showPassword ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
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
          <div
            role="alert"
            className="bg-red-50 border border-red-100 text-red-600 text-sm p-3 rounded-xl"
          >
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
              Creating Account...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight size={19} />
            </>
          )}
        </button>

      </form>

      {/* LOGIN LINK */}

      <p className="text-center text-sm text-slate-500 mt-8">
        Already have a merchant account?{" "}
        <Link
          href="/auth/login"
          className="text-indigo-600 font-semibold hover:underline"
        >
          Sign In
        </Link>
      </p>

      {/* SECURITY */}

      <div className="flex items-center justify-center gap-2 mt-8 text-xs text-slate-400">
        <ShieldCheck size={16} />
        Secure merchant registration
      </div>

    </div>

  </div>

</div>


);
};

export default MerchantSignup;
