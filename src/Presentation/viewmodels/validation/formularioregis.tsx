import * as Yup from "yup";

// Define el esquema de validación para el formulario utilizando Yup.
export const validationSchemaregis = Yup.object().shape({
    tipoMantenimiento: Yup.string().required("Este campo es requerido."),
    placa: Yup.string().required("Este campo es requerido."),
    fecha: Yup.date().nullable().required("Este campo es requerido."),
    anotaciones: Yup.string().required("Este campo es requerido."),
    files: Yup.array().min(1, "Debe subir al menos un documento."),
  });