import { useQuery } from "@apollo/client";
import { ADMIN_HISTORY_CARS } from "@/src/Data/repositories/cars/autorepositorio";

type placa = string 


export function useMantenimientoViewModel(placa :placa) {
  const { data, loading, error, refetch } = useQuery(ADMIN_HISTORY_CARS, {
    variables: { placa },
  });

  return { data: data?.admin_history_cars, loading, error, refetch };
}