import React from "react";
import { Text, Platform, Dimensions } from "react-native";
import { TabView, TabBar, Route, TabBarProps } from "react-native-tab-view";
import { COLORS } from "@/constants/Colors";

// Define los tipos para las props del componente
interface TabPageProps {
  tabs: {
    key: string;
    title: string;
    component: React.ComponentType;
  }[];
  initialIndex?: number;
}

// Define el tipo para los elementos del array 'tabs'
interface Tab {
  key: string;
  component: React.ComponentType;
}

const TabPage: React.FC<TabPageProps> = ({ tabs, initialIndex = 0 }) => {
  // Define el estado para el índice de la pestaña actual y las rutas de las pestañas
  const [index, setIndex] = React.useState(initialIndex);
  const [routes] = React.useState(tabs);

  // Define la función para renderizar la escena de cada pestaña
  const renderScene = ({ route }: { route: Route }) => {
    const tab = tabs.find((tab) => tab.key === route.key);
    if (tab) {
      const Component = tab.component;
      return <Component />;
    }
    return null;
  };
  // Obtiene las dimensiones de la ventana

  // Define la función para renderizar la barra de pestañas
const renderTabBar = (props: TabBarProps<Route>) => (
    <TabBar
      {...props}
      activeColor={COLORS.black}
      inactiveColor={COLORS.gray2}
      indicatorStyle={{ backgroundColor: COLORS.blue2 }}
      style={{
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 15,
        ...Platform.select({
          android: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0.2,
            borderColor: COLORS.gray2,
          },
        }),
      }}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color, marginRight: 0, fontWeight: "500", fontFamily:"Inter_500Medium" }}>
          {route.title}
        </Text>
      )}
    />
  );

  // Renderiza el componente TabView
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get("window").width }}
      renderTabBar={renderTabBar}
      lazy
      lazyPreloadDistance={1}
    />
  );
};

// Exporta el componente TabPage para que pueda ser utilizado en otros archivos
export default TabPage;
