import { useMutation } from "@apollo/client";
import { PERFILES_MUTATION } from "@/src/Data/repositories/perfiles/perfilrepositorio";


export function ActualizarPerfilViewModel() {
  const [actualizarPerfil, { data, loading, error }] = useMutation(
    PERFILES_MUTATION
  );

  return {
    actualizarPerfil,
    data: data?.actualizar_datos_usuario,
    loading,
    error,
  };
}