"use client";

import { RiDeleteBinLine } from "react-icons/ri";
import { useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "@/lib/api/place";
import { useRouter } from "next/navigation";
import { deleteComment, deletePost } from "@/lib/api/board";

interface DeleteButtonProps {
  id: string;
  postId?: string;
  placeId?: string;
  resourceType: "reviews" | "posts" | "comments";
  invalidateKeys?: string[][];
  onSuccessRedirect?: string;
}

export default function DeleteButton({ id, postId, placeId, resourceType, invalidateKeys = [], onSuccessRedirect }: DeleteButtonProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleDelete = async () => {
    const resourceLabel =
      resourceType === "reviews" ? "리뷰" : resourceType === "comments" ? "댓글" : "게시글";

    if (!confirm(`${resourceLabel}을 삭제하시겠습니까?`)) {
      return;
    }
    try {
      switch (resourceType) {
        case "reviews":
          if (!placeId) {
            throw new Error("리뷰 삭제에 필요한 placeId가 없습니다.");
          }
          await deleteReview(placeId, id);
          break;
        case "comments":
          if (postId) await deleteComment(postId, id);
          break;
        case "posts":
          await deletePost(id);
          break;
        default:
          throw new Error("잘못된 리소스 타입");
      }

      invalidateKeys.forEach((key) => queryClient.invalidateQueries({ queryKey: key }));
      alert(`${resourceType} 삭제 완료`);

      if (onSuccessRedirect) router.push(onSuccessRedirect);
    } catch (error) {
      console.error(`${resourceType} 삭제 실패`, error);
      alert("삭제 실패");
    }
  };

  return (
    <button onClick={handleDelete} aria-label="삭제">
      <RiDeleteBinLine className="text-gray-400 w-5 h-5" />
    </button>
  );
}
