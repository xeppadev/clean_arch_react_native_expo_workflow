import { format } from "date-fns";
import { sendToExternalApi } from "@/src/Data/api/sendfiles";
import { Platform } from "react-native";
import { useRegistrarAutoViewModel } from "./registrarplacasViewModel";

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
  // Define las mutaciones de Apollo Client para registrar un auto.
  registrarAuto = useRegistrarAutoViewModel();

  // define los tipos de contrato
  getContratos() {
    return [
      {
        label: "Pago Mantenimiento Parcial",
        value: "Pago Mantenimiento Parcial",
      },
      { label: "Pago Mantenimiento 2", value: "Pago Mantenimiento 2" },
      { label: "Pago Mantenimiento 3", value: "Pago Mantenimiento 3" },
    ];
  }

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
    // Platforms
    formData.append("files", {
      uri: values.files[0].uri,
      name:
        Platform.OS === "android"
          ? values.files[0].fileName
          : values.files[0].name,
      type: values.files[0].type,
    } as any);

    const dataFromMutation = result.data?.crear_auto;
    await sendToExternalApi(formData, {
      query1: "autos",
      query2: dataFromMutation,
    });
  }
}
