import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

interface CommentProps {
  id: string;
  writer: string;
  profile: string;
  createdDate: string;
  content: string;
  isAuthor?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function Comment({
  id,
  writer,
  profile,
  createdDate,
  content,
  isAuthor,
  onEdit,
  onDelete,
}: CommentProps) {
  return (
    <div className="flex items-start space-x-4 p-4 border-b border-gray-200">
      {/* 프로필 이미지 */}
      <Image
        src={profile}
        alt={`${writer}의 프로필 이미지`}
        width={40}
        height={40}
        className="rounded-full"
      />
      {/* 댓글 내용 */}
      <div className="flex-1">
        <div className="flex justify-between">
          <span className="font-bold text-gray-800">{writer}</span>
          <span className="text-sm text-gray-500">{createdDate}</span>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700 mt-2">{content}</p>
          {/* 내가 작성한 댓글일 경우 수정/삭제 버튼 */}
          <div>
            {isAuthor && (
              <div className="flex space-x-4 mt-2">
                <button
                >
                  <FaEdit className="text-gray-400 w-5 h-5" />
                </button>
                <button
                  className="text-red-500 hover:underline"
                >
                  <RiDeleteBinLine className="text-gray-400 w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
