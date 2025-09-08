import { CircleSmall, Gauge } from "lucide-react";
import { Button } from "./ui/button";
import useAdminav from "@/hooks/useAdminav";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomDialogbox from "./CustomDialogbox";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import toast from "react-hot-toast";
import { userLogout } from "@/redux/slices/user.slice";
import { motion, AnimatePresence } from "framer-motion"; // 👈 add this

export default function AdminDesktopnav() {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const navMenu = useAdminav();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleMenuToggle = (index: number) => {
    setOpenMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const logoutPromise = async () => {
    await dispatch(userLogout()).unwrap();
    navigate("/authentication");
  };

  const handleLogout = () => {
    toast.promise(logoutPromise(), {
      loading: "Logging out...",
      success: <b>User logged out successfully!</b>,
      error: (err) => <b>{err || "Could not logout."}</b>,
    });
  };

  return (
    <div className="hidden md:flex flex-col justify-between shadow-2xl w-[300px] p-3 bg-[#343a40] select-none h-screen">
      <main>
        <h1
          className="font-semibold text-gray-200 text-xl mb-4"
          onClick={() => navigate("/admin")}
        >
          Bijoy Jewellers
        </h1>

        <div>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 my-2 flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/admin")}
          >
            <Gauge />
            Dashboard
          </Button>

          {navMenu &&
            navMenu.map((menuItem, index) => (
              <div className="flex flex-col gap-2" key={index}>
                <div
                  onClick={() => handleMenuToggle(index)}
                  className="cursor-pointer p-2 font-semibold rounded-md hover:bg-gray-600 text-gray-200 flex items-center gap-2"
                >
                  {menuItem.icon}
                  {menuItem.title}
                </div>

                {/* 👇 Animate submenu */}
                <AnimatePresence>
                  {openMenuIndex === index && (
                    <motion.ul
                      className="ml-6 overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.1, ease: "easeOut" }}
                    >
                      {menuItem.subMenu.map((subItem, subIndex) => (
                        <li
                          key={subIndex}
                          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-600 text-gray-200"
                          onClick={() => navigate(subItem.href)}
                        >
                          <CircleSmall color="white" />
                          <p>{subItem.title}</p>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ))}
        </div>
      </main>
      <div className="flex justify-between items-center">
        <CustomDialogbox
          buttonName="Logout"
          dialogTitle="Do you want to logout?"
          extraButton="Logout"
          onClick={handleLogout}
        />
        <p
          className="text-gray-300 hover:underline cursor-pointer text-sm"
          onClick={() => navigate("/")}
        >
          Products
        </p>
      </div>
    </div>
  );
}
