import { useMutation } from "@apollo/client";
import { REGISTRAR_NO_MANTENIMIENTO } from "@/src/Data/repositories/mantenimientos/mantenimientorepositorio";

export function useRegistrarSinMantenimientoViewModel() {
  const [registrarMantenimiento, { data, loading, error }] = useMutation(
    REGISTRAR_NO_MANTENIMIENTO
  );

  return {
    registrarMantenimiento,
    data: data?.regisrar_mantenimiento_no_programado,
    loading,
    error,
  };
}
// 