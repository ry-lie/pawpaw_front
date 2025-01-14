export interface PlaceDetails {
  id: number; // 장소 ID
  name: string; // 장소 이름
  roadNameAddress: string; // 도로명 주소
  postalAddress: string; // 지번 주소
  postalCode: string; // 우편번호
  openingHour: string; // 운영 시간
  closingDays: string; // 휴무일
  hasParkingArea: boolean; // 주차 가능 여부
  contact: string; // 연락처
  price: string; // 가격 정보
  allowSize: string; // 허용 크기 (예: 반려동물 허용 크기)
  restrictions: string; // 제한 사항
  description: string; // 설명
  additionalFees: string; // 추가 요금
  reviewList: Review[]; // 리뷰 목록
}

export interface Review {
  id: number; // 리뷰 ID
  userId: number; // 작성자 ID
  nickname: string; // 작성자 닉네임
  imageUrl: string; // 작성자 프로필 이미지 URL
  title: string; // 리뷰 제목
  content: string; // 리뷰 내용
  isLikeClicked: boolean; // 좋아요 여부
}
