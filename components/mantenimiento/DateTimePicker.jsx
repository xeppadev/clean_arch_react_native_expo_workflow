import { StyleSheet, Pressable,Platform } from "react-native";
import TextInputs from "./textinput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import React from "react";

/**
 * CalendarComponent es un componente de React que renderiza un selector de fecha y hora.
 *
 * @param {Object} props Las propiedades del componente.
 * @param {Object} props.values Los valores del formulario.
 * @param {Function} props.setFieldValue La función para establecer el valor de un campo del formulario.
 * @param {Function} props.onBlur La función a ejecutar cuando el campo pierde el foco.
 * @returns {JSX.Element} El componente CalendarComponent renderizado.
 */
const CalendarComponent = ({ values, setFieldValue, onBlur  }) => {
    const [open, setOpen] = React.useState(false);
  return (
    <>
    {Platform.OS === "ios" ? (
        <TextInputs
          placeholder="Seleccione la fecha y hora"
          onPressOut={() => setOpen(true)}
          value={
            values.fechaMantenimiento
              ? format(
                  values.fechaMantenimiento,
                  "yyyy-MM-dd HH:mm"
                )
              : ""
          }
          onBlur={onBlur}
          editable={false}
        />
      ) : (
        <Pressable onPressOut={() => setOpen(true)}>
          <TextInputs
            placeholder="Seleccione la fecha y hora"
            value={
              values.fechaMantenimiento
                ? format(
                    values.fechaMantenimiento,
                    "yyyy-MM-dd HH:mm"
                  )
                : ""
            }
            onBlur={onBlur}
            editable={false}
          />
        </Pressable>
      )}

      <DateTimePickerModal
        display="inline"
        mode="datetime"
        isVisible={open}
        date={values.fechaMantenimiento || new Date()}
        onConfirm={(date) => {
          setOpen(false);
          setFieldValue("fechaMantenimiento", date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default CalendarComponent;