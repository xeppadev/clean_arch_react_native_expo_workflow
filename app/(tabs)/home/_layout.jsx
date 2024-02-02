import { Stack } from "expo-router";
import ScreenHeader from "../../../components/common/header/ScreenHeader";
import TimeHeader from "../../../components/common/header/TimeHeader";
import { COLORS } from "../../../constants/theme";
import { useRouter } from 'expo-router';

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
      - "headerRight: () => <ScreenHeader profileName='Pablo Rodriguez' role='Admin' />" establece el componente ScreenHeader con los props profileName y role como el contenido del lado derecho del encabezado. */}
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: COLORS.bg },
          headerShadowVisible: false,
          headerLeft: () => <TimeHeader />,
          headerRight: () => (
            <ScreenHeader profileName="Pablo Rodriguez" role="Admin" handlePress={ () => { router.push("/exit")  }} />
          ),
        }}
      />
    </Stack>
  );
};

// Exporta el componente StackLayout para que pueda ser utilizado en otros archivos.
export default StackLayout;