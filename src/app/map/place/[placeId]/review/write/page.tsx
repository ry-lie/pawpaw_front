import ReviewCreateClient from "./ReviewCreateClient";

export default function ReviewWritePage({ params }: { params: { placeId: number } }) {
  const { placeId } = params;
  return (
    <div className="mt-14 px-4 xs:px-8">
      <h1 className="text-lg xs:text-xl font-bold">리뷰 남기기</h1>
      <ReviewCreateClient
        placeId={placeId} />
    </div>
  );
}
