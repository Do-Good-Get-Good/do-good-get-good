import { User } from "./types";

// I wrote this type by looking at what data we are receiving. We should look over it and maybe change what we want to receive
export type UserClaims = {
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
