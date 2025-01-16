interface LocalizedContent {
  en: string;
  ru: string;
}

export interface BlogPostRaw {
  id: number;
  title: LocalizedContent;
  date: string;
  slug: string;
  excerpt: LocalizedContent;
  tags: string[];
}

export interface BlogPost extends Omit<BlogPostRaw, "title" | "excerpt"> {
  title: string;
  excerpt: string;
  content?: string;
}

export interface BlogMeta extends Omit<BlogPost, "content"> {}
