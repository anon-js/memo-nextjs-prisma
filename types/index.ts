export interface User {
  id: string;
  userid: string;
  username: string;
  email?: string | null;
}

export interface Memo {
  id: string;
  title: string;
  content: string;
  parentId: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  children?: Memo[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  error?: string;
  data?: T;
  memoId?: string;
}