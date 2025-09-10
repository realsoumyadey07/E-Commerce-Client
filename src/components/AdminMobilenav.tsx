import useAdminav from "@/hooks/useAdminav";
import { CircleSmall, Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminMobilenav() {
  const [open, setOpen] = useState<boolean>(false);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const navMenu = useAdminav();
  const navigate = useNavigate();

  const handleMenuToggle = (index: number) => {
    setOpenMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <nav className="block lg:hidden">
        <div className="p-4 cursor-pointer" onClick={() => setOpen(true)}>
          <Menu />
        </div>
      </nav>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#343a40] z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center p-4 border-b border-gray-700">
          <h1
            className="font-bold text-white text-xl"
            onClick={() => {
              navigate("/admin");
              setOpen(false);
            }}
          >
            Realestate
          </h1>
        </div>

        <div className="px-4 space-y-3">
          {navMenu &&
            navMenu.map((menuItem, index) => (
              <div className="flex flex-col" key={index}>
                <div
                  onClick={() => handleMenuToggle(index)}
                  className="cursor-pointer p-2 font-semibold rounded-md hover:bg-gray-600 text-gray-200 flex items-center gap-2"
                >
                  {menuItem.icon}
                  {menuItem.title}
                </div>

                {openMenuIndex === index && (
                  <ul className="ml-6">
                    {menuItem.subMenu.map((subItem, subIndex) => (
                      <li
                        key={subIndex}
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-600 text-gray-200 cursor-pointer"
                        onClick={() => {
                          navigate(subItem.href);
                          setOpen(false);
                        }}
                      >
                        <CircleSmall color="white" />
                        <p>{subItem.title}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
