import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: Platform.OS === 'ios' ? 90 : 80,
        padding: 10,
        backgroundColor: "#EDEDED",
    },
    column: {
        flex: 1,
        justifyContent: 'space-between',
    },
    box: {
        flex: 1,
        borderRadius: 15,
        backgroundColor: 'white',
        margin: 8,
    },
});


export const COLORS = {
    white: '#FFFFFF',
    blue: '#0B1C40',
    wellow: '#D9AA02',
    red: '#FCDDDD',
    
};