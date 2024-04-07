// MantenimientosdataViewModel.ts
import { useLazyQuery } from "@apollo/client";
import { MANTENIMIENTOS_POR_PLACA } from "@/src/Data/repositories/mantenimientos/mantenimientorepositorio";
import { format, parseISO } from "date-fns";

export function useMantenimientosPorPlacaViewModel() {
  const [get1InfoForPlaca, { data, loading, error }] = useLazyQuery(
    MANTENIMIENTOS_POR_PLACA,
    
  );

  let programacion: { label: string; value: string; id: string }[] = [];

  if (data?.Mantenimiento_Info_por_Placa) {
    data.Mantenimiento_Info_por_Placa.forEach((item) => {
      if (item.estado === "programado") {
        const fechaFormateada = format(parseISO(item.fecha), "dd/MM/yyyy");

        programacion.push({
          label: `${item.tipo} ${fechaFormateada} ${item.tecnico}`,
          value: `${item.tipo} ${fechaFormateada} ${item.tecnico}`,
          id: item._id,
        });
      }
    });

    // Agrega una opción adicional a la matriz programacion
    programacion.push({
      label: "Nuevo Mantenimiento",
      value: "Nuevo Mantenimiento",
      id: "extra",
    });
  }

  return {
    programacion,
    loading,
    error,
    get1InfoForPlaca,
  };
}
