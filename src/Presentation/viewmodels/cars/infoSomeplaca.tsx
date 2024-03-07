import { useLazyQuery } from "@apollo/client";
import { INFO_SOME_PLACA } from "@/src/Data/repositories/cars/autorepositorio";

export function useSomeMantenimientoViewModel() {
  const [get2InfoForPlaca, { data, loading, error }] =
    useLazyQuery(INFO_SOME_PLACA);

  return {
    data: data?.obtener_info_for_placa,
    loading,
    error,
    get2InfoForPlaca,
  };
}
