import React from 'react';
import { Text, Platform } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { COLORS } from '../../constants/theme';

/**
 * TabPage es un componente de React que renderiza una vista de pestañas.
 * 
 * @param {Object} props Las propiedades del componente.
 * @param {Array} props.tabs Un array de objetos que representan las pestañas. Cada objeto debe tener una clave 'key' única y un componente 'component'.
 * @param {number} props.initialIndex El índice de la pestaña que se mostrará inicialmente. Por defecto es 0.
 * @returns {JSX.Element} El componente TabPage renderizado.
 */
const TabPage = ({ tabs, initialIndex = 0 }) => {
  // Define el estado para el índice de la pestaña actual y las rutas de las pestañas
  const [index, setIndex] = React.useState(initialIndex);
  const [routes] = React.useState(tabs);

  // Define la función para renderizar la escena de cada pestaña
  const renderScene = ({ route }) => {
    const tab = tabs.find(tab => tab.key === route.key);
    if (tab) {
      const Component = tab.component;
      return <Component />;
    }
    return null;
  };

  // Define la función para renderizar la barra de pestañas
  const renderTabBar = props => (
    <TabBar
      {...props}
      activeColor={COLORS.black }
      inactiveColor={COLORS.gray2}
      indicatorStyle={{ backgroundColor: COLORS.bluelg}}
      style={{ 
        backgroundColor: COLORS.white, 
        borderTopLeftRadius: 12,
        borderTopRightRadius: 15,
        ...Platform.select({
          android: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0.5,
            borderColor: COLORS.gray2,
          },
        }),
      }}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color, marginRight: 0, fontWeight:"500" }}>
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
      initialLayout={{ width: 'auto' }}
      renderTabBar={renderTabBar}
    />
  );
}

// Exporta el componente TabPage para que pueda ser utilizado en otros archivos
export default TabPage;