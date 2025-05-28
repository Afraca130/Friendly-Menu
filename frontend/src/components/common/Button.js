import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
}) => {
  const { theme } = useTheme();

  const getButtonStyle = () => {
    const baseStyle = {
      ...styles.button,
      backgroundColor: disabled ? theme.colors.border : theme.colors[variant],
      paddingVertical: theme.spacing[size === 'small' ? 'sm' : 'md'],
      paddingHorizontal: theme.spacing[size === 'small' ? 'md' : 'lg'],
      borderRadius: theme.borderRadius.md,
    };

    return [baseStyle, style];
  };

  const getTextStyle = () => {
    return {
      ...styles.text,
      color: disabled ? theme.colors.textSecondary : theme.colors.background,
      fontSize:
        size === 'small'
          ? theme.typography.caption.fontSize
          : theme.typography.body.fontSize,
    };
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
  },
});

export default Button;
