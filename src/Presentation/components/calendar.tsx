import {  Pressable, Platform } from "react-native"
import TextInputs from "./textInput"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { format } from "date-fns"
import React from "react"

/**
 * CalendarComponent es un componente de React que renderiza un selector de fecha y hora.
 *
 * @param {Object} props Las propiedades del componente.
 * @param {Object} props.values Los valores del formulario.
 * @param {Function} props.setFieldValue La función para establecer el valor de un campo del formulario.
 * @param {Function} props.onBlur La función a ejecutar cuando el campo pierde el foco.
 * @returns {JSX.Element} El componente CalendarComponent renderizado.
 */
interface CalendarComponentProps {
    values:  Date | string ;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    onBlur: (e: any) => void;
    state: string;
  }



const CalendarComponent = ({ values, setFieldValue, onBlur, state } :CalendarComponentProps) => {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      {Platform.OS === "ios" ? (
        <TextInputs
          placeholder="Seleccione la fecha y hora"
          onPressOut={() => setOpen(true)}
          value={values ? format(values, "dd MMM yyyy HH:mm") : ""}
          onBlur={onBlur}
          editable={false}
        />
      ) : (
        <Pressable onPressOut={() => setOpen(true)}>
          <TextInputs
            placeholder="Seleccione la fecha y hora"
            value={
              values ? format(values, "dd MMM yyyy HH:mm") : ""
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
        date={values ? new Date(values) : undefined}
        onConfirm={date => {
            setOpen(false)
            setFieldValue(state, date)
        }}
        onCancel={() => {
            setOpen(false)
        }}
    />
    </>
  )
}

export default CalendarComponent
