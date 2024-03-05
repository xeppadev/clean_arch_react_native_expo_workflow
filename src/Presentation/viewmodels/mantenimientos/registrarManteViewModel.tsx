import { useMutation } from "@apollo/client";
import { REGISTRAR_MANTENIMIENTO } from "@/src/Data/repositories/mantenimientos/mantenimientorepositorio";

export function useRegistrarMantenimientoViewModel() {
  const [registrarMantenimiento, { data, loading, error }] = useMutation(
    REGISTRAR_MANTENIMIENTO
  );

  return {
    registrarMantenimiento,
    data: data?.regisrar_mantenimiento_programado,
    loading,
    error,
  };
}
// 