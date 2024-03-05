import { useMutation } from "@apollo/client";
import { PROGRAMAR_MANTENIMIENTO } from "@/src/Data/repositories/mantenimientos/mantenimientorepositorio";
export function useProgramarMantenimientoViewModel() {
  const [programarMantenimiento, { data, loading, error }] = useMutation(
    PROGRAMAR_MANTENIMIENTO
  );

  return {
    programarMantenimiento,
    data: data?.programar_mantenimiento,
    loading,
    error,
  };
}
