import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { TouchableOpacity ,Platform  } from 'react-native';
import { COLORS } from '../../../constants/theme';

const TabBarCustomButton = ({ children, onPress , color }) => {
    return (
        <TouchableOpacity style={{ top: Platform.OS == "ios" ? -2 : -13 , justifyContent: 'center', alignItems: 'center', zIndex: 1 }} onPress={onPress} activeOpacity={1}>
            <Svg width={114} height={42}    viewBox="115.897 106.455 144.434 54.459" style={{ position: 'absolute', zIndex: 0 }}>
                <Path
                       d="M156.244 106.455l-40.347.012c8.87.306 17.249.242 26.854 8.89.197-.183 4.661 5.007 9.098 12.069 4.475 15.288 18.327 34.806 38.893 33.418 19.464.489 31.162-13.819 37.972-30.756l1.372-3.61c10.838-17.84 22.287-19.677 30.245-20.023H156.244z"
                     fill={color}
                   
                     
                />
            </Svg>
            {children}
        </TouchableOpacity>
    );
};

export default TabBarCustomButton;