import { Stack } from "expo-router";
import Notificacion from "../../../components/common/header/notificacion";
import TimeHeader from "../../../components/common/header/TimeHeader";
import { COLORS } from "../../../constants/theme";
import  {useRouter} from "expo-router";

/**
 * Renderiza un componente de StackLayout que utiliza el componente Stack de expo-router.
 * @returns {JSX.Element} El componente StackLayout renderizado.
 */
const StackLayout = () => {
  // Obtiene el objeto router de expo-router para la navegación entre páginas.
  const router = useRouter();

  return (
    <Stack>
      {/* Crea una pantalla en la pila con el nombre "index". 
      Configura varias opciones para el encabezado de esta pantalla:
      - "headerTitle: ''" establece el título del encabezado en una cadena vacía.
      - "headerStyle: { backgroundColor: COLORS.bg }" establece el color de fondo del encabezado.
      - "headerShadowVisible: false" oculta la sombra del encabezado.
      - "headerLeft: () => <TimeHeader />" establece el componente TimeHeader como el contenido del lado izquierdo del encabezado.
      - "headerRight: () => <Notificacion  handlePress={() => {router.push("/tasks/notifications")}} />" establece el componente Notificacion como el contenido del lado derecho del encabezado. Cuando se hace clic en Notificacion, se navega a la página "/tasks/notifications". */}
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: COLORS.bg },
          headerShadowVisible: false,
          headerLeft: () => <TimeHeader />,
          headerRight: () => (
            <Notificacion  handlePress={() => {router.push("/tasks/notifications")}} />
          ),
        }}
      />
    </Stack>
  );
};

// Exporta el componente StackLayout para que pueda ser utilizado en otros archivos.
export default StackLayout;