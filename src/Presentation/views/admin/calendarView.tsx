import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  isToday,
  subDays,
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
import { useCalendarViewModel } from "../../viewmodels/suscrripciones/calendarViewModel";
// Genera un arreglo de fechas que representan cada semana en un intervalo de 14 días a partir de hoy.
const dates = eachWeekOfInterval(
  {
    start: subDays(new Date(), 0),
    end: addDays(new Date(), 14),
  },
  {
    weekStartsOn: 0, // 0 es Domingo, 1 es Lunes, 2 es Martes, etc.
  }
).reduce((acc: Date[][][], cur: Date, index: number) => {
  const allDays = eachDayOfInterval({
    start: cur,
    end: addDays(cur, 6), // 6 días después de la fecha actual
  });

  if (index % 3 === 0) {
    acc.push([allDays]);
  } else {
    acc[acc.length - 1].push(allDays);
  }

  return acc;
}, []);

export default function CalendarView() {
  const {
    TodosMantenimientos,
    highlightedDates,
    loading,
    error,
    mantenimientosPendientes,
    mantenimientosCompletos,
  } = useCalendarViewModel();

  if (loading) {
    return (
      <View style={style.center}>
        <ActivityIndicator size="large" color={COLORS.blue3} />
      </View>
    );
  }

  return (
    <View style={style.container}>
      <View style={style.container2}>
        {/* Mapea cada grupo de fechas a un componente de vista. */}
        {dates.map((group, index) => (
          <View key={index}>
            {/* Mapea cada semana en el grupo a un componente de vista. */}
            {group.map((week, weekIndex) => (
              <View key={weekIndex} style={style.row}>
                {/* Mapea cada día en la semana a un componente de vista. */}
                {week.map((day, dayIndex) => {
                  //define un el formateo de highlight para los días que se mostrarán en el calendario de otro color
                  const dayform = format(day, "dd/MM/yyyy");
                  const isHighlighted = highlightedDates.includes(dayform);
                  return (
                    // Renderiza un componente de vista para cada día.
                    // Si el día actual es el día actual, se le aplica un estilo especial.
                    <TouchableOpacity
                      key={dayIndex}
                      onPress={() => {
                        if (isToday(day)) {
                          // Aquí puedes agregar las acciones que quieras ejecutar cuando se presione el día actual
                          console.log("El día actual fue presionado");
                        }
                      }}
                    >
                      <View style={isToday(day) ? style.today : null}>
                        <View style={style.week}>
                          {weekIndex === 0 && (
                            <Text
                              style={
                                isToday(day) ? style.todayText : style.weekText
                              }
                            >
                              {format(day, "EEEE", { locale: es })
                                .charAt(0)
                                .toUpperCase()}
                            </Text>
                          )}
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
            ))}
          </View>
        ))}

        {/* Muestra las pestañas para filtrar los eventos */}
        <TabPage
          tabs={[
            {
              key: "pendientes",
              title: "Pendientes",
              component: () => <PendientPage
              data={mantenimientosPendientes}
              
              />,
            },
            {
              key: "todos",
              title: "Todos",
              component: () => <PendientPage
              data={TodosMantenimientos}
              />,
            },
            {
              key: "compleados",
              title: "Completados",
              component: () => <PendientPage 
              data={mantenimientosCompletos}
              />,
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
