import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  isToday,
  subDays,
  startOfWeek,
} from "date-fns";
import { es } from "date-fns/locale";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "@/constants/Colors";
import TabPage from "../../components/tabView";
import PendientPage from "../../components/optionPendient";
import { useCalendarViewModel } from "../../viewmodels/suscripciones/calendarViewModel";
// Genera un arreglo de fechas que representan cada semana en un intervalo de 14 días a partir de hoy.
const dates = eachDayOfInterval({
  start: startOfWeek(new Date()),
  end: addDays(startOfWeek(new Date()), 6),
});

export default function CalendarView() {
  const {
    TodosMantenimientosRecientes,
    highlightedDates,
    loading,
    error,
    mantenimientosPendientes,
    mantenimientoscompletosRecientes,
    refetch,
  } = useCalendarViewModel();

  if (loading) {
    return (
      <View style={style.center}>
        <ActivityIndicator size="large" color={COLORS.blue3} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={style.center}>
        <Text>Hubo un error al cargar los datos</Text>
      </View>
    );
  }

  return (
    <View style={style.container}>
      <View style={style.container2}>
        {/* Mapea cada grupo de fechas a un componente de vista. */}
        <View style={style.row}>
          {dates.map((day, dayIndex) => {
            const dayform = format(day, "dd/MM/yyyy");
            const isHighlighted = highlightedDates.includes(dayform);
            return (
              <TouchableOpacity
                key={dayIndex}
                onPress={() => {
                  if (isToday(day)) {
                    console.log("El día actual fue presionado");
                  }
                }}
              >
                <View style={isToday(day) ? style.today : null}>
                  <View style={style.week}>
                    <Text
                      style={isToday(day) ? style.todayText : style.weekText}
                    >
                      {format(day, "EEEE", { locale: es })
                        .charAt(0)
                        .toUpperCase()}
                    </Text>
                  </View>

                  <View style={style.day}>
                    <Text
                      style={
                        isToday(day)
                          ? style.todayText
                          : isHighlighted
                          ? style.eventText
                          : style.dayText
                      }
                    >
                      {format(day, "dd")}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        {/* Muestra las pestañas para filtrar los eventos */}
        <TabPage
          tabs={[
            {
              key: "pendientes",
              title: "Pendientes",
              component: () => (
                <PendientPage
                  data={mantenimientosPendientes}
                  refetch={refetch}
                />
              ),
            },
            {
              key: "todos",
              title: "Todos",
              component: () => (
                <PendientPage data={TodosMantenimientosRecientes} refetch={refetch} />
              ),
            },
            {
              key: "compleados",
              title: "Completados",
              component: () => (
                <PendientPage
                  data={mantenimientoscompletosRecientes}
                  refetch={refetch}
                />
              ),
            },
          ]}
        />
      </View>
    </View>
  );
}

// Exporta el componente ListPage para que pueda ser utilizado en otros archivos.

// Define los estilos utilizados en este componente.
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  container2: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginHorizontal: 18,
    marginTop: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-evenly",
  },
  day: {
    alignItems: "center",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 8,
    fontFamily: "Inter_500Medium",
  },
  weekText: {
    paddingBottom: 4,
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.gray,
    paddingHorizontal: 8,
    fontFamily: "Inter_500Medium",
  },
  week: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 2,
  },
  today: {
    backgroundColor: COLORS.blue2,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  todayText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
    fontFamily: "Inter_500Medium",
  },
  eventText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.bluelg,
    marginHorizontal: 8,
    fontFamily: "Inter_500Medium",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.bg,
  },
});
