import Link from "next/link";
import path from "path";
import { PATHS } from "../constants/path";


export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white border-l border-r shadow-top-sm border-stroke_gray px-6 py-4 max-w-mobile w-full mx-auto h-[61px]">
            <div className="flex justify-around items-center h-full">
                <div className="flex flex-col items-center">
                    <Link
                        href={PATHS.COMMUNITY}
                        className="flex flex-col justify-center items-center"
                    >
                        <img
                            src="/icons/community_icon.png"
                            alt="community"
                            className="h-[28px] w-[35px] mb-0.5"
                        />
                        <span className="text-xs font-semibold">커뮤니티</span>
                    </Link>
                </div>
                <div className="flex flex-col items-center">
                    <Link
                        href={PATHS.MAP}
                        className="flex flex-col justify-center items-center"
                    >
                        <img
                            src="/icons/map_icon.png"
                            alt="map"
                            className="h-[31px] w-[22px] mb-0.5"
                        />
                        <span className="text-xs font-semibold">지도</span>
                    </Link>
                </div>
                <div className="flex flex-col items-center">
                    <Link
                        href={PATHS.CHATTING_LIST}
                        className="flex flex-col justify-center items-center"
                    >
                        <img
                            src="/icons/chat_icon.png"
                            alt="chat"
                            className="h-[28.5px] w-[28.5px] mb-1"
                        />
                        <span className="text-xs font-semibold">채팅</span>
                    </Link>
                </div>
                <div className="flex flex-col items-center">
                    <Link
                        href={PATHS.MYPAGE}
                        className="flex flex-col justify-center items-center"
                    >
                        <img
                            src="/icons/mypage_icon.png"
                            alt="mypage"
                            className="h-[34px] w-[34px]"
                        />
                        <span className="text-xs font-semibold">마이페이지</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
}