import { useEnviarEmergenciaViewModel } from "./enviarEmergenciaModel";
import { useRouter } from "expo-router";

// Define una interfaz para los valores del formulario
interface FormValues {
  textoEmergencia: string;
}

export class EnviarEmergenciaViewModel {
  // Define el enrutador de la aplicación
  router = useRouter();

  // Define las mutaciones de Apollo Client para programar un mantenimiento.
  enviarEmergencia = useEnviarEmergenciaViewModel();

  async onSubmit(values: FormValues) {
    const result = await this.enviarEmergencia.enviarEmergencia({
      variables: {
        emergencia: values.textoEmergencia,
      },
    });

    if (result.data?.emergencia_notificacion) {
      this.router.back();
    }
  }
}
