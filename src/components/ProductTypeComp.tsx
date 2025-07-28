import Mobile from "@/assets/images/mobile.webp"


interface ProductTypeComp {
    title: string;
    img?: string;
}

export default function ProductTypeComp({title, img}: ProductTypeComp){
    return (
        <div className="flex flex-col items-center">
            <img src={img? img : Mobile} alt="type img" className="w-[50px]" />
            <h1 className="text-sm text-gray-700">{title}</h1>
        </div>
    )
}