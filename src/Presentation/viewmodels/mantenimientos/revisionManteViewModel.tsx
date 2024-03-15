import { useMutation } from "@apollo/client";
import { CAMBIAR_ESTADO_MANTENIMIENTO } from "@/src/Data/repositories/mantenimientos/mantenimientorepositorio";

export function useCambiarEstadoMantenimientoViewModel() {
  const [cambiarEstadoMantenimiento, { data, loading, error }] = useMutation(
    CAMBIAR_ESTADO_MANTENIMIENTO
  );

  return {
    cambiarEstadoMantenimiento,
    data,
    loading,
    error,
  };
}
