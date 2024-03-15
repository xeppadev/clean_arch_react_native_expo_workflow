import { useMutation } from "@apollo/client";
import { COMPLETAR_MANTENIMIENTO } from "@/src/Data/repositories/mantenimientos/mantenimientorepositorio";

export function useCompletarMantenimientoViewModel() {
  const [completarMantenimiento, { data, loading, error }] = useMutation(
    COMPLETAR_MANTENIMIENTO
  );

  return {
    completarMantenimiento,
    data: data?.completar_mantenimiento,
    loading,
    error,
  };
}
