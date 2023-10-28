import { User } from "./models";

export interface ITask {

  id:          number | null;
  priority:    number | null;
  description: string | null;
  done:        boolean | null;
}

export interface IUser {
  id:       number | null;
  username: string | null;
  email:    string | null;
  password: string | null;
}

export interface LoginResponse {
  user: User;
  token: string;
}

