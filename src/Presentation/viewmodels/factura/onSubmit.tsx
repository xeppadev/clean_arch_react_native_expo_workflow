import { format } from "date-fns";
import { useSoloClientesViewModel } from "../clientes/soloclientesViewModel";
import { useSession } from "@/src/Presentation/hooks/useSession";
import { sendToExternalApi } from "@/src/Data/api/sendfiles";
import { Platform } from "react-native";
import { useRegistrarFacturaViewModel } from "./registrarFacturaViewModel";
import { usePropietariosViewModel } from "../cars/propietariosViewModel";
import { FacturaViewModel } from "./tipoFactura";
import axios from "axios";
// Define una interfaz para los valores del formulario
interface FormValues {
    tipoFactura: string;
    dateInput: string;
    fecha: string | Date;
    igv: string;
    detraccion: string;
    montoParcial: string;
    numeroFactura: string;
    files: any[]; // Reemplaza 'any' con el tipo correcto para tus archivos
}

export class RegistrarFacturaViewModel {
    // Define las mutaciones de Apollo Client para registrar una factura.
    registrarFactura = useRegistrarFacturaViewModel();
    
    // Trae el nombre de la sesión
    session = useSession();
    
    // Trae los clientes para el select
    clientes = useSoloClientesViewModel();
    
    // Trae todos los propietarios para el select
    propietarios = usePropietariosViewModel();

    // Trae los tipos de factura
    tipoFactura = new FacturaViewModel().getMantenimientos(this.session?.userType || "tecnico");

    
    async onSubmit(values: FormValues) {
        const fecha = format(values.fecha, "yyyy-MM-dd'T'HH:mm:ss.SSS-05:00");
    
        const result = await this.registrarFactura?.registrarFactura({
        variables: {
            createFacturaInput: {
            tipo: values.tipoFactura,
            involucrado: values.dateInput,
            fecha: fecha,
            igv: parseFloat(values.igv),
            detraccion: parseFloat(values.detraccion),
            monto: parseFloat(values.montoParcial),
            numeroFactura: values.numeroFactura,
            notificacion: this.session?.userType === "admin" ? false : true,
            
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
      
    
        const dataFromMutation = result.data?.crear_factura
        try {
            await sendToExternalApi(formData, {
              query1: "facturas",
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
    }
}





  