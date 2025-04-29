import { Post } from "@/types/boards";

export const mockCommunityPosts: Post[] = [
  {
    id: 1,
    category: "일상",
    nickname: "멍멍이사랑",
    author: {
      id: 1,
      nickname: "멍멍이사랑",
      imageUrl: null,
    },
    title: "강아지 목욕 중이에요",
    content: "오늘은 강아지를 깨끗하게 목욕시켰어요. 너무 귀여웠어요!",
    likeCount: 3,
    isLikeClicked: true,
    createdAt: "2025-04-25T10:00:00Z",
    imageList: [
      { url: "/assets/mocks/dog_bath.jpeg", isPrimary: true }
    ],
    commentList: [
      {
        id: 101,
        createdAt: "2025-04-25T11:00:00Z",
        content: "정말 귀여운 강아지네요!",
        author: {
          id: 2,
          nickname: "댓글러1",
          imageUrl: null,
        },
      },
      {
        id: 102,
        createdAt: "2025-04-25T12:00:00Z",
        content: "목욕할 때 너무 귀여워요ㅠㅠ",
        author: {
          id: 3,
          nickname: "댓글러2",
          imageUrl: "/assets/mocks/cat_bath.jpeg",
        },
      },
    ],
  },
  {
    id: 2,
    category: "펫자랑",
    nickname: "토끼매니아",
    author: {
      id: 2,
      nickname: "토끼매니아",
      imageUrl: null,
    },
    title: "혼자서도 잘타요~",
    content: "우리 토끼가 장난감 위에 잘 올라가요. 신기하죠?",
    likeCount: 7,
    isLikeClicked: false,
    createdAt: "2025-04-26T13:00:00Z",
    imageList: [
      { url: "/assets/mocks/rabbit_ride.jpeg", isPrimary: true }
    ],
    commentList: [],
  },
  {
    id: 3,
    category: "고민상담",
    nickname: "고민많은집사",
    author: {
      id: 3,
      nickname: "고민많은집사",
      imageUrl: null,
    },
    title: "고양이 입양 고민중이에요",
    content: "처음 고양이를 키우게 될까 고민 중입니다. 조언 부탁드려요.",
    likeCount: 1,
    isLikeClicked: false,
    createdAt: "2025-04-24T08:00:00Z",
    imageList: [],
    commentList: [],
  },
  {
    id: 4,
    category: "펫자랑",
    nickname: "강아지아빠",
    author: {
      id: 4,
      nickname: "강아지아빠",
      imageUrl: null,
    },
    title: "미소 콘테스트 1등",
    content: "웃는 얼굴이 너무 예쁜 강아지, 우리집 자랑이에요!",
    likeCount: 9,
    isLikeClicked: true,
    createdAt: "2025-04-20T18:30:00Z",
    imageList: [
      { url: "/assets/mocks/dog_smile.jpeg", isPrimary: true }
    ],
    commentList: [],
  },
  {
    id: 5,
    category: "일상",
    nickname: "산책러",
    author: {
      id: 5,
      nickname: "산책러",
      imageUrl: null,
    },
    title: "우리집 리트리버",
    content: "매일 산책을 기다리는 우리 리트리버, 천사 그 자체.",
    likeCount: 2,
    isLikeClicked: false,
    createdAt: "2025-04-18T11:00:00Z",
    imageList: [
      { url: "/assets/mocks/retriever.jpeg", isPrimary: true }
    ],
    commentList: [],
  },
  {
    id: 6,
    category: "일상",
    nickname: "우비사랑",
    author: {
      id: 6,
      nickname: "우비사랑",
      imageUrl: null,
    },
    title: "비 오는 날 산책",
    content: "비가 와도 산책은 빠질 수 없죠! 우비 입은 강아지 너무 귀여워요.",
    likeCount: 5,
    isLikeClicked: false,
    createdAt: "2025-04-17T09:15:00Z",
    imageList: [
      { url: "/assets/mocks/dog_rain.jpeg", isPrimary: true }
    ],
    commentList: [],
  },
  {
    id: 7,
    category: "임시보호",
    nickname: "따뜻한집",
    author: {
      id: 7,
      nickname: "따뜻한집",
      imageUrl: null,
    },
    title: "몇달동안 맡아줄 분 구해요",
    content: "사정이 생겨서 잠시 반려동물을 맡아주실 분을 찾습니다.",
    likeCount: 0,
    isLikeClicked: false,
    createdAt: "2025-04-16T13:00:00Z",
    imageList: [],
    commentList: [],
  },
  {
    id: 8,
    category: "고민상담",
    nickname: "강쥐맘",
    author: {
      id: 8,
      nickname: "강쥐맘",
      imageUrl: null,
    },
    title: "강아지가 밥을 안 먹어요",
    content: "요즘 식욕이 떨어진 강아지, 병원도 다녀왔는데 걱정이에요.",
    likeCount: 4,
    isLikeClicked: true,
    createdAt: "2025-04-15T10:20:00Z",
    imageList: [
      { url: "/assets/mocks/dog_feedstuff.jpeg", isPrimary: true }
    ],
    commentList: [],
  },
  {
    id: 9,
    category: "펫자랑",
    nickname: "하얀친구",
    author: {
      id: 9,
      nickname: "하얀친구",
      imageUrl: null,
    },
    title: "우리 백구 넘 귀엽지 않나요?",
    content: "하얀 털이 눈부신 백구, 매일 사진만 찍게 돼요!",
    likeCount: 6,
    isLikeClicked: false,
    createdAt: "2025-04-13T16:45:00Z",
    imageList: [
      { url: "/assets/mocks/dog_white.jpeg", isPrimary: true }
    ],
    commentList: [],
  },
  {
    id: 10,
    category: "일상",
    nickname: "장난감파괴자",
    author: {
      id: 10,
      nickname: "장난감파괴자",
      imageUrl: null,
    },
    title: "똘아...인형이 불쌍해요...",
    content: "인형을 물고 흔드는 우리 똘이... 인형이 남아나질 않네요.",
    likeCount: 2,
    isLikeClicked: true,
    createdAt: "2025-04-12T12:00:00Z",
    imageList: [
      { url: "/assets/mocks/dog_doll.jpeg", isPrimary: true }
    ],
    commentList: [],
  },
  {
    id: 11,
    category: "임시보호",
    nickname: "고양이보호자",
    author: {
      id: 11,
      nickname: "고양이보호자",
      imageUrl: null,
    },
    title: "세젤예 고양이 임보",
    content: "진짜 예쁜 고양이를 임시로 보호하고 있어요. 관심 있는 분 계신가요?",
    likeCount: 12,
    isLikeClicked: true,
    createdAt: "2025-04-10T15:00:00Z",
    imageList: [
      { url: "/assets/mocks/cat_rabbit.jpeg", isPrimary: true }
    ],
    commentList: []
  },
  {
    id: 12,
    category: "일상",
    nickname: "산책매니아",
    author: {
      id: 12,
      nickname: "산책매니아",
      imageUrl: null,
    },
    title: "강아지 산책 어디로 가시나요?",
    content: "다들 산책 어디로 다니시나요? 코스 추천해주세요!",
    likeCount: 8,
    isLikeClicked: false,
    createdAt: "2025-04-09T10:00:00Z",
    imageList: [],
    commentList: [
      {
        id: 301,
        createdAt: "2025-04-09T11:00:00Z",
        content: "저는 한강공원 자주 가요~",
        author: {
          id: 31,
          nickname: "산책러",
          imageUrl: null,
        }
      },
      {
        id: 302,
        createdAt: "2025-04-09T11:30:00Z",
        content: "석촌 호수 도는 것도 추천해요!!",
        author: {
          id: 32,
          nickname: "송파산책러",
          imageUrl: null,
        }
      }
    ]
  },
];

// 게시글 상세조회
export const getMockBoardDetail = async (postId: number) => {
  const found = mockCommunityPosts.find((post) => post.id === postId);
  if (!found) {
    throw new Error("게시글을 찾을 수 없습니다.");
  }
  return {
    data: {
      body: {
        data: found,
      },
    },
  };
};