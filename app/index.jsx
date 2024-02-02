import { Redirect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
/**
 * Renderiza un componente que redirige al usuario a la página de inicio.
 * @returns {JSX.Element} El componente de redirección renderizado.
 */
const StartPage = () => {
  // Redirige al usuario a la ruta "/home".
  return <Redirect href="/login" />;
}

// Exporta el componente StartPage para que pueda ser utilizado en otros archivos.
export default StartPage;