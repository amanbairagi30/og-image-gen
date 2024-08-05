import medial from "../../public/medial.webp"
import banner from "../../public/banner-2.png"
import { Forward, Heart, Link2Icon, MessageCircle } from "lucide-react"
import { CardProps } from "@/types";


export default function Card({ postData, key }: CardProps) {
    const { title, content, orgImageUrl, ogImage } = postData;
    return (
        <div key={key} className="relative h-[30rem] border-red-500">
            <div className="w-full h-[60%]">
                <img className="w-full rounded-t-lg h-full object-cover" src={orgImageUrl ?? banner} alt="banner" />
            </div>

            <div className="w-full h-[40%]">
                <div className="w-full flex flex-col h-full bg-white/55 shadow-xl rounded-b-lg backdrop-blur-md p-2">
                    <div className="flex items-center justify-between">
                        <p className=" font-semibold">{title}</p>
                        <img className="w-[2rem] h-[2rem] rounded-full object-cover" src={medial} alt="" />
                    </div>
                    <p className="flex-1 text-gray-800 text-sm font-semibold mt-2">{content?.slice(0, 150)}</p>
                    <div className="p-2 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="flex hover:bg-[#35353517] p-2 rounded-full cursor-pointer items-center gap-1">
                                <Heart size={18} />
                                <p>100</p>
                            </div>
                            <div className="flex items-center hover:bg-[#35353517] p-2 rounded-full cursor-pointer gap-1">
                                <MessageCircle size={18} />
                                <p>20</p>
                            </div>
                            <div className="flex items-center hover:bg-[#35353517] p-2 rounded-full cursor-pointer gap-1">
                                <Forward size={18} />
                                <p>5</p>
                            </div>
                        </div>

                        <div onClick={() => window.open(ogImage, '_blank')} className="flex cursor-pointer items-center gap-1">
                            OG
                            <Link2Icon />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
