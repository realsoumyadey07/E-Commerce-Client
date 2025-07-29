import first from "@/assets/images/1.jpg"
import second from "@/assets/images/2.jpg"
import third from "@/assets/images/3.jpg"
import forth from "@/assets/images/4.jpg"

export default function ExploreComponent() {
  const items = [
    { img: first, label: "Bed Sheets" },
    { img: second, label: "Room Decorator" },
    { img: third, label: "Wardrobe" },
    { img: forth, label: "Lights" },
  ];

  return (
    <div className="w-[320px] rounded-2xl shadow-md border p-4 bg-white flex flex-col gap-4 cursor-pointer">
      <h2 className="text-base font-semibold">Appliances for your home | Up to 55% off</h2>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <img src={item.img} alt={item.label} className="w-[150px] h-[100px] object-cover rounded" />
            <p className="text-sm text-center">{item.label}</p>
          </div>
        ))}
      </div>
      <p className="text-blue-700 text-sm hover:underline">Explore all</p>
    </div>
  );
}
