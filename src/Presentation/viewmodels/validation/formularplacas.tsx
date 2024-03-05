 
import * as Yup from "yup";


const ELEMENTOS_LENGTH = 5;

export const validationSchemaPlacas = Yup.object().shape({
    tipocontrato: Yup.string().required("Este campo es requerido."),
    placa: Yup.string().required("Este campo es requerido."),
    vigenciaSoat: Yup.date().nullable().required("Este campo es requerido."),
    finalfecha: Yup.date().nullable().required("Este campo es requerido."),
    km: Yup.string().required("Este campo es requerido."),
    cliente: Yup.string().required("Este campo es requerido."),
    fechaRevision: Yup.date().nullable().required("Este campo es requerido."),
    propietario: Yup.string().required("Este campo es requerido."),
    average: Yup.number().required("Este campo es requerido."),
    files: Yup.array().min(1, "Debe subir al menos un documento."),
    estados: Yup.array()
      .of(Yup.string().required("Este campo es requerido."))
      .required("Debe seleccionar al menos un elemento.")
      .test(
        "todos-llenados",
        "Todos los campos deben estar llenos",
        (value) =>
          value &&
          value.length === ELEMENTOS_LENGTH &&
          value.every((v) => v !== "")
      ),
  });