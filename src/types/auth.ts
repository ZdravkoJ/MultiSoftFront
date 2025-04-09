import { Firm, LicenseType } from "./firm";

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUser = {
  id: number;
  fullName: string;
  email: string;
  username: string;
  pagePermissions: string[];
  userCompanies: Firm[];
  lastUsedCompanyid: number;
  userType: number;
  phoneNumber: string | null;
} | null;

//export type AuthUser = null | Record<string, any>;

export type AuthResponse = {
  accessToken: string;
  userDetails: AuthUser;
};

export type PagePermission = {
  userId: number;
  companyId: number;
};

export type RegisterResponse = {
  accessToken: string;
  companyId: number;
  userId: number;
};

export type SignInProps = {
  isSuperAdmin: boolean;
};

export type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
};
export type JWTContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  method: "jwt";
  signIn: (username: string, password: string) => Promise<any>;
  signInSA: (username: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    companyName: string,
    comapnyCode: string,
    companyType: number,
    userNameWithoutCompanyCode: string
  ) => Promise<void>;
  resetPassword: (email: string) => void;
};
