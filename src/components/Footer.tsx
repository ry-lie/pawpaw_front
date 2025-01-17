import Link from "next/link";
import { PATHS } from "../constants/path";
import CommunityIcon from "@/assets/icons/community_icon.png"
import MapIcon from "@/assets/icons/map_icon.png"
import ChatIcon from "@/assets/icons/chat_icon.png"
import MyPageIcon from "@/assets/icons/mypage_icon.png"
import Image from "next/image";



export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white border-l border-r shadow-top-sm border-stroke_gray px-6 py-4 max-w-mobile w-full mx-auto h-14">
            <div className="flex justify-around items-center h-full">
                <div className="flex flex-col items-center">
                    <Link
                        href={PATHS.COMMUNITY}
                        className="flex flex-col justify-center items-center"
                    >
                        <Image
                            src={CommunityIcon}
                            alt="community"
                            className="h-6 w-8 mb-0.5"
                        />
                        <span className="text-xs font-semibold">커뮤니티</span>
                    </Link>
                </div>
                <div className="flex flex-col items-center">
                    <Link
                        href={PATHS.MAP}
                        className="flex flex-col justify-center items-center"
                    >
                        <Image
                            src={MapIcon}
                            alt="map"
                            className="h-7 w-5 mb-0.5"
                        />
                        <span className="text-xs font-semibold">지도</span>
                    </Link>
                </div>
                <div className="flex flex-col items-center">
                    <Link
                        href={PATHS.CHATTING_LIST}
                        className="flex flex-col justify-center items-center"
                    >
                        <Image
                            src={ChatIcon}
                            alt="chat"
                            className="h-7 w-6 mb-0.5"
                        />
                        <span className="text-xs font-semibold">채팅</span>
                    </Link>

                </div>
                <div className="flex flex-col items-center">
                    <Link
                        href={PATHS.MYPAGE}
                        className="flex flex-col justify-center items-center"
                    >
                        <Image
                            src={MyPageIcon}
                            alt="mypage"
                            className="h-8 w-8"
                        />
                        <span className="text-xs font-semibold">마이페이지</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
}