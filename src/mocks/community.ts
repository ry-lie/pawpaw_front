import { Post } from "@/types/post";

export const mockCommunityPosts: Post[] = [
  {
    id: 1,
    category: "일상",
    title: "Bath time for my dog",
    content: "I gave my dog a nice bath today. He looked so adorable afterward!",
    isLikeClicked: true,
    imageList: [
      { url: "/assets/mocks/dog_bath.jpeg", isPrimary: true }
    ]
  },
  {
    id: 2,
    category: "펫자랑",
    title: "She can ride it all by herself",
    content: "My rabbit can climb onto her toy all by herself. Isn't that amazing?",
    isLikeClicked: false,
    imageList: [
      { url: "/assets/mocks/rabbit_ride.jpeg", isPrimary: true }
    ]
  },
  {
    id: 3,
    category: "고민상담",
    title: "Thinking about adopting a cat",
    content: "I'm considering adopting a cat for the first time. I’d really appreciate any advice.",
    isLikeClicked: false,
    imageList: []
  },
  {
    id: 4,
    category: "펫자랑",
    title: "First place in the smile contest",
    content: "My dog has the cutest smile ever. I just had to show him off!",
    isLikeClicked: true,
    imageList: [
      { url: "/assets/mocks/dog_smile.jpeg", isPrimary: true }
    ]
  },
  {
    id: 5,
    category: "일상",
    title: "Our family retriever",
    content: "Our retriever waits for walks every single day. Such a sweet angel.",
    isLikeClicked: false,
    imageList: [
      { url: "/assets/mocks/retriever.jpeg", isPrimary: true }
    ]
  },
  {
    id: 6,
    category: "일상",
    title: "A walk on a rainy day",
    content: "Rain or not, we never skip walk time. My dog looks so cute in a raincoat.",
    isLikeClicked: false,
    imageList: [
      { url: "/assets/mocks/dog_rain.jpeg", isPrimary: true }
    ]
  },
  {
    id: 7,
    category: "임시보호",
    title: "Looking for a temporary foster home for a few months",
    content: "Due to personal circumstances, I’m looking for someone who can temporarily foster my pet.",
    isLikeClicked: false,
    imageList: []
  },
  {
    id: 8,
    category: "고민상담",
    title: "My dog won’t eat",
    content: "My dog has had very little appetite lately. We already visited the vet, but I’m still worried.",
    isLikeClicked: true,
    imageList: [
      { url: "/assets/mocks/dog_feedstuff.jpeg", isPrimary: true }
    ]
  },
  {
    id: 9,
    category: "펫자랑",
    title: "Isn't my white pup the cutest?",
    content: "Her bright white fur is so beautiful. I end up taking pictures of her every day.",
    isLikeClicked: false,
    imageList: [
      { url: "/assets/mocks/dog_white.jpeg", isPrimary: true }
    ]
  },
  {
    id: 10,
    category: "일상",
    title: "Ttol... please spare the stuffed toy...",
    content: "My dog keeps biting and shaking his stuffed toy around. It never survives for long.",
    isLikeClicked: true,
    imageList: [
      { url: "/assets/mocks/dog_doll.jpeg", isPrimary: true }
    ]
  },
  {
    id: 11,
    category: "임시보호",
    title: "Fostering the prettiest cat ever",
    content: "I’m currently fostering a truly beautiful cat. Let me know if you're interested.",
    isLikeClicked: true,
    imageList: [
      { url: "/assets/mocks/cat_rabbit.jpeg", isPrimary: true }
    ]
  },
  {
    id: 12,
    category: "일상",
    title: "Where do you usually walk your dog?",
    content: "Where do you usually take your dog for walks? I’d love some route recommendations.",
    isLikeClicked: false,
    imageList: []
  },
];

// get popular posts in main page
export const getMockPopularPosts = (): Post[] => {
  return mockCommunityPosts.slice(0, 6); // 그냥 임시로 앞에서 6개 불러오기
};

// get recent posts in main page
export const getMockLatestPosts = (): Post[] => {
  return mockCommunityPosts.slice(-6); // 뒤에서 6개
};

// get board list in community page
export const getMockBoardList = async (
  cursor: number | null,
  take: number,
  category: string
) => {
  let filtered = [...mockCommunityPosts];

  // category filtering
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

  // cursor based pagination
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