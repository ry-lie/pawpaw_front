import ReviewModifyClient from "./ReviewModifyClient";

export default async function ReviewModifyPage({ params }: { params: { id: string } }) {
  //const review = await axiosInstance.get(`/api/reviews/${params.id}`).then((res) => res.data);
  const initialData = {
    title: "기존 제목",
    description: "기존 내용",
    isRecommended: true,
  };

  return (
    <div className="mt-14 px-4">
      <h1 className="text-lg font-semibold">리뷰 수정하기</h1>
      <ReviewModifyClient initialData={initialData} reviewId={params.id} />
    </div>
  );
}
