export type Post = {
    id: number;
    category: string;
    title: string;
    content: string;
    isLikeClicked: boolean;
    imageList: { isPrimary: boolean; url: string }[];
  };