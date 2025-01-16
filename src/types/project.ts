interface ProjectAction {
  type: 'link' | 'modal';
  icon: string;
  translationKey: string;
  url?: string;
  content?: {
    title: string;
    sections: {
      type: string;
      title: string;
      commands: string[];
      note?: string;
    }[];
  };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  category: string;
  stars?: number;
  actions: ProjectAction[];
}

export interface ProjectWithMeta extends Project {
  isLoading: boolean;
} 