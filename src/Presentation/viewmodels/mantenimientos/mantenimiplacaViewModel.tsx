// MantenimientosdataViewModel.ts
import { useQuery } from "@apollo/client";
import { MANTENIMIENTOS_POR_PLACA } from "@/src/Data/repositories/mantenimientos/mantenimientorepositorio";
import { format, parseISO } from "date-fns";

export function useMantenimientosPorPlacaViewModel(placa: string) {
  const { data, loading, error, refetch } = useQuery(MANTENIMIENTOS_POR_PLACA, {
    variables: { placa },
  });

  let programacion: { label: string; value: string }[] = [];
  let anotaciones: string | null | undefined;
  let fechaSoat: string | null | undefined;
  let kmPrevio: number | null | undefined;

  if (data?.Mantenimiento_Info_por_Placa) {
    data.Mantenimiento_Info_por_Placa.forEach((item) => {
      if (item.estado === "programado") {
        const fechaFormateada = format(parseISO(item.fecha), "dd/MM/yyyy");

        programacion.push({
          label: `${item.tipo} ${fechaFormateada} ${item.tecnico}`,
          value: `${item.tipo} ${fechaFormateada} ${item.tecnico}`,
        });

        anotaciones = item.anotaciones;
        fechaSoat = format(parseISO(item.fechaSoat), "dd/MM/yyyy");
        kmPrevio = item.kmPrevio;
      }
    });
  }

  return {
    programacion,
    anotaciones,
    fechaSoat,
    kmPrevio,
    loading,
    error,
    refetch,
  };
}
