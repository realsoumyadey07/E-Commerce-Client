import BackgroundImage from "@/assets/images/onboarding.jpg";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  userLogin,
  userRegistration,
  type FormType,
} from "@/redux/slices/user.slice";
import { useAppSelector } from "@/hooks/useAppSelector";
import toast from "react-hot-toast";
import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";
import { Spinner } from "@/components/ui/spinner";

const loginSchema = yup
  .object({
    email: yup.string().email("Invalid email!").required("Email is required!"),
    password: yup.string().required("Password is required!"),
  })
  .required();

const registrationSchema = yup
  .object({
    name: yup
      .string()
      .required("Name is required!")
      .min(4, "Name must be at least 4 characters"),
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
  const [screen, setScreen] = useState<"Login" | "Register">("Login");
  const [isHidePassword, setIsHidePassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading } = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    resolver: yupResolver(
      screen === "Login" ? loginSchema : registrationSchema
    ),
  });

  const loginPromise = async (data: FormType) => {
    const user = await dispatch(userLogin(data)).unwrap();
    navigate(user?.role === "admin" ? "/admin" : "/");
  };

  const handleLogin = async (data: FormType) => {
    toast.promise(loginPromise(data), {
      loading: "Logging in...",
      success: <b>User logged in successfully!</b>,
      error: (err) => <b>{err || "Could not login."}</b>,
    });
  };

  const registerPromise = async (data: FormType) => {
    await dispatch(userRegistration(data)).unwrap();
    setScreen("Login");
  };

  const handleRegister = (data: FormType) => {
    toast.promise(registerPromise(data), {
      loading: "Registering...",
      success: <b>User registered successfully!</b>,
      error: (err) => <b>{err || "Registration faild try again later!."}</b>,
    });
  };

  return (
    <div className="flex h-screen">
      <section className="w-full lg:w-2/3 flex items-center justify-center h-full flex-col px-4">
        {screen === "Login" ? (
          <>
            <div className="w-full max-w-[496px] z-50">
              <div className="my-2 text-center">
                <Link to={"/"} className="font-semibold text-gray-800 text-3xl">
                  Login
                </Link>
                <p className="text-gray-500">Welcome back to your profile</p>
              </div>
              <form
                onSubmit={handleSubmit(handleLogin)}
                className="flex flex-col gap-3"
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-gray-600">
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
                  <label htmlFor="password" className="text-gray-600">
                    Password
                  </label>
                  <input
                    type={isHidePassword ? "text" : "password"}
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
                    className="absolute top-10 right-4"
                    onClick={() => setIsHidePassword(!isHidePassword)}
                  >
                    {isHidePassword ? <EyeClosed /> : <Eye />}
                  </span>
                </div>
                <Button
                  type="submit"
                  className="p-5 text-md bg-gray-800 text-white rounded-[5px] font-semibold z-10"
                  disabled={isLoading}
                >
                  {isLoading && <Spinner/>}
                  {isLoading ? "Logging in..." : "Login"}
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
                <div className="flex items-center w-full">
                  <div className="flex-grow border-t border-gray-400"></div>
                  <span className="px-3 text-xl font-semibold text-gray-700">
                    Or continue with
                  </span>
                  <div className="flex-grow border-t border-gray-400"></div>
                </div>
                <div className="w-full flex justify-center gap-4">
                  <FaGoogle size={25} color="gray" />
                  <FaFacebook size={25} color="gray" />
                  <FaInstagram size={25} color="gray" />
                </div>
              </form>
            </div>
          </>
        ) : (
          <>
            <div className="w-full max-w-[496px] z-50">
              <div className="my-2 text-center">
                <Link to={"/"} className="font-semibold text-gray-800 text-3xl">
                  Register
                </Link>
                <p className="text-gray-500">Register here to get started</p>
              </div>
              <form
                onSubmit={handleSubmit(handleRegister)}
                className="flex flex-col gap-2"
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-gray-400">
                    Name
                  </label>
                  <input
                    type="text"
                    className="border border-gray-500 rounded-md py-2 px-3"
                    placeholder="Enter your username here..."
                    defaultValue=""
                    {...register("name")}
                  />
                  {errors?.name?.message && (
                    <span className="text-sm text-red-500">
                      {errors?.name?.message}
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
                  <label htmlFor="password" className="text-gray-400">
                    Password
                  </label>
                  <input
                    type={isHidePassword ? "text" : "password"}
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
                    {isHidePassword ? <EyeClosed /> : <Eye />}
                  </span>
                </div>
                <Button
                  type="submit"
                  className="py-2 px-3 bg-gray-700 hover:bg-gray-800 text-white rounded-[5px] font-semibold my-2 z-10"
                  disabled={isLoading}
                >
                  {isLoading ? "Registering..." : "Register"}
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
                <div className="flex items-center w-full">
                  <div className="flex-grow border-t border-gray-400"></div>
                  <span className="px-3 text-xl font-semibold text-gray-700">
                    Or continue with
                  </span>
                  <div className="flex-grow border-t border-gray-400"></div>
                </div>
                <div className="w-full flex justify-center gap-4">
                  <FaGoogle size={25} color="gray" />
                  <FaFacebook size={25} color="gray" />
                  <FaInstagram size={25} color="gray" />
                </div>
              </form>
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
