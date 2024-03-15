import * as yup from "yup";

export const validationSchemaCompletado = yup.object().shape({
  diagnosticoFinal: yup.string().when("estado", {
    is: (estado: string) => estado === "aprobado",
    then: (schema) => schema.required("Diagnostico Final es requerido"),
    
  }),
  diagnosticoActualizado: yup.string().when("estado", {
    is: (estado: string) => estado === "revision",
    then: (schema) => schema.required("Diagnostico Actualizado es requerido"),
    
  }),
  files: yup.array().when("estado", {
    is: (estado: string) => estado !== "denegado",
    then: (schema) => schema.min(1, "Se requiere al menos un archivo"),
  }),
  repuestos: yup.array().when("estado", {
    is: (estado: string) => estado === "revision",
    then: (schema) => schema.min(1, "Se requiere al menos un repuesto"),
    
  }),
});
