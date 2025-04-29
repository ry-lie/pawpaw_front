import { Post } from "@/types/post";

export const mockCommunityPosts: Post[] = [
  {
    id: 1,
    category: "일상",
    title: "강아지 목욕 중이에요",
    content: "오늘은 강아지를 깨끗하게 목욕시켰어요. 너무 귀여웠어요!",
    isLikeClicked: true,
    imageList: [
      { url: "/assets/mocks/dog_bath.jpeg", isPrimary: true }
    ]
  },
  {
    id: 2,
    category: "펫자랑",
    title: "혼자서도 잘타요~",
    content: "우리 토끼가 장난감 위에 잘 올라가요. 신기하죠?",
    isLikeClicked: false,
    imageList: [
      { url: "/assets/mocks/rabbit_ride.jpeg", isPrimary: true }
    ]
  },
  {
    id: 3,
    category: "고민상담",
    title: "고양이 입양 고민중이에요",
    content: "처음 고양이를 키우게 될까 고민 중입니다. 조언 부탁드려요.",
    isLikeClicked: false,
    imageList: []
  },
  {
    id: 4,
    category: "펫자랑",
    title: "미소 콘테스트 1등",
    content: "웃는 얼굴이 너무 예쁜 강아지, 우리집 자랑이에요!",
    isLikeClicked: true,
    imageList: [
      { url: "/assets/mocks/dog_smile.jpeg", isPrimary: true }
    ]
  },
  {
    id: 5,
    category: "일상",
    title: "우리집 리트리버",
    content: "매일 산책을 기다리는 우리 리트리버, 천사 그 자체.",
    isLikeClicked: false,
    imageList: [
      { url: "/assets/mocks/retriever.jpeg", isPrimary: true }
    ]
  },
  {
    id: 6,
    category: "일상",
    title: "비 오는 날 산책",
    content: "비가 와도 산책은 빠질 수 없죠! 우비 입은 강아지 너무 귀여워요.",
    isLikeClicked: false,
    imageList: [
      { url: "/assets/mocks/dog_rain.jpeg", isPrimary: true }
    ]
  },
  {
    id: 7,
    category: "임시보호",
    title: "몇달동안 맡아줄 분 구해요",
    content: "사정이 생겨서 잠시 반려동물을 맡아주실 분을 찾습니다.",
    isLikeClicked: false,
    imageList: []
  },
  {
    id: 8,
    category: "고민상담",
    title: "강아지가 밥을 안 먹어요",
    content: "요즘 식욕이 떨어진 강아지, 병원도 다녀왔는데 걱정이에요.",
    isLikeClicked: true,
    imageList: [
      { url: "/assets/mocks/dog_feedstuff.jpeg", isPrimary: true }
    ]
  },
  {
    id: 9,
    category: "펫자랑",
    title: "우리 백구 넘 귀엽지 않나요?",
    content: "하얀 털이 눈부신 백구, 매일 사진만 찍게 돼요!",
    isLikeClicked: false,
    imageList: [
      { url: "/assets/mocks/dog_white.jpeg", isPrimary: true }
    ]
  },
  {
    id: 10,
    category: "일상",
    title: "똘아...인형이 불쌍해요...",
    content: "인형을 물고 흔드는 우리 똘이... 인형이 남아나질 않네요.",
    isLikeClicked: true,
    imageList: [
      { url: "/assets/mocks/dog_doll.jpeg", isPrimary: true }
    ]
  },
  {
    id: 11,
    category: "임시보호",
    title: "세젤예 고양이 임보",
    content: "진짜 예쁜 고양이를 임시로 보호하고 있어요. 관심 있는 분 계신가요?",
    isLikeClicked: true,
    imageList: [
      { url: "/assets/mocks/cat_rabbit.jpeg", isPrimary: true }
    ]
  },
  {
    id: 12,
    category: "일상",
    title: "강아지 산책 어디로 가시나요?",
    content: "다들 산책 어디로 다니시나요? 코스 추천해주세요!",
    isLikeClicked: false,
    imageList: []
  },
];

// 메인페이지 인기글 불러오기
export const getMockPopularPosts = (): Post[] => {
  return mockCommunityPosts.slice(0, 6); // 그냥 임시로 앞에서 6개 불러오기
};

// 메인페이지 최신글 불러오기
export const getMockLatestPosts = (): Post[] => {
  return mockCommunityPosts.slice(-6); // 뒤에서 6개
};

// 커뮤니티 게시글 불러오기
export const getMockBoardList = async (
  cursor: number | null,
  take: number,
  category: string
) => {
  let filtered = [...mockCommunityPosts];

  // 카테고리 필터링
  if (category) {
    filtered = filtered.filter((post) => {
      switch (category) {
        case "PROUD_PETS": return post.category === "펫자랑";
        case "CONSULTATION": return post.category === "고민상담";
        case "PROTECT": return post.category === "임시보호";
        case "LIFE": return post.category === "일상";
        default: return true;
      }
    });
  }

  // 커서기반 페이지네이션
  if (cursor !== null) {
    const index = filtered.findIndex((post) => post.id === cursor);
    if (index >= 0) {
      filtered = filtered.slice(index + 1);
    }
  }

  const paged = filtered.slice(0, take);

  return {
    data: {
      body: {
        data: {
          boardList: paged,
        },
      },
    },
  };
};