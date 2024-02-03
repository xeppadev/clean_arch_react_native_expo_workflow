import React from 'react';
import { Button, TextInput } from 'react-native';
import { Formik } from 'formik';
import axios from 'axios';
import { Platform } from 'react-native';

const MyForm = () => (
  <Formik
    initialValues={{ idMant: '', placa: '', fecha: '', tipoMantenimiento: '', kmPrevio: '', kmMedido: '', fechaSoat: '', diagnostico: '', repuestos: [], documentos: [] }}
    onSubmit={async (values) => {
      // Crear un objeto FormData
      const formData = new FormData();

      // Agregar los campos del formulario
      Object.keys(values).forEach((key) => {
        if (key !== 'documentos') {
          formData.append(key, values[key]);
        }
      });

      // Agregar los archivos
      values.documentos.forEach((doc, index) => {
        // Para cada archivo, agregarlo al objeto FormData
        // Asegúrate de que 'doc' es un objeto con las propiedades 'uri', 'name' y 'type'
        formData.append('files', {
          uri: Platform.OS === 'android' ? doc.uri : doc.uri.replace('file://', ''),
          name: doc.name,
          type: doc.type,
        });
      });

      // Enviar la solicitud POST
      try {
        const response = await axios.post('http://your-server.com/registrar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }}
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <React.Fragment>
        <TextInput
          onChangeText={handleChange('idMant')}
          onBlur={handleBlur('idMant')}
          value={values.idMant}
        />
        {/* Agrega aquí los demás campos del formulario */}
        <Button onPress={handleSubmit} title="Submit" />
      </React.Fragment>
    )}
  </Formik>
);

export default MyForm;