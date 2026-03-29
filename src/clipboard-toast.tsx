import React, { useCallback } from 'react';
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-root-toast';

export interface ClipboardToastProps {
  textToShow?: string;
  textToCopy: string;
  toastText?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  id?: string | number;
  accessibilityLabel?: string;
  toastDuration?: number;
  toastPosition?: 'top' | 'center' | 'bottom';
  toastDelay?: number;
  toastAnimation?: boolean;
  toastHideOnPress?: boolean;
  toastBackgroundColor?: string;
  toastTextColor?: string;
  toastOpacity?: number;
  toastShadowColor?: string;
  toastOnShow?: () => void;
  onCopySuccess?: (text: string) => void;
  onCopyError?: (error: Error) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

const convertPosition = (position?: string) => {
  switch ((position || '').toLowerCase()) {
    case 'top':
      return Toast.positions.TOP;
    case 'center':
      return Toast.positions.CENTER;
    default:
      return Toast.positions.BOTTOM;
  }
};

const ClipboardToast: React.FC<ClipboardToastProps> = ({
  textToShow,
  textToCopy,
  toastText = 'Text is copied',
  containerStyle,
  textStyle,
  id,
  accessibilityLabel,
  toastDuration = 750,
  toastPosition,
  toastDelay = 0,
  toastAnimation = true,
  toastHideOnPress = true,
  toastBackgroundColor,
  toastTextColor,
  toastOpacity,
  toastShadowColor,
  toastOnShow,
  onCopySuccess,
  onCopyError,
  disabled = false,
  children,
}) => {
  const onCopyToClipBoard = useCallback(() => {
    try {
      Clipboard.setString(textToCopy);

      const toast = Toast.show(toastText, {
        duration: toastDuration + toastDelay,
        position: convertPosition(toastPosition),
        shadow: true,
        animation: toastAnimation,
        hideOnPress: toastHideOnPress,
        delay: toastDelay,
        backgroundColor: toastBackgroundColor,
        textColor: toastTextColor,
        opacity: toastOpacity,
        shadowColor: toastShadowColor,
        onShow: toastOnShow,
      });

      setTimeout(() => {
        Toast.hide(toast);
      }, toastDuration + toastDelay);

      onCopySuccess?.(textToCopy);
    } catch (error) {
      onCopyError?.(error as Error);
    }
  }, [
    textToCopy,
    toastText,
    toastDuration,
    toastDelay,
    toastPosition,
    toastAnimation,
    toastHideOnPress,
    toastBackgroundColor,
    toastTextColor,
    toastOpacity,
    toastShadowColor,
    toastOnShow,
    onCopySuccess,
    onCopyError,
  ]);

  return (
    <TouchableOpacity
      key={id}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      style={containerStyle}
      onPress={onCopyToClipBoard}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {children ?? <Text style={textStyle}>{textToShow}</Text>}
    </TouchableOpacity>
  );
};

export default ClipboardToast;
