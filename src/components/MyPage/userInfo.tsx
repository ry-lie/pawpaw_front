"use client";

import { useMobile } from "@/hooks/useMobile";
import Link from "next/link";
import { PATHS } from "@/constants/path";
import Image from "next/image";
import BasicProfile from "@/assets/icons/profile_icon.png";
import { toggleWorkingMate } from "@/lib/api/user";
import { useUserStore } from "@/stores/userStore";
import { urlToFileWithAxios } from "@/utils/urlToFile";
import { logoutAPI } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { errorToast } from "@/utils/toast";

interface UserInfoProps {
  userInfo: {
    id?: number;
    nickname: string;
    canWalkingMate: boolean;
    imageUrl?: string; // 프로필 이미지 URL
  };
  isMyInfo?: boolean; // 다른 사용자 정보 요청일 경우
}

export default function UserInfo({ userInfo, isMyInfo = true }: UserInfoProps) {
  const { isMobile, isMounting } = useMobile();

  if (isMounting) return null; // 초기 렌더링 상태일 경우 아무것도 보여주지 않음

  return isMobile ? <MobileUserInfo userInfo={userInfo} isMyInfo={isMyInfo} /> : <DesktopUserInfo userInfo={userInfo} isMyInfo={isMyInfo} />;
};

// 워킹메이트 on/off 토글 버튼 클릭
const handleToggleWorkingMate = async (userId: number, imageUrl: string | undefined, workingMateState: boolean) => {

  let file: File | undefined;
  if (imageUrl) {
    try {
      file = await urlToFileWithAxios(imageUrl, "file.jpg");
    } catch {
      file = undefined;
    }
  } else {
    file = undefined;
  }

  await toggleWorkingMate(userId, file, workingMateState);
};

// 로그아웃
const handleLogout = async () => {
  const router = useRouter();
  if (confirm("로그아웃 하시겠습니까?")) {
    try {
      await logoutAPI();
      useUserStore.getState().logout();
      router.push(PATHS.MAIN);
    } catch (error) {
      errorToast("로그아웃에 실패했습니다.");
    }
  }
};

const DesktopUserInfo = ({ userInfo, isMyInfo }: UserInfoProps) => {
  const userId = useUserStore((state) => state.id);

  return (
    <section className="w-full max-w-mobile h-36 bg-white border border-stroke_gray rounded-lg p-4 flex gap-4 items-center mb-3">
      {/* 유저 프로필 이미지 */}
      <Image
        src={userInfo?.imageUrl || BasicProfile}
        alt="profile"
        className="bg-white rounded-full ml-3 mr-1"
        width={96} // 24rem = 96px
        height={96}
      />
      {/* 유저 정보 */}
      <div className="flex flex-col flex-grow justify-between">
        <div className="flex items-center justify-start">
          <h3 className="text-xl font-bold">{userInfo?.nickname || "닉네임이 없습니다"}</h3>
        </div>
        {isMyInfo && (
          <>
            <Link href={PATHS.MY_INFO_MODIFY}>
              <button className="text-sm text-blue-500 underline flex justify-start mb-1 hover:text-blue-900">내 정보 수정</button>
            </Link>
            <div className="flex justify-start items-center">
              <div className="flex gap-4">
                <Link href={PATHS.MY_POSTS}>
                  <span className="text-sm text-gray-600 hover:text-accent_orange">내가 쓴 글</span>
                </Link>
                <span className="text-sm text-gray-600 mt-0.5">|</span>
                <Link href={PATHS.MY_REVIEWS}>
                  <span className="text-sm text-gray-600 hover:text-accent_orange">내가 쓴 리뷰</span>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 버튼 */}
      <div className="flex flex-col justify-between h-full">
        {isMyInfo ? (
          <button
            className="text-xs bg-primary text-white px-3 py-0.5 rounded-lg font-semibold"
            style={{ width: "fit-content" }}
            onClick={() => {
              handleToggleWorkingMate(userId, userInfo?.imageUrl, !userInfo.canWalkingMate)
            }}
          >
            {userInfo?.canWalkingMate ? "산책메이트 가능" : "산책메이트 불가능"}
          </button>
        ) : (
          <span
            className="text-xs bg-primary text-white px-3 py-0.5 rounded-lg font-semibold"
            style={{ width: "fit-content" }}
          >
            {userInfo?.canWalkingMate ? "산책메이트 가능" : "산책메이트 불가능"}
          </span>
        )}

        {isMyInfo && (
          <button 
            onClick={handleLogout}
            className="text-sm text-red-500 underline ml-auto"
          >
            로그아웃
          </button>
        )}
      </div>
    </section >
  );
};

const MobileUserInfo = ({ userInfo, isMyInfo }: UserInfoProps) => {
  const userId = useUserStore((state) => state.id);
  return (
    <section className="w-full h-auto bg-white border border-stroke_gray rounded-lg px-3 pt-3 py-2 flex flex-col gap-2 items-start mb-3">
      <div className="flex">
        {/* 유저 프로필 이미지 */}
        <Image
          src={userInfo?.imageUrl || BasicProfile}
          alt="profile"
          className="bg-white rounded-full mr-4"
          width={64} // 16rem = 64px
          height={64} // 16rem = 64px
        />
        {/* 유저 정보 */}
        <div className="flex flex-col flex-grow justify-center">

          <div className="flex items-center justify-start">
            <h3 className="text-lg font-bold mr-2">{userInfo?.nickname || "닉네임이 없습니다"}</h3>
            {isMyInfo && (
              <Link href={PATHS.MY_INFO_MODIFY}>
                <button className="text-sm text-blue-500 underline flex justify-start hover:text-blue-900">내 정보 수정</button>
              </Link>)}
          </div>
          {isMyInfo ? (
            <button
              className="text-sm bg-primary text-white px-3 py-0.5 rounded-lg font-semibold"
              style={{ width: "fit-content" }}
              onClick={() => {
                handleToggleWorkingMate(userId, userInfo.imageUrl, !userInfo.canWalkingMate)
              }}
            >
              {userInfo?.canWalkingMate ? "산책메이트 가능" : "산책메이트 불가능"}
            </button>
          ) : (
            <span
              className="text-xs bg-primary text-white px-3 py-0.5 rounded-lg font-semibold"
              style={{ width: "fit-content" }}
            >
              {userInfo?.canWalkingMate ? "산책메이트 가능" : "산책메이트 불가능"}
            </span>
          )}

        </div>
      </div>


      {/* 가로선 추가 */}
      {isMyInfo && (<div className="w-full border-t border-stroke_gray"></div>)}

      {isMyInfo && (<div className="flex items-center justify-around w-full">
        <div className="flex gap-6">
          <Link href={PATHS.MY_POSTS}>
            <span className="text-sm text-gray-600 hover:text-accent_orange">내가 쓴 글</span>
          </Link>
          <span className="text-sm text-gray-600 mt-0.5">|</span>
          <Link href={PATHS.MY_REVIEWS}>
            <span className="text-sm text-gray-600 hover:text-accent_orange">내가 쓴 리뷰</span>
          </Link>
          <span className="text-sm text-gray-600 mt-0.5">|</span>
          <button className="text-sm text-red-500 underline ml-auto">
            로그아웃
          </button>
        </div>
      </div>)}
    </section>
  );
};
