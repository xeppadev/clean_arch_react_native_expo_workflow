import React from "react";
import { useStorageState } from "../context/useStorageState";
import axios from "axios"; // Asegúrate de instalar axios con npm install axios
import { jwtDecode } from "jwt-decode";

import { Alert } from "react-native";

interface MyToken {
  username: string;
  nivel: "admin" | "tecnico";
  exp: number; // Añade este campo a tu interfaz
}

const AuthContext = React.createContext<{
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  dataEnd?: number | null;  
  session?: string | null | Number;
  userType?: "admin" | "tecnico" | null;
  isLoading: boolean;
}>({
  signIn: async () => Promise.resolve(),
  signOut: () => null,
  session: null,
  userType: null,
  isLoading: false,
});

export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [[isLoadingUserType, userType], setUserType] =
    useStorageState("userType");
    const [[isLoadingDateEnd, dateEnd], setDateEnd] = useStorageState("dateend");

  return (
    <AuthContext.Provider
      value={{
        signIn: async (username, password) => {
          try {
            const response = await axios.post(
              "http://192.168.18.204:3000/auth/login",
              {
                username,
                password,
              }
            );
            console.log(response.data);
            const decodedToken = jwtDecode<MyToken>(response.data.access_token);
            const user = decodedToken.username;
            const nivel = decodedToken.nivel;
            const exp = decodedToken.exp;
            const expDate = new Date(exp * 1000); 
            console.log(expDate);
            // Comprueba si el token ha expirado
            const currentTimestamp = Math.floor(Date.now() / 1000);
            const currentDate = new Date();
            console.log(currentDate);
            if (exp < currentTimestamp) {
              Alert.alert("El token ha expirado");
              
              return;
            }
           
            setSession(user);
            setUserType(nivel);
            setDateEnd(exp);
          } catch (error) {
            console.error(error);
            Alert.alert("Error", "Usuario o contraseña incorrectos ");
          }
        },
        signOut: () => {
          setSession(null);
          setUserType(null);
          setDateEnd(null);
        },
         
        dataEnd : dateEnd as number | null,
        session,
        userType: userType as "admin" | "tecnico" | null,
        isLoading: isLoading || isLoadingUserType || isLoadingDateEnd,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
