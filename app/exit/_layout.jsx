import { Stack } from "expo-router";
import BackHeader from "../../components/common/header/BackHeader";
import { useRouter } from "expo-router";

/**
 * Renderiza un componente de diseño de pila (Stack).
 * @returns {JSX.Element} El componente de diseño de pila renderizado.
 */
const StackLayout = () => {

  // Obtiene el objeto router de expo-router para la navegación entre páginas.
  const router = useRouter();
  return (
    <Stack>
      {/* Crea una pantalla en la pila con el nombre "register". 
      La opción "headerShown: false" oculta el encabezado para esta pantalla. */}
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
