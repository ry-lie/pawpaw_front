import { Post } from "@/types/boards";

export const mockCommunityPosts: Post[] = [
  {
    id: 1,
    category: "일상",
    nickname: "DogLover",
    author: {
      id: 1,
      nickname: "DogLover",
      imageUrl: null,
    },
    title: "Bath time for my dog",
    content: "I gave my dog a nice bath today. He looked so adorable afterward!",
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
        content: "Your dog is so adorable!",
        author: {
          id: 2,
          nickname: "PetFan1",
          imageUrl: null,
        },
      },
      {
        id: 102,
        createdAt: "2025-04-25T12:00:00Z",
        content: "Bath time pics are always the cutest 😭",
        author: {
          id: 3,
          nickname: "PetFan2",
          imageUrl: "/assets/mocks/cat_bath.jpeg",
        },
      },
    ],
  },
  {
    id: 2,
    category: "펫자랑",
    nickname: "RabbitFan",
    author: {
      id: 2,
      nickname: "RabbitFan",
      imageUrl: null,
    },
    title: "She can ride it all by herself",
    content: "My rabbit can climb onto her toy all by herself. Isn't that amazing?",
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
    nickname: "CuriousCatParent",
    author: {
      id: 3,
      nickname: "CuriousCatParent",
      imageUrl: null,
    },
    title: "Thinking about adopting a cat",
    content: "I'm considering adopting a cat for the first time. I’d really appreciate any advice.",
    likeCount: 1,
    isLikeClicked: false,
    createdAt: "2025-04-24T08:00:00Z",
    imageList: [],
    commentList: [],
  },
  {
    id: 4,
    category: "펫자랑",
    nickname: "DogDad",
    author: {
      id: 4,
      nickname: "DogDad",
      imageUrl: null,
    },
    title: "First place in the smile contest",
    content: "My dog has the cutest smile ever. I just had to show him off!",
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
    nickname: "WalkLover",
    author: {
      id: 5,
      nickname: "WalkLover",
      imageUrl: null,
    },
    title: "Our family retriever",
    content: "Our retriever waits for walks every single day. Such a sweet angel.",
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
    nickname: "RaincoatFan",
    author: {
      id: 6,
      nickname: "RaincoatFan",
      imageUrl: null,
    },
    title: "A walk on a rainy day",
    content: "Rain or not, we never skip walk time. My dog looks so cute in a raincoat.",
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
    nickname: "WarmHome",
    author: {
      id: 7,
      nickname: "WarmHome",
      imageUrl: null,
    },
    title: "Looking for a temporary foster home for a few months",
    content: "Due to personal circumstances, I’m looking for someone who can temporarily foster my pet.",
    likeCount: 0,
    isLikeClicked: false,
    createdAt: "2025-04-16T13:00:00Z",
    imageList: [],
    commentList: [],
  },
  {
    id: 8,
    category: "고민상담",
    nickname: "PuppyMom",
    author: {
      id: 8,
      nickname: "PuppyMom",
      imageUrl: null,
    },
    title: "My dog won’t eat",
    content: "My dog has had very little appetite lately. We already visited the vet, but I’m still worried.",
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
    nickname: "WhiteBuddy",
    author: {
      id: 9,
      nickname: "WhiteBuddy",
      imageUrl: null,
    },
    title: "Isn't my white pup the cutest?",
    content: "Her bright white fur is so beautiful. I end up taking pictures of her every day.",
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
    nickname: "ToyDestroyer",
    author: {
      id: 10,
      nickname: "ToyDestroyer",
      imageUrl: null,
    },
    title: "Ttol... please spare the stuffed toy...",
    content: "My dog keeps biting and shaking his stuffed toy around. It never survives for long.",
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
    nickname: "CatGuardian",
    author: {
      id: 11,
      nickname: "CatGuardian",
      imageUrl: null,
    },
    title: "Fostering the prettiest cat ever",
    content: "I’m currently fostering a truly beautiful cat. Let me know if you're interested.",
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
    nickname: "WalkEnthusiast",
    author: {
      id: 12,
      nickname: "WalkEnthusiast",
      imageUrl: null,
    },
    title: "Where do you usually walk your dog?",
    content: "Where do you usually take your dog for walks? I’d love some route recommendations.",
    likeCount: 8,
    isLikeClicked: false,
    createdAt: "2025-04-09T10:00:00Z",
    imageList: [],
    commentList: [
      {
        id: 301,
        createdAt: "2025-04-09T11:00:00Z",
        content: "I usually go to the riverside park with my dog!",
        author: {
          id: 31,
          nickname: "Walker",
          imageUrl: null,
        }
      },
      {
        id: 302,
        createdAt: "2025-04-09T11:30:00Z",
        content: "I recommend the lake trail too. It’s a great walk!",
        author: {
          id: 32,
          nickname: "TrailWalker",
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