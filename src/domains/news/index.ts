export type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

export type News = {
  id: string;
  title: string;
  content: string;
  category: Category;
  published_at: string;
  thumbnail: Thumbnail;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};
