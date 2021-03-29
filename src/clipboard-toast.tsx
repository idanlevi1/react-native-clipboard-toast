import React from 'react';
import { TouchableOpacity, Text, Clipboard } from 'react-native';
import Toast from 'react-native-root-toast';
import PropTypes from 'prop-types';

export interface ClipboardToastProps {
  textToShow: string;
  textToCopy: string;
  toastText: string;
  containerStyle?: any;
  textStyle?: any;
  id?: any;
  accessibilityLabel?: string;
  toastDuration?: number;
  toastPosition?: string;
  toastDelay?: number;
  toastAnimation?: boolean;
  toastHideOnPress?: boolean;
  toastBackgroundColor?: any;
  toastTextColor?: any;
  toastOnShow?: any;
}

const ClipboardToast: React.FC<ClipboardToastProps> = ({
  textToShow = '',
  textToCopy = '',
  toastText = 'Text is copied',
  containerStyle = {},
  textStyle = {},
  id = 'someKey',
  accessibilityLabel,
  toastDuration = 750,
  toastPosition,
  toastDelay = 0,
  toastAnimation = true,
  toastHideOnPress = true,
  toastBackgroundColor = null,
  toastTextColor = null,
  toastOnShow = () => {},
}) => {
  const convertPosition = () => {
    switch ((toastPosition || '').toLowerCase()) {
      case 'top':
        return Toast.positions.TOP;
      case 'center':
        return Toast.positions.CENTER;
      default:
        return Toast.positions.BOTTOM;
    }
  };

  const onCopyToClipBoard = (clipboardText: string) => {
    Clipboard.setString(clipboardText);
    let toast = Toast.show(toastText, {
      duration: Toast.durations.LONG,
      position: convertPosition(),
      shadow: true,
      animation: toastAnimation,
      hideOnPress: toastHideOnPress,
      delay: toastDelay,
      backgroundColor: toastBackgroundColor,
      textColor: toastTextColor,
      onShow: toastOnShow,
    });

    setTimeout(function () {
      Toast.hide(toast);
    }, toastDuration + toastDelay);
  };

  return (
    <TouchableOpacity
      key={id}
      accessible={true}
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel}
      style={containerStyle}
      onPress={() => onCopyToClipBoard(textToCopy)}
    >
      <Text style={textStyle}>{textToShow}</Text>
    </TouchableOpacity>
  );
};

ClipboardToast.propTypes = {
  textToShow: PropTypes.string.isRequired,
  textToCopy: PropTypes.string.isRequired,
  toastText: PropTypes.string.isRequired,
  containerStyle: PropTypes.any,
  textStyle: PropTypes.any,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  accessibilityLabel: PropTypes.string,
  toastDuration: PropTypes.number,
  toastPosition: PropTypes.oneOf(['top', 'center', 'bottom']),
  toastDelay: PropTypes.number,
  toastAnimation: PropTypes.bool,
  toastHideOnPress: PropTypes.bool,
  toastBackgroundColor: PropTypes.any,
  toastTextColor: PropTypes.any,
  toastOnShow: PropTypes.func,
};

export default ClipboardToast;
