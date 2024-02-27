export interface MyToken {
    username: string;
    nivelUser: "admin" | "tecnico";
    exp: number; // Añade este campo a tu interfaz
  }

  export interface AuthContextProps {
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
    dataEnd?: number | null;  
    session?: string | null | Number;
    userType?: "admin" | "tecnico" | null;
    isLoading: boolean;
  }