import { Stack } from "expo-router";

/**
 * Renderiza un componente de diseño de pila (Stack).
 * @returns {JSX.Element} El componente de diseño de pila renderizado.
 */
const StackLayout = () => {
  return (
    <Stack>
      {/* Crea una pantalla en la pila con el nombre "register". 
      La opción "headerShown: false" oculta el encabezado para esta pantalla. */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: false
        }}
      />
    
    </Stack>
  );
};

// Exporta el componente StackLayout para que pueda ser utilizado en otros archivos.
export default StackLayout;
