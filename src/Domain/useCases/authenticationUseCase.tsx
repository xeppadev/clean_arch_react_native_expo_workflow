// domain/usecases/authenticationUseCase.ts
import { MyToken } from "../entities/authentication";

export interface AuthenticationUseCase {
  authenticate(username: string, password: string): Promise<MyToken>;
}