export interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  category: "recent" | "previous";
  icon?: string;
  roles?: string[];
  features?: string[];
  architecture?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  skillsEarned: string[];
  icon: string;
  description: string;
}

export interface ContactMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
