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
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  pagePermissions: string[];
} | null;

//export type AuthUser = null | Record<string, any>;

export type AuthResponse = {
  accessToken: string;
  user: AuthUser;
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
