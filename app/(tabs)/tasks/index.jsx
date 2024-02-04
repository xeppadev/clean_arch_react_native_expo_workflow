import { View, StyleSheet, Platform} from "react-native";
import { COLORS } from "../../../constants/theme";
import TabPage from "../../../components/calendar/ScreenCalendar";
import ProgramadosPage from '../../../components/tasks/ProgramadosPage';

/**
 * Renderiza un componente de TaskPage que muestra una serie de pestañas.
 * @returns {JSX.Element} El componente TaskPage renderizado.
 */
const TaskPage = () => {
  return (
    <View style={style.container}>
      <View style={style.container2}>
        {/* Renderiza un componente TabPage con tres pestañas: "Confirmados", "Todos" y "Pendientes". 
        Cada pestaña muestra el componente ProgramadosPage. */}
        <TabPage
          tabs={[
            { key: 'confirmados', title: 'Confirmados', component: ProgramadosPage },
            { key: 'todos', title: 'Todos', component:ProgramadosPage },
            { key: 'pendientes', title: 'Pendientes', component: ProgramadosPage },
          ]}
        />
      </View>
    </View>
  );
};

// Exporta el componente TaskPage para que pueda ser utilizado en otros archivos.
export default TaskPage;

// Define los estilos utilizados en este componente.
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  container2: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginHorizontal: Platform.OS === 'ios' ? 18 : 18,
    marginTop:Platform.OS == "ios" ? 15 : 7,
    borderRadius: 20,
    paddingTop: Platform.OS == "ios"? 5 : 0,
    paddingBottom: 8,
    paddingBottom: Platform.OS === 'ios' ? 90 : 68,
  },
});