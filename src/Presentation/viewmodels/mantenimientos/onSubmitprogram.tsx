// ViewModel.ts
import { format } from "date-fns";
import { useProgramarMantenimientoViewModel } from "./programarManteViewModel";
import { useSession } from "@/src/Presentation/hooks/useSession";
import { sendToExternalApi } from "@/src/Data/api/sendfiles";
import { Platform } from "react-native";
import { useSoloPlacasViewModel } from "../cars/soloplacasViewModel";
// Define una interfaz para los valores del formulario
interface FormValues {
  tipoMantenimiento: string;
  placa: string;
  fecha: string | Date;
  anotaciones: string;
  files: any[]; // Reemplaza 'any' con el tipo correcto para tus archivos
}

export class ProgramarMantenimientoViewModel {
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
    // Platforms
    formData.append("files", {
      uri: values.files[0].uri,
      name:
        Platform.OS === "android"
          ? values.files[0].fileName
          : values.files[0].name,
      type: values.files[0].type,
    } as any);

    const dataFromMutation = result.data?.programar_mantenimiento;
    await sendToExternalApi(formData, {
      query1: "mantenimientos",
      query2: dataFromMutation,
    });
  }
}
