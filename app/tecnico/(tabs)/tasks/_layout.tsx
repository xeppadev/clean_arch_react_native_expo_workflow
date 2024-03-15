import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";

const { Navigator } = createMaterialTopTabNavigator();
export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const Layout = () => {
  return (
    <MaterialTopTabs
      initialRouteName="index"
      screenOptions={{
        tabBarLabelStyle: {
          fontWeight: "500",
          textTransform: "capitalize",
          fontSize: 14,
        },
        tabBarStyle: { backgroundColor: "#f7f7f9" }, // Mueve esta línea a 'screenOptions'
        tabBarIndicatorStyle: {
          backgroundColor: "#0e2572",
          height: 3,
          borderRadius: 5,
        }, // Mueve esta línea a 'screenOptions'

        lazy: true,
      }}
    >
      <MaterialTopTabs.Screen name="revision" options={{ title: "Revision" }} />
      <MaterialTopTabs.Screen name="todos" options={{ title: "Todos" }} />
      <MaterialTopTabs.Screen
        name="aprobados"
        options={{ title: "Aprobados" }}
      />
    </MaterialTopTabs>
  );
};

export default Layout;
