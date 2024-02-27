import { View, Text, StyleSheet,StyleProp, ViewStyle } from "react-native";


type TimeHeaderProps = {
  style?: StyleProp<ViewStyle>;
};


/**
 * TimeHeader es un componente de React que renderiza un encabezado de tiempo.
 *
 * @returns {JSX.Element} El componente TimeHeader renderizado.
 */
const TimeHeader: React.FC<TimeHeaderProps> = ({ style }) => {
  // Obtiene la fecha actual
  const date = new Date();
  const day = date.getDate();
  const weekday = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"][
    date.getDay()
  ];
  const month = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ][date.getMonth()];
  const year = date.getFullYear();

  return (
    <View style={[styles.containerTime, style]}>
      <Text style={styles.day}>{day < 10 ? `0${day}` : day}</Text>
      <View>
        <Text style={styles.weekday}>{weekday}</Text>
        <Text style={styles.monthYear}>{`${month} ${year}`}</Text>
      </View>
    </View>
  );
};

export default TimeHeader;

const styles = StyleSheet.create({
  containerTime: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 0,
    marginTop: 0,
  },
  day: {
    fontSize: 36,
    fontWeight: "bold",
    marginRight: 10,
    fontFamily: "Inter_500Medium",
  },

  weekday: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Inter_500Medium",
  },
  monthYear: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Inter_500Medium",
  },
});
