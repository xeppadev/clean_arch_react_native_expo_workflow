import { View, Text } from "react-native";
import styles from "./screenheader.style";

/**
 * TimeHeader es un componente de React que renderiza un encabezado de tiempo.
 * 
 * @returns {JSX.Element} El componente TimeHeader renderizado.
 */
const TimeHeader = () => {
  // Obtiene la fecha actual
  const date = new Date();
  const day = date.getDate();
  const weekday = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'][date.getDay()];
  const month = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'][date.getMonth()];
  const year = date.getFullYear();

  return (
    <View style={styles.containerTime}>
      <Text style={styles.day}>{day < 10 ? `0${day}` : day}</Text>
      <View style={styles.dateInfo}>
        <Text style={styles.weekday}>{weekday}</Text>
        <Text style={styles.monthYear}>{`${month} ${year}`}</Text>
      </View>
    </View>
  );
};

export default TimeHeader;