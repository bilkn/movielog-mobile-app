import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import { Logo } from '..';

const Header = () => {
    return (
        <View>
            <Logo />
        </View>
    );
};

export default Header;
