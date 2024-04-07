import React, { useState } from "react";
import { Pressable, Platform } from "react-native";
import TextInputs from "./textInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

interface CalendarComponentProps {
  values: Date | string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  onBlur: (e: any) => void;
  state: string;
}

const CalendarComponent = ({
  values,
  setFieldValue,
  onBlur,
  state,
}: CalendarComponentProps) => {
  const [open, setOpen] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || values;
    setOpen(false);
    setFieldValue(state, currentDate);
    setDateSelected(true);
  };

  const handleTimeChange = (event: any, selectedTime: Date | undefined) => {
    const currentTime = selectedTime || values;
    setOpen(false);
    setFieldValue(state, currentTime);
    setDateSelected(false);
  };

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
        <Pressable onPress={() => setOpen(true)}>
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
      {open && !dateSelected ? (
        <DateTimePicker
          display="inline"
          mode="date"
          testID="dateTimePicker"
          value={values ? new Date(values) : new Date()}
          onChange={handleDateChange}
        />
      ) : null}
      {open && dateSelected ? (
        <DateTimePicker
          display="inline"
          mode="time"
          testID="dateTimePicker"
          value={values ? new Date(values) : new Date()}
          onChange={handleTimeChange}
        />
      ) : null}
    </>
  );
};

export default CalendarComponent;