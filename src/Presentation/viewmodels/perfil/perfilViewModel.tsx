import { useQuery } from "@apollo/client";
import { PERFILES_USERS } from "@/src/Data/repositories/perfiles/perfilrepositorio";

export function usePerfilViewModel(username: string) {
  const { data, loading, error, refetch } = useQuery(PERFILES_USERS, {
    variables: { username },
  });

  return { data: data?.obtener_usuario_por_username, loading, error, refetch };
}
