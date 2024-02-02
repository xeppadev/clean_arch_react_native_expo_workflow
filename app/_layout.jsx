import { Stack } from "expo-router";

/**
 * Renderiza un componente de diseño de pila (Stack).
 * @returns {JSX.Element} El componente de diseño de pila renderizado.
 */
const StackLayout = () => {
  return (
    <Stack>
      {/* Crea una pantalla en la pila con el nombre "login".
      La opción "headerShown: false" oculta el encabezado para esta pantalla. */}
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
        {/* Crea una pantalla en la pila con el nombre "(tabs)". 
      La opción "headerShown: false" oculta el encabezado para esta pantalla. */}
      <Stack.Screen
        name="exit"
        options={{
          headerShown: false,
        }}
      />

     
      {/* Crea una pantalla en la pila con el nombre "(tabs)". 
      La opción "headerShown: false" oculta el encabezado para esta pantalla. */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      {/* Crea una pantalla en la pila con el nombre "registro-mantenimiento". 
      La opción "headerShown: false" oculta el encabezado para esta pantalla. */}
      <Stack.Screen
        name="registro-mantenimiento"
        options={{ headerShown: false }}
      />
      {/* Crea una pantalla en la pila con el nombre "programar-mantenimiento". 
      La opción "headerShown: false" oculta el encabezado para esta pantalla. */}
      <Stack.Screen
        name="programar-mantenimiento"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

// Exporta el componente StackLayout para que pueda ser utilizado en otros archivos.
export default StackLayout;
