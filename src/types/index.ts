export interface ProjectLanguage {
  short: string;
  modal: string;
  description: string;
  features: string[];
}

export interface ProjectLiveLink {
  label: string;
  url: string;
}

export interface ProjectTestUsers {
  user?: string;
  password?: string;
  info?: string;
}

// Shape that mirrors each project entry in the bilingual JSON files.
// Fields that only exist after processing (e.g. `tags` derived from `techStack`,
// `demoUrl` derived from `liveLinks[0]`/`repoLink`, `category` injected by the
// section component) stay optional so the type can describe both the raw JSON
// entries and the view-model objects the UI consumes.
export interface Project {
  // Identity
  id: string;

  // Raw fields from the JSON
  title: string;
  visible?: boolean;
  languages: Record<string, ProjectLanguage>;
  image: string[];
  techStack?: string[];
  repoLink?: string | null;
  liveLinks?: ProjectLiveLink[];
  testUsers?: ProjectTestUsers | null;
  roles?: string[];

  // View-model fields (filled in by processBilingualData)
  description?: string;
  detailedDescription?: string;
  tags?: string[];
  demoUrl?: string;
  githubUrl?: string;
  category?: "recent" | "previous";
  icon?: string;
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
  image?: string;
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
