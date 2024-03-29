import { User } from "./types";

// This represents the entire object that we receive from firebase.
// Not all objects in the model is used, but felt better to handle them, then to ignore them.
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
