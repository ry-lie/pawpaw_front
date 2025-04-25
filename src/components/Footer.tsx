import Link from "next/link";
import { PATHS } from "../constants/path";
import CommunityIcon from "@/assets/icons/community_icon.png"
import MapIcon from "@/assets/icons/map_icon.png"
import WalkingMateIcon from "@/assets/icons/footprint_color.png"
import MyPageIcon from "@/assets/icons/mypage_icon.png"
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Footer() {
    const { t, i18n } = useTranslation("structureFooter");

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
                        <span className="text-xs font-semibold">{t("community")}</span>
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
                        <span className="text-xs font-semibold">{t("map")}</span>
                    </Link>
                </div>
                <div className="flex flex-col items-center">
                    <Link
                        href={PATHS.WALKMATE}
                        className="flex flex-col justify-center items-center"
                    >
                        <Image
                            src={WalkingMateIcon}
                            alt="walkmate"
                            className="h-6 w-6 mb-1"
                        />
                        <span className="text-xs font-semibold">{t("walkmate")}</span>
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
                        <span className="text-xs font-semibold">{t("mypage")}</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
}