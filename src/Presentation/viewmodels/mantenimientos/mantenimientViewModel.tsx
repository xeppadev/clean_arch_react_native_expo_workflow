import { useQuery } from "@apollo/client";
import { MANTEN_INFO_ID } from "@/src/Data/repositories/mantenimientos/mantenimientorepositorio";

type mantenimientoInfoPorIdId = string;

export function useMantenimientoInfoPorIdViewModel(
  mantenimientoInfoPorIdId: mantenimientoInfoPorIdId
) {
  const { data, loading, error, refetch } = useQuery(MANTEN_INFO_ID, {
    variables: { mantenimientoInfoPorIdId },
  });

  const repuestosFormulario = data?.Mantenimiento_Info_por_ID?.repuestos?.map(
    (repuesto) => {
      return {
        cantidad: repuesto.cantidad,
        id: repuesto.id,
        marca: repuesto.marca,
        precio: repuesto.precio,
        producto: repuesto.producto,
      };
    }
  );

  return {
    data: data?.Mantenimiento_Info_por_ID,
    repuestosFormulario,
    loading,
    error,
    refetch,
  };
}
