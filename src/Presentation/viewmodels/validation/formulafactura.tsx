import * as Yup from "yup";


 // Define el esquema de validación para el formulario utilizando Yup.
 export const validationSchemaFact = Yup.object().shape({
  tipoFactura: Yup.string().required("Este campo es requerido."),
  dateInput: Yup.string().when("tipoFactura", {
    is: (tipoFactura: string) => tipoFactura === "Factura a Propietario Vehicular" || tipoFactura === "Factura a Cliente",
  then: (schema) => schema.required("Este campo es requerido."),
  }),
  fecha: Yup.date().nullable().required("Este campo es requerido."),
  montoParcial: Yup.string().required("Este campo es requerido."),
  igv: Yup.string().required("Este campo es requerido."),
  numeroFactura: Yup.string().when("tipoFactura", {
    is: (tipoFactura: string) => tipoFactura === "Factura a Propietario Vehicular" || tipoFactura === "Factura a Cliente",
  then: (schema) => schema.required("Este campo es requerido."),
  }),
  detraccion: Yup.string().when("tipoFactura", {
    is: (tipoFactura: string) => tipoFactura === "Factura a Propietario Vehicular",
  then: (schema) => schema.required("Este campo es requerido."),
  }),
  files: Yup.array().min(1, "Debe subir al menos un documento."),
});