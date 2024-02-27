// data/repositories/authenticationRepository.ts
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { AuthenticationUseCase } from '@/src/Domain/useCases/authenticationUseCase';
import { MyToken } from '@/src/Domain/entities/authentication';
import "core-js/stable/atob";

export class AuthenticationRepository implements AuthenticationUseCase {
  async authenticate(username: string, password: string): Promise<MyToken> {
    const response = await axios.post(
      "http://192.168.18.204:3000/auth/login",
      {
        username,
        password,
      }
    );
    const decodedToken = jwtDecode<MyToken>(response.data.access_token);
    return decodedToken;
  }
}