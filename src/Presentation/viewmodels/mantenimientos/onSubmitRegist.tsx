// ViewModel.ts
import { format } from "date-fns";
import { useRegistrarMantenimientoViewModel } from "./registrarManteViewModel";
import { useSession } from "@/src/Presentation/hooks/useSession";
import { sendToExternalApi } from "@/src/Data/api/sendfiles";
import { Platform } from "react-native";
import { useSoloPlacasViewModel } from "../cars/soloplacasViewModel";
import { useSoloRepuestoViewModel } from "../repuestos/filterRepuestosViewModel";
import { useMantenimientosPorPlacaViewModel } from "./mantenimiplacaViewModel";


// Define una interfaz para los valores del formulario
interface FormValues {
      _id: string;
      fechaInicio: string;
      kmMedido: string;
      fecha: string;
      diagnostico: string;
      repuestos: any[];
      files: any[];
      
  }

export class RegistrarMantenimientoViewModel {
    // Define las mutaciones de Apollo Client para programar un mantenimiento.
    registrarMantenimiento = useRegistrarMantenimientoViewModel();
    
    // Trae las placas para el select
    placas = useSoloPlacasViewModel();
    // Trae los repuestos para el select
    repuestos = useSoloRepuestoViewModel();
    // Trae la programación de mantenimientos 
    mantenimientos = useMantenimientosPorPlacaViewModel(this.placas.placas[0].value);
    

    
    
    
    async onSubmit(values: FormValues) {
        const fecha = format(values.fecha, "yyyy-MM-dd'T'HH:mm:ss.SSS-05:00");
        const fechaSoat = format(values.fechaInicio, "yyyy-MM-dd'T'HH:mm:ss.SSS-05:00");
    
        const result = await this.registrarMantenimiento.registrarMantenimiento({
        variables: {
            registrarMantInput: {
            _id: values._id,
            kmMedido: parseFloat(values.kmMedido),
            fecha : fecha,
            diagnostico: values.diagnostico,
            repuestos: values.repuestos,
            fechaInicio: fechaSoat,
            
            },
        },
        });
    
        const formData = new FormData();
        // Platforms
        values.files.forEach((file) => {
        formData.append("files", {
            uri: file.uri,
            name:
            Platform.OS === "android"
                ? file.fileName
                : file.name,
            type: file.type,
        } as any);
        });
        const dataFromMutation = result.data?.regisrar_mantenimiento_programado;
        await sendToExternalApi(formData, {
        query1: "mantenimientos",
        query2: dataFromMutation,
        });
    }
    } 