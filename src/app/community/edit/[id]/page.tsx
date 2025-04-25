import CommunityWrite from "../../write/CommunityWrite";

export default function EditPostPage({ params }: { params: { id: string } }) {
  const postId = Number(params.id); // URL에서 postId 추출

  return <CommunityWrite mode="edit" postId={postId} />;
}