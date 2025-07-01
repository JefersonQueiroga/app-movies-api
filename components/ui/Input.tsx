import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { colors } from '../../constants/Colors';

interface InputProps extends TextInputProps {
  placeholder: string;
}

export const Input: React.FC<InputProps> = ({ placeholder, style, ...props }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      placeholderTextColor={colors.textMuted}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 16,
  },
});