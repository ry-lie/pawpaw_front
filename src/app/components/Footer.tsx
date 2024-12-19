import Link from "next/link";

export default function Footer() {
    return (
        <div className="flex w-full p-1 justify-around">
            <div className="flex flex-col items-center">
                <Link
                    href={"/community"}
                    className="flex flex-col justify-center items-center"
                >
                    <img
                        src="/icons/community_icon.png"
                        alt="community"
                        className="h-10 w-12 mb-1"
                    />
                    커뮤니티
                </Link>
            </div>
            <div className="flex flex-col items-center">
                <Link
                    href={"/map"}
                    className="flex flex-col justify-center items-center"
                >
                    <img
                        src="/icons/map_icon.png"
                        alt="map"
                        className="h-10 w-12 mb-1"
                    />
                    지도
                </Link>
            </div>
            <div className="flex flex-col items-center">
                <Link
                    href={"/chat"}
                    className="flex flex-col justify-center items-center"
                >
                    <img
                        src="/icons/chat_icon.png"
                        alt="chat"
                        className="h-10 w-10 mb-1"
                    />
                    채팅
                </Link>
            </div>
            <div>
                <Link
                    href={"/mypage"}
                    className="flex flex-col justify-center items-center"
                >
                    <img
                        src="/icons/mypage_icon.png"
                        alt="mypage"
                        className="h-10 w-10 mb-1"
                    />
                    마이페이지
                </Link>
            </div>
        </div>
    );
}
