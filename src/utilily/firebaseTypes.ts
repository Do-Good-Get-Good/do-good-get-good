import { User } from "./types";

export type UserClames = {
  admin?: boolean;
  superadmin?: boolean;
  user?: boolean;

  aud?: string;
  auth_time?: number;
  email?: string;
  email_verified?: boolean;
  exp?: number;
  firebase?: { identities: { email: [string] }; sign_in_provider: string };
  iat?: number;
  iss?: string;
  sub?: string;
  user_id?: User["id"];
};
