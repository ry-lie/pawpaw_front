import CommunityWritePage from "@/app/community/write/page";

export default function EditPostPage({ params }: { params: { id: string } }) {
  const postId = Number(params.id); // URL에서 postId 추출

  return <CommunityWritePage mode="edit" postId={postId} />;
}