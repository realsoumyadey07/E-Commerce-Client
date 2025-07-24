import BackgroundImage from "@/assets/images/onboarding.jpg";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";

const loginSchema = yup
  .object({
    email: yup.string().email("Invalid email!").required("Email is required!"),
    password: yup
      .string()
      .required("Password is required!")
      .min(6, "Password must be at least 6 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one numeric digit")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
  })
  .required();

const registrationSchema = yup
  .object({
    username: yup
      .string()
      .required("Username is required!")
      .min(4, "Username must be at least 4 characters"),
    email: yup.string().email("Invalid email!").required("Email is required!"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one numeric digit")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
  })
  .required();

export default function Onboarding() {
  const [screen, setScreen] = useState<"Login" | "Register" | null>(null);
  const [isHidePassword, setIsHidePassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(
      screen === "Login" ? loginSchema : registrationSchema
    ),
  });

  const handleLogin = () => {};
  const handleRegister = () => {};
  return (
    <div className="flex h-screen">
      <section className="w-full lg:w-2/3 flex items-center justify-center h-full flex-col px-4">
        {screen === "Login" ? (
          <>
            <div className="w-full max-w-[496px] z-50">
              <Link to={"/"} className="font-semibold text-gray-800 text-2xl">
                MERN Stock App
              </Link>
              <div className="my-4">
                <h4 className="text-4xl font-semibold">Login 👋</h4>
                <p className="text-gray-500 mt-3">A Stock checking app...</p>
              </div>
              <form
                onSubmit={handleSubmit(handleLogin)}
                className="flex flex-col gap-2"
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-gray-400">
                    Email
                  </label>
                  <input
                    type="email"
                    className="border border-gray-500 rounded-md py-2 px-3"
                    placeholder="Enter your email here..."
                    defaultValue=""
                    {...register("email")}
                  />
                  {errors?.email?.message && (
                    <span className="text-sm text-red-500">
                      {errors?.email?.message}
                    </span>
                  )}
                </div>
                <div className="flex relative flex-col gap-2">
                  <label htmlFor="email" className="text-gray-400">
                    Password
                  </label>
                  <input
                    type={isHidePassword ? "password" : "text"}
                    className="border border-gray-500 rounded-md py-2 px-3"
                    placeholder={
                      isHidePassword ? "*******" : "Enter your password here..."
                    }
                    defaultValue=""
                    {...register("password")}
                  />
                  {errors?.password?.message && (
                    <span className="text-sm text-red-500">
                      {errors?.password?.message}
                    </span>
                  )}
                  <span
                    className="absolute top-11 right-4"
                    onClick={() => setIsHidePassword(!isHidePassword)}
                  >
                    {isHidePassword && isHidePassword ? <EyeClosed /> : <Eye />}
                  </span>
                </div>
                <Button
                  type="submit"
                  className="py-2 px-3 bg-gray-700 hover:bg-gray-800 text-white rounded-[5px] font-semibold my-4 z-10"
                >
                  Login
                </Button>
                <span>
                  <p
                    onClick={() => {
                      setScreen("Register");
                      reset();
                    }}
                    className="hover:underline cursor-pointer inline text-blue-950"
                  >
                    Don&apos;t have an account??
                  </p>
                </span>
              </form>
            </div>
          </>
        ) : screen === "Register" ? (
          <>
            <div className="w-full max-w-[496px] z-50">
              <Link to={"/"} className="font-semibold text-gray-800 text-2xl">
                MERN Stock App
              </Link>
              <div className="my-4">
                <h4 className="text-4xl font-semibold">Register 👋</h4>
                <p className="text-gray-500 mt-3">A Stock checking app...</p>
              </div>
              <form
                onSubmit={handleSubmit(handleRegister)}
                className="flex flex-col gap-2"
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="username" className="text-gray-400">
                    Username
                  </label>
                  <input
                    type="text"
                    className="border border-gray-500 rounded-md py-2 px-3"
                    placeholder="Enter your username here..."
                    defaultValue=""
                    {...register("username")}
                  />
                  {errors?.username?.message && (
                    <span className="text-sm text-red-500">
                      {errors?.username?.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-gray-400">
                    Email
                  </label>
                  <input
                    type="email"
                    className="border border-gray-500 rounded-md py-2 px-3"
                    placeholder="Enter your email here..."
                    defaultValue=""
                    {...register("email")}
                  />
                  {errors?.email?.message && (
                    <span className="text-sm text-red-500">
                      {errors?.email?.message}
                    </span>
                  )}
                </div>
                <div className="flex relative flex-col gap-2">
                  <label htmlFor="email" className="text-gray-400">
                    Password
                  </label>
                  <input
                    type={isHidePassword ? "password" : "text"}
                    className="border border-gray-500 rounded-md py-2 px-3"
                    placeholder={
                      isHidePassword ? "*******" : "Enter your password here..."
                    }
                    defaultValue=""
                    {...register("password")}
                  />
                  {errors?.password?.message && (
                    <span className="text-sm text-red-500">
                      {errors?.password?.message}
                    </span>
                  )}
                  <span
                    className="absolute top-11 right-4"
                    onClick={() => setIsHidePassword(!isHidePassword)}
                  >
                    {isHidePassword && isHidePassword ? <EyeClosed /> : <Eye />}
                  </span>
                </div>
                <Button
                  type="submit"
                  className="py-2 px-3 bg-gray-700 hover:bg-gray-800 text-white rounded-[5px] font-semibold my-4 z-10"
                >
                  Register
                </Button>
                <span>
                  <p
                    onClick={() => {
                      setScreen("Login");
                      reset();
                    }}
                    className="hover:underline cursor-pointer inline text-blue-950"
                  >
                    Already have an account??
                  </p>
                </span>
              </form>
            </div>
          </>
        ) : (
          <>
            <h2 className="bg-clip-text text-gray-900 text-center  text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
              Check your mutual funds with our{" "}
              <span className="bg-gradient-to-r from-blue-950 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Stock APP!
              </span>
            </h2>
            <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
              A Stock checking application which allows you to keep track on
              your best performing stocks.
            </p>
            <div className="mt-4 z-50">
              <Button
                onClick={() => setScreen("Login")}
                className="bg-gray-800 text-white cursor-pointer hover:bg-gray-900 transition duration-200 ease-in-out shadow-xl/30"
              >
                Get Started!
              </Button>
            </div>
          </>
        )}
      </section>
      <section className="lg:flex w-full hidden -scale-x-100 lg:w-1/3  h-full right-0">
        <img
          src={BackgroundImage}
          alt="background image"
          className="object-cover w-full h-full"
        />
      </section>
    </div>
  );
}
