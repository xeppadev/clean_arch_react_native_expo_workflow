import React from 'react';
import { View } from 'react-native';
import { styles, COLORS } from './ScrenHome.styles';

/**
 * ScreenHome es un componente de React que renderiza la pantalla de inicio.
 * 
 * @returns {JSX.Element} El componente ScreenHome renderizado.
 */
const ScreenHome= () => {
    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <View style={[styles.box, {backgroundColor: COLORS.blue }]}></View>
                <View style={[styles.box, {backgroundColor: COLORS.white }]}></View>
            </View>
            <View style={styles.column}>
                <View style={[styles.box, {backgroundColor: COLORS.wellow }]}></View>
                <View style={[styles.box, {backgroundColor: COLORS.blue }]}></View>
                <View style={[styles.box, {backgroundColor: COLORS.red}]}></View>
            </View>
        </View>
    );
}

export default ScreenHome;