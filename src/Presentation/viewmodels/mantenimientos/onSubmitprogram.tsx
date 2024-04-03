// ViewModel.ts
import { format } from "date-fns";
import { useProgramarMantenimientoViewModel } from "./programarManteViewModel";
import { useSession } from "@/src/Presentation/hooks/useSession";
import { sendToExternalApi } from "@/src/Data/api/sendfiles";
import { Platform } from "react-native";
import { useSoloPlacasViewModel } from "../cars/soloplacasViewModel";
import { useRouter } from "expo-router";
import axios from "axios";
// Define una interfaz para los valores del formulario
interface FormValues {
  tipoMantenimiento: string;
  placa: string;
  fecha: string | Date;
  anotaciones: string;
  files: any[]; // Reemplaza 'any' con el tipo correcto para tus archivos
}

export class ProgramarMantenimientoViewModel {
  // Define el enrutador de la aplicación
  router = useRouter();

  // Define las mutaciones de Apollo Client para programar un mantenimiento.
  programarMantenimiento = useProgramarMantenimientoViewModel();

  //Trae los tipos de mantenimiento
  getMantenimientos() {
    return [
      { label: "Mantenimiento Preventivo", value: "Mantenimiento Preventivo" },
      { label: "Mantenimiento Correctivo", value: "Mantenimiento Correctivo" },
    ];
  }
  // Trae las placas para el select
  placas = useSoloPlacasViewModel();

  // Trae el nombre de la sesión
  session = useSession();

  async onSubmit(values: FormValues) {
    const fecha = format(values.fecha, "yyyy-MM-dd'T'HH:mm:ss.SSS-05:00");

    const result = await this.programarMantenimiento.programarMantenimiento({
      variables: {
        programarMantInput: {
          anotaciones: values.anotaciones,
          fecha: fecha,
          placa: values.placa,
          tipo: values.tipoMantenimiento,
          tecnico: this.session?.session?.toString() || "1",
        },
      },
    });

    const formData = new FormData();
    values.files.map((file) => {
      formData.append("files", {
        uri: file.uri,
        name: file.name,
        type: Platform.OS === "android" ? file.mimeType : file.type,
      } as any);
    });
   console.log(values.files);
   console.log(formData);
    
    const dataFromMutation = result.data?.programar_mantenimiento;
    try {
      await sendToExternalApi(formData, {
        query1: "mantenimientos",
        query2: dataFromMutation,
      });
    } catch (error) {
      console.error("Error sending data to external API:", error);
      // Si el error es una instancia de AxiosError, puedes obtener más detalles
      if (axios.isAxiosError(error)) {
        console.error("Axios request config:", error.config);
        console.error("Axios response:", error.response);
      }
    }
    this.router.back();

  }
}
