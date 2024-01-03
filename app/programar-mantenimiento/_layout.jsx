import { Stack, useRouter } from "expo-router";
import BackHeader from "../../components/common/header/BackHeader";

/**
 * StackLayout es un componente de React que utiliza el componente Stack de expo-router para crear una pila de navegación.
 * 
 * Este componente crea una pantalla en la pila con el nombre "index". Para esta pantalla, se configuran varias opciones para el encabezado:
 * - "headerTitle: ''" establece el título del encabezado en una cadena vacía.
 * - "headerStyle: { backgroundColor:'#FFFFFF' }" establece el color de fondo del encabezado en blanco.
 * - "headerShadowVisible: false" oculta la sombra del encabezado.
 * - "headerLeft: () => <BackHeader handlePress={() => {router.back()}} />" establece el componente BackHeader como el contenido del lado izquierdo del encabezado. Cuando se hace clic en BackHeader, se navega a la página anterior.
 * 
 * @returns {JSX.Element} El componente StackLayout renderizado.
 */
const StackLayout = () => {

  // Obtiene el objeto router de expo-router para la navegación entre páginas.
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "" , headerStyle: { backgroundColor:'#FFFFFF' }, 
    headerShadowVisible:false,
     
     headerLeft: () => (
        <BackHeader
          handlePress={() => {router.back()}}
        />
      ),
    }} />
    </Stack>
  );
};

// Exporta el componente StackLayout para que pueda ser utilizado en otros archivos.
export default StackLayout;