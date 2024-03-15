import { useMantenimientoInfoPorIdViewModel } from "../mantenimientos/mantenimientViewModel";
import { useCompletarMantenimientoViewModel } from "./confirmarRegisViewModel";
import { Platform } from "react-native";
import { sendToExternalApi } from "@/src/Data/api/sendfiles";
import { useSoloRepuestoViewModel } from "../repuestos/filterRepuestosViewModel";
import { useRegistrarMantenimientoViewModel } from "./registrarManteViewModel";
// Define una interfaz para los valores del formulario
interface FormValues {
  _id: string;
  diagnosticoFinal: string;
  diagnosticoActualizado: string;
  kmPrevio: number | null | undefined;
  kmMedido: number | null | undefined;
  fechaInicio: string;
  fechaSoat: string;
  fecha: string;
  cliente: string | null | undefined;
  files: any[];
  repuestos: any[];
}

export class RegistrarConfirmarMantenimiento {
  // Define las mutaciones de Apollo Client para cambiar el estado de un mantenimiento.
  completarEstadoMantenimiento = useCompletarMantenimientoViewModel();
  //Registrar mantenimiento
  registrarMantenimiento = useRegistrarMantenimientoViewModel();
  // Trae los repuestos para el select
  repuestos = useSoloRepuestoViewModel();
  getMantenimientosforId(id: string) {
    return useMantenimientoInfoPorIdViewModel(id);
  }

  async onSubmit(values: FormValues) {
    let result;
    let dataFromMutation;

    if (values.diagnosticoFinal) {
      result = await this.completarEstadoMantenimiento.completarMantenimiento({
        variables: {
          completarMantenimientoId: values._id,
          diagnosticoFinal: values.diagnosticoFinal,
        },
      });
      dataFromMutation = result.data?.completar_mantenimiento;
    } else {
      result = await this.registrarMantenimiento.registrarMantenimiento({
        variables: {
          registrarMantInput: {
            _id: values._id,
            fechaInicio: values.fechaInicio,
            kmMedido: values?.kmMedido || 0,
            kmPrevio: values?.kmPrevio || 0,
            fecha: values.fecha,
            Cliente: values.cliente || "",
            diagnostico: values.diagnosticoActualizado,
            repuestos: values.repuestos,
            fechaSoat: values.fechaSoat,
          },
        },
      });
      dataFromMutation = result.data?.regisrar_mantenimiento_programado;
    }
    const formData = new FormData();
    values.files.map((file) => {
      formData.append("files", {
        uri: file.uri,
        name: file.name,
        type: Platform.OS === "android" ? file.mimeType : file.type,
      } as any);
    });
    await sendToExternalApi(formData, {
      query1: "mantenimientos",
      query2: dataFromMutation,
    });
  }
}
