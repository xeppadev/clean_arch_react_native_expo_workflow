import { useMutation } from "@apollo/client";
import { REGISTRAR_AUTO } from "@/src/Data/repositories/cars/autorepositorio";

export function useRegistrarAutoViewModel() {
  const [registrarAuto, { data, loading, error }] = useMutation(REGISTRAR_AUTO);

  return {
    registrarAuto,
    data: data?.crear_auto,
    loading,
    error,
  };
}