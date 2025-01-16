"use client";

import Link from "next/link";
import { PATHS } from "@/constants/path";
import Image from "next/image";
import Logo from "@/assets/images/logo/loginPageLogo.png"
import GithubIcon from "@/assets/icons/git.png"
import { useMobile } from "@/hooks/useMobile";
import { useTranslation } from "react-i18next";

export default function StructureFooter() {
    const { isMobile, isMounting } = useMobile();
  
    if (isMounting) return null; // 초기 렌더링 상태에서는 아무것도 표시하지 않음
  
    return isMobile ? <MobileFooter /> : <DesktopFooter />;
  }

const DesktopFooter = () => {
  const { t, i18n } = useTranslation("structureFooter");

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage); // 언어를 동적으로 변경하는 메서드
  };

  return (
    <footer className="w-full bg-gray-100 text-strong_gray py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer 상단 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* 로고 및 플랫폼 소개 */}
          <div>
          <Image src={Logo} alt="로고" width={50} height={50} className="mb-2" />
          <p className="text-xs text-gray-500">
              {t("description1")}
              <br />
              {t("description2")}
          </p>
          </div>

          {/* 기능 섹션 */}
          <div>
          <h4 className="text-sm font-semibold mb-4">{t("features")}</h4>
          <ul>
              <li className="mb-2 text-sm">
              <Link href={PATHS.COMMUNITY} className="hover:text-orange-400">{t("community")}</Link>
              </li>
              <li className="mb-2 text-sm">
              <Link href={PATHS.MAP} className="hover:text-orange-400">{t("map")}</Link>
              </li>
              <li className="mb-2 text-sm">
              <Link href={PATHS.WALKMATE} className="hover:text-orange-400">{t("walkmate")}</Link>
              </li>
              <li className="mb-2 text-sm">
              <Link href={PATHS.MYPAGE} className="hover:text-orange-400">{t("mypage")}</Link>
              </li>
          </ul>
          </div>

          {/* 팀원 섹션 (새탭에서 열기, 보안강화)*/}
          <div>
            <h4 className="text-sm font-semibold mb-4">{t("contact")}</h4>
            <ul>
              <li className="mb-2">
              <a href="https://github.com/jjyy0804" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm hover:text-orange-400">
                  <Image src={GithubIcon} alt="깃허브 아이콘" width={15} height={15} className="mr-2" />
                  {t("jooyoung")}
              </a>
              </li>
              <li className="mb-2">
              <a href="https://github.com/ry-lie" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm hover:text-orange-400">
                  <Image src={GithubIcon} alt="깃허브 아이콘" width={15} height={15} className="mr-2" />
                  {t("seobin")}
              </a>
              </li>
              <li className="mb-2">
              <a href="https://github.com/member3" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm hover:text-orange-400">
                  <Image src={GithubIcon} alt="깃허브 아이콘" width={15} height={15} className="mr-2" />
                  {t("jeongwoo")}
              </a>
              </li>
              <li className="mb-2">
              <a href="https://github.com/SonSETO" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm hover:text-orange-400">
                  <Image src={GithubIcon} alt="깃허브 아이콘" width={15} height={15} className="mr-2" />
                  {t("seokgyeong")}
              </a>
              </li>
              <li className="mb-2">
              <a href="https://github.com/Paul-Han97" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm hover:text-orange-400">
                  <Image src={GithubIcon} alt="깃허브 아이콘" width={15} height={15} className="mr-2" />
                  {t("paul")}
              </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer 하단 */}
        <div className="mt-8 border-t border-stroke_gray pt-4 flex flex-col sm:flex-row justify-between items-center">
          {/* 언어 선택 */}
          <div className="mb-4 sm:mb-0">
          <label htmlFor="language-select" className="text-sm text-strong_gray">
            {t("language")}:
          </label>
          <select
              id="language-select"
              className="bg-gray-200 text-strong_gray text-sm ml-2 p-1 rounded-md focus:ring focus:ring-orange-400"
              onChange={handleLanguageChange} 
              defaultValue={i18n.language}
          >
              <option value="ko">한국어</option>
              <option value="en">English</option>
          </select>
          </div>

          {/* 저작권 */}
          <div className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Pawpaw. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

const MobileFooter = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage); // 언어를 동적으로 변경하는 메서드
  };

  return (
    <footer className="w-full bg-gray-100 text-strong_gray py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer 상단 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* 로고 및 플랫폼 소개 */}
          <div>
          <Image src={Logo} alt="로고" width={50} height={50} className="mb-2" />
          <p className="text-xs text-gray-500">
            {t("description1")}
            <br />
            {t("description2")}          
          </p>
          </div>

          {/* 기능 섹션 */}
          <div className="flex flex-row space-x-3">
            <h4 className="text-xs font-bold">{t("features")}</h4>
            <p className="text-xs font-bold">|</p>
            <ul className="flex flex-row space-x-4">
              <li className="mb-2 text-xs">
              <Link href={PATHS.COMMUNITY} className="hover:text-orange-400">{t("community")}</Link>
              </li>
              <li className="mb-2 text-xs">
              <Link href={PATHS.MAP} className="hover:text-orange-400">{t("map")}</Link>
              </li>
              <li className="mb-2 text-xs">
              <Link href={PATHS.WALKMATE} className="hover:text-orange-400">{t("walkmate")}</Link>
              </li>
              <li className="mb-2 text-xs">
              <Link href={PATHS.MYPAGE} className="hover:text-orange-400">{t("mypage")}</Link>
              </li>
            </ul>
          </div>

          {/* 팀원 섹션 (새탭에서 열기, 보안강화)*/}
          <div className="flex flex-row space-x-3">
            <h4 className="text-xs font-bold mb-1">{t("contact")}</h4>
            <p className="text-xs font-bold">|</p>
            <ul className="flex flex-row space-x-4">
              <li className="mb-2">
              <a href="https://github.com/jjyy0804" target="_blank" rel="noopener noreferrer" className="flex items-center text-xs hover:text-orange-400">
                {t("jooyoung")}
              </a>
              </li>
              <li className="mb-2">
              <a href="https://github.com/ry-lie" target="_blank" rel="noopener noreferrer" className="flex items-center text-xs hover:text-orange-400">
                {t("seobin")}
              </a>
              </li>
              <li className="mb-2">
              <a href="https://github.com/member3" target="_blank" rel="noopener noreferrer" className="flex items-center text-xs hover:text-orange-400">
                {t("jeongwoo")}
              </a>
              </li>
              <li className="mb-2">
              <a href="https://github.com/SonSETO" target="_blank" rel="noopener noreferrer" className="flex items-center text-xs hover:text-orange-400">
                {t("seokgyeong")}
              </a>
              </li>
              <li className="mb-2">
              <a href="https://github.com/Paul-Han97" target="_blank" rel="noopener noreferrer" className="flex items-center text-xs hover:text-orange-400">
                {t("paul")}
              </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer 하단 */}
        <div className="mt-3 border-t border-stroke_gray pt-3 flex flex-col sm:flex-row justify-between items-center">
          {/* 언어 선택 */}
          <div className="mb-2">
          <label htmlFor="language-select" className="text-xs text-strong_gray">
            {t("language")}:
          </label>
          <select
              id="language-select"
              className="bg-gray-200 text-strong_gray text-xs ml-2 p-1 rounded-md focus:ring focus:ring-orange-400"
              onChange={handleLanguageChange} 
              defaultValue={i18n.language}
          >
              <option value="ko">한국어</option>
              <option value="en">English</option>
          </select>
          </div>

          {/* 저작권 */}
          <div className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Pawpaw. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
