export type UserId = string

export interface User {
  id: UserId;
  name: string;
  email: string;
  avatar: string | null;
  level: number;
  likes: number;
}
