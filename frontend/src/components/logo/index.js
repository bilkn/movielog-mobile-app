import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

const Logo = (props) => {
    const { colors } = useTheme();
    const { large } = props;
    return (
        <View style={styles.logoContainer}>
            <Text style={{ ...styles.logo, color: colors.text, fontSize: large ? 48 : 24 }}>Movie</Text>
            <Text style={{ ...styles.logo, color: colors.secondary, fontSize: large ? 48 : 24 }}>log</Text>
        </View>
    );
};

export default Logo;
