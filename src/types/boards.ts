export interface Author {
  id: number;
  nickname: string;
  imageUrl: string | null;
}
export interface Image {
  isPrimary: boolean;
  url: string;
}
export interface Comment {
  id: number;
  createdAt: string;
  author: Author;
  content: string;
}
export interface Post {
  id: number; // 목데이터 위해 추가
  category: string; // 목데이터 위해 추가
  author: Author;
  imageList: Image[];
  commentList: Comment[];
  nickname: string;
  title: string;
  content: string;
  likeCount: number;
  isLikeClicked: boolean;
  createdAt: string;
}
