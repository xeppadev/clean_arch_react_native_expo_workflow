import { useMutation } from "@apollo/client";
import { EMERGENCIA_MUTATION } from "@/src/Data/repositories/emergencia/mutationemergencia";

export function useEnviarEmergenciaViewModel() {
  const [enviarEmergencia, { data, loading, error }] =
    useMutation(EMERGENCIA_MUTATION);

  return {
    enviarEmergencia,
    data: data?.emergencia_notificacion,
    loading,
    error,
  };
}
