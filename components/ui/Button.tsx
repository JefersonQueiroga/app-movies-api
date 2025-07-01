import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { colors } from '../../constants/Colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  textStyle
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        style
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, styles[`${variant}Text`], textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  primary: {
    backgroundColor: colors.secondary,
  },
  secondary: {
    backgroundColor: colors.accent,
  },
  outline: {
    backgroundColor: colors.transparent,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.white,
  },
  outlineText: {
    color: colors.secondary,
  },
});