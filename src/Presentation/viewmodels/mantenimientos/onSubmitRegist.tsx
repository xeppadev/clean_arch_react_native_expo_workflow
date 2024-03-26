// ViewModel.ts
import { format, parse } from "date-fns";
import { useRegistrarMantenimientoViewModel } from "./registrarManteViewModel";
import { sendToExternalApi } from "@/src/Data/api/sendfiles";
import { Platform } from "react-native";
import { useSoloPlacasViewModel } from "../cars/soloplacasViewModel";
import { useSoloRepuestoViewModel } from "../repuestos/filterRepuestosViewModel";
import { useMantenimientosPorPlacaViewModel } from "./mantenimiplacaViewModel";
import { useSomeMantenimientoViewModel } from "../cars/infoSomeplaca";
import { useRegistrarSinMantenimientoViewModel } from "./regisinprogramarViewModel";
import { useSession } from "@/src/Presentation/hooks/useSession";
// Define una interfaz para los valores del formulario
interface FormValues {
  _id: string;
  fechaInicio: string;
  kmMedido: string;
  kmPrevio: string;
  fecha: string 
  Cliente: string;
  diagnostico: string;
  repuestos: any[];
  files: any[];
  fechaSoat: string;
  programacion: string;
  tipoMantenimiento: string;
  placa: string;
}

export class RegistrarMantenimientoViewModel {
  // Define las mutaciones de Apollo Client para programar un mantenimiento.
  registrarMantenimiento = useRegistrarMantenimientoViewModel();
  registrarSinMantenimiento = useRegistrarSinMantenimientoViewModel();

  // Trae las placas para el select
  placas = useSoloPlacasViewModel();
  // Trae los repuestos para el select
  repuestos = useSoloRepuestoViewModel();
  // Define una función que toma la placa seleccionada como argumento
  mantenimientosProgramados = useMantenimientosPorPlacaViewModel();
  //Trae la info de la placa
  someMantenimiento = useSomeMantenimientoViewModel();

  // Trae el nombre de la sesión
  session = useSession();

  //Trae una nuevo Mantenimiento
  getNuevoMantenimiento() {
    return [{ label: "Nuevo Mantenimiento", value: "Nuevo Mantenimiento" }];
  }

  //Trae los tipos de mantenimiento
  getMantenimientos() {
    return [
      { label: "Mantenimiento Preventivo", value: "Mantenimiento Preventivo" },
      { label: "Mantenimiento Correctivo", value: "Mantenimiento Correctivo" },
    ];
  }

  async onSubmit(values: FormValues) {
   
    let result;
    let dataFromMutation;
    if (values.programacion === "Nuevo Mantenimiento") {
      const fechaInicio = format(
        values.fechaInicio,
        "yyyy-MM-dd'T'HH:mm:ss.SSS-05:00"
      );
      const fechaSoat = format(
        parse(values.fechaSoat, "dd/MM/yyyy", new Date()),
        "yyyy-MM-dd'T'HH:mm:ss.SSS-05:00"
      );

      result = await this.registrarSinMantenimiento.registrarMantenimiento({
        variables: {
          updateOneMantenimientoInput: {
            kmMedido: parseFloat(values.kmMedido),
            fecha: fechaInicio,
            diagnostico: values.diagnostico,
            repuestos: values.repuestos,
            fechaInicio: fechaInicio,
            kmPrevio: parseFloat(values.kmPrevio),
            Cliente: values.Cliente,
            fechaSoat: fechaSoat,
            placa: values.placa,
            tecnico: this.session?.session?.toString() || "1",
            tipo: values.tipoMantenimiento,
           
          },
        },
      });
      dataFromMutation = result.data?.regisrar_mantenimiento_no_programado;
    } else {
      const fechaInicio = format(
        values.fechaInicio,
        "yyyy-MM-dd'T'HH:mm:ss.SSS-05:00"
      );
      const fecha = format(
        parse(values.fecha, "dd/MM/yyyy", new Date()),
        "yyyy-MM-dd'T'HH:mm:ss.SSS-05:00"
      );
        
      
      const fechaSoat = format(
        parse(values.fechaSoat, "dd/MM/yyyy", new Date()),
        "yyyy-MM-dd'T'HH:mm:ss.SSS-05:00"
      );

      result = await this.registrarMantenimiento.registrarMantenimiento({
        variables: {
          registrarMantInput: {
            _id: values._id,
            kmMedido: parseFloat(values.kmMedido),
            fecha: fechaInicio,
            diagnostico: values.diagnostico,
            repuestos: values.repuestos,
            fechaInicio: fechaInicio,
            kmPrevio: parseFloat(values.kmPrevio),
            Cliente: values.Cliente,
            fechaSoat: fechaSoat,
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
