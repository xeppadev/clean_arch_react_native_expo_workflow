// data/repositories/authenticationRepository.ts
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AuthenticationUseCase } from "@/src/Domain/useCases/authenticationUseCase";
import * as SecureStore from "expo-secure-store";
import { MyToken } from "@/src/Domain/entities/authentication";
import "core-js/stable/atob";

export class AuthenticationRepository implements AuthenticationUseCase {
  async authenticate(username: string, password: string): Promise<MyToken> {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const response = await axios.post(`${apiUrl}/auth/login`, {
      username,
      password,
    });
    const decodedToken = jwtDecode<MyToken>(response.data.access_token);
    await SecureStore.setItemAsync("token", response.data.access_token);
    return decodedToken;
  }
}
