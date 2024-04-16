import { format } from "date-fns";
import { sendToExternalApi } from "@/src/Data/api/sendfiles";
import { Platform } from "react-native";
import { useRegistrarAutoViewModel } from "./registrarplacasViewModel";
import { useSoloClientesViewModel } from "../clientes/soloclientesViewModel";
import { useRouter } from "expo-router";
// Define una interfaz para los valores del formulario
interface FormValues {
  tipocontrato: string;
  placa: string;
  km: string;
  vigenciaSoat: string | Date;
  cliente: string;
  fechaRevision: string | Date;
  propietario: string;
finalfecha: string | Date;
  estados: any[];
  average: string;
  files: any[]; // Reemplaza 'any' con el tipo correcto para tus archivos
}

export class RegistrarAutoViewModel {
  // Define el enrutador de la aplicación
  router = useRouter();
  // Define las mutaciones de Apollo Client para registrar un auto.
  registrarAuto = useRegistrarAutoViewModel();

  // define los tipos de contrato
  getContratos() {
    return [
      {
        label: "Alquiler a todo costo",
        value: "Alquiler a todo costo",
      },
      { label: "Alquiler con valorizaciones", value: "Alquiler con valorizaciones" },
    
    ];
  }

   // Trae los clientes para el select
   clientes = useSoloClientesViewModel();

  async onSubmit(values: FormValues) {
    const fechaSoat = format(
      values.vigenciaSoat,
      "yyyy-MM-dd'T'HH:mm:ss.SSS-05:00"
    );
    const fechaContrato = format(
      values.finalfecha,
      "yyyy-MM-dd'T'HH:mm:ss.SSS-05:00"
    );
    const fechaRevision = format(
      values.fechaRevision,
      "yyyy-MM-dd'T'HH:mm:ss.SSS-05:00"
    );
    const result = await this.registrarAuto.registrarAuto({
      variables: {
        createCarInput: {
          tipoContrato: values.tipocontrato,
          placa: values.placa,
          kmRegistroInicial: parseFloat(values.km),
          fechaSoat: fechaSoat,
          propietario: values.propietario,
          vigenciaContrato: fechaContrato,
          puntaje: parseFloat(values.average),
          cliente: values.cliente,
          fechaRevision: fechaRevision,
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
    const dataFromMutation = result.data?.crear_auto;
    await sendToExternalApi(formData, {
      query1: "cars",
      query2: dataFromMutation,
    });
    this.router.back();
  }
}
