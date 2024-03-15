import { useQuery } from "@apollo/client";
import {
  GET_CALENDARS,
  CALENDARS_SUBSCRIPTION,
} from "@/src/Data/repositories/suscripciones/calendarepositorio";
import React from "react";


export const useCalendarViewModel = () => {
  const { data, loading, error, subscribeToMore } = useQuery(GET_CALENDARS);

  React.useEffect(() => {
    subscribeToMore({
      document: CALENDARS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newCalendarData = subscriptionData.data.Calendar_Hoy_Tecnico;

       

        // Reemplaza todos los datos viejos con los nuevos datos
        return Object.assign({}, prev, {
          Query_Calendar_Hoy_Tecnico: newCalendarData,
        });
      },
    });
  }, [subscribeToMore]);

  const calendarData = data?.Query_Calendar_Hoy_Tecnico;

  const highlightedDates =
    calendarData?.calendar?.map((day) => day?.dayMes) ?? [];

  const mantenimientosProgramados =
    calendarData?.mantenimientos?.filter(
      (mantenimiento) => mantenimiento?.estado === "programado"
    ) ?? [];

    const mantenimientosPendientes =
    calendarData?.mantenimientos?.filter(
      (mantenimiento) => mantenimiento?.estado === "pendiente"
    ) ?? [];

    const TodosMantenimientos =
    calendarData?.mantenimientos ?? [];

    const mantenimientosCompletos =
    calendarData?.mantenimientos?.filter(
      (mantenimiento) => mantenimiento?.estado === "completado"
    ) ?? [];

    const mantenimientosRevision =
    calendarData?.mantenimientos?.filter(
      (mantenimiento) => mantenimiento?.estado === "revision"
    ) ?? [];

    const mantenimientosAprobados =
    calendarData?.mantenimientos?.filter(
      (mantenimiento) => mantenimiento?.estado === "aprobado"
    ) ?? [];

  return {  TodosMantenimientos, loading, error, highlightedDates, mantenimientosProgramados, mantenimientosPendientes, mantenimientosCompletos, mantenimientosRevision, mantenimientosAprobados };
};
