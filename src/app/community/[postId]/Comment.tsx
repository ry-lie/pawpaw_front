import { useState } from "react";
import { useUserStore } from "@/stores/userStore";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Button from "@/components/Button";
import Link from "next/link";
import { PATHS } from "@/constants/path";

interface CommentProps {
  id: number;
  writer: string;
  profile: string;
  createdDate: string;
  content: string;
  onEdit?: (id: number, updatedContent: string) => void;
  onDelete?: (id: number) => void;
}

export default function Comment({
  id,
  writer,
  profile,
  createdDate,
  content,
  onEdit,
  onDelete,
}: CommentProps) {
  const nickname = useUserStore((state) => state.nickname);

  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  const [editedContent, setEditedContent] = useState(content); // 수정된 내용

  /*수정된 댓글 저장*/
  const handleSave = () => {
    if (onEdit && editedContent.trim()) {
      onEdit(id, editedContent);
      setIsEditing(false);
    }
  };
  /*댓글 수정 취소*/
  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center space-x-4 p-4 border-b border-gray-200">
      {/* 프로필 이미지 */}
      <div className="w-[45px] h-[45px] rounded-full overflow-hidden border border-medium_gray">
        <Link href={PATHS.USER_INFO(id)}>
          <Image
            src={profile}
            alt="프로필 이미지"
            width={45}
            height={45}
            objectFit="cover"
          />
        </Link>
      </div>
      {/* 댓글 내용 */}
      <div className="flex-1">
        <div className="flex justify-between">
          <Link href={PATHS.USER_INFO(id)}>
            <span className="text-sm xs:text-base font-bold text-gray-800 break-words w-full max-w-[calc(100%-60px)]">
              {writer}
            </span>
          </Link>
          <span className="text-xs xs:text-sm text-gray-500 whitespace-nowrap">
            {createdDate}
          </span>
        </div>

        {isEditing ? (
          <div>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mt-2 resize-none"
            />
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                containerStyles="!text-base px-2 xs:px-2 xs:py-1"
              >
                저장
              </Button>
              <Button
                onClick={handleCancel}
                containerStyles="!text-base px-2 xs:px-2 xs:py-1 bg-alarm_orange !text-primary hover:bg-[#FFD292]"
              >
                취소
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between">
            <p className="text-sm xs:text-base font-medium text-gray-700 mt-0.5 break-words">
              {content}
            </p>
            {/* 내가 작성한 댓글일 경우 수정/삭제 버튼 */}
            {writer === nickname && (
              <div className="flex space-x-4 mt-2">
                <button onClick={() => setIsEditing(true)}>
                  <FaEdit className="text-gray-400 w-5 h-5" />
                </button>
                <button onClick={() => onDelete && onDelete(id)}>
                  <RiDeleteBinLine className="text-gray-400 w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
