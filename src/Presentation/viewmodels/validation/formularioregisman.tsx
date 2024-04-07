import * as yup from 'yup';

export   const validationSchemarRegis = yup.object().shape({
  placa: yup.string().required('Este campo es requerido'),
  programacion: yup.string().required('Este campo es requerido'),
  tipoMantenimiento: yup.string().when('programacion', {
    is: (programacion: string) => programacion === 'Nuevo Mantenimiento',
    then: (schema) => schema.required('Este campo es requerido'),
       
  }),
  kmPrevio: yup.string().required('Este campo es requerido'),
  kmMedido: yup.string().required('Este campo es requerido'),
  fechaInicio: yup.string().required('Este campo es requerido'),
  fechaSoat: yup.string().required('Este campo es requerido'),
  diagnostico: yup.string().required('Este campo es requerido'),
  repuestos: yup.array().min(1, "Debe seleccionar al menos un repuesto."),
  files: yup.array().min(1, "Debe subir al menos un documento."),
  
});