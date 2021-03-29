import * as React from 'react';
import { StyleSheet, View, Text, Clipboard, Image } from 'react-native';
import ClipboardToast from 'react-native-clipboard-toast';

console.disableYellowBox = true;

export default function App() {
  const [copiedText, setCopiedText] = React.useState<string | undefined>(
    'Nothing to show, copy by clicking on some button'
  );

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 150, height: 150, marginTop: 65 }}
        source={require('../src/clipboard-toast-icon.png')}
      />

      <View style={styles.buttonContainer}>
        <ClipboardToast
          textToShow={`Top toast with 1 second delay`}
          textToCopy={'Top text'}
          toastText={'Text copied to clipboard!'}
          id={'top'}
          containerStyle={styles.clipboardToastContainer}
          textStyle={[styles.clipboardText, { color: '#223345' }]}
          accessibilityLabel={'click me to copy'}
          toastPosition={'top'}
          toastDelay={1000}
          toastOnShow={fetchCopiedText}
        />
      </View>

      <View style={styles.buttonContainer}>
        <ClipboardToast
          textToShow={
            'Center toast with 2 second duration and background color'
          }
          textToCopy={'Center Text'}
          toastText={'Text copied to clipboard!'}
          id={'center'}
          containerStyle={styles.clipboardToastContainer}
          textStyle={[styles.clipboardText, { color: '#FE434C' }]}
          toastPosition={'center'}
          toastDuration={2000}
          accessibilityLabel={'click me to copy'}
          toastBackgroundColor="#FE434C"
          toastOnShow={fetchCopiedText}
        />
      </View>

      <View style={styles.buttonContainer}>
        <ClipboardToast
          textToShow={
            'Bottom toast with 5 second duration and text & background color'
          }
          textToCopy={'Bottom Text With Color'}
          toastText={'Text copied to clipboard!'}
          id={'bottom_color'}
          containerStyle={styles.clipboardToastContainer}
          textStyle={[styles.clipboardText, { color: '#681' }]}
          toastPosition={'bottom'}
          toastDuration={5000}
          accessibilityLabel={'click me to copy'}
          toastTextColor="#681"
          toastBackgroundColor="#fff"
          toastOnShow={fetchCopiedText}
        />
      </View>

      <View style={styles.buttonContainer}>
        <ClipboardToast
          textToShow={'Bottom toast'}
          textToCopy={'Bottom Text'}
          toastText={'Text copied to clipboard!'}
          id={'bottom'}
          containerStyle={styles.clipboardToastContainer}
          textStyle={[styles.clipboardText, { color: '#746432' }]}
          accessibilityLabel={'click me to copy'}
          toastOnShow={fetchCopiedText}
        />
      </View>

      <Text
        style={{ flex: 1, fontSize: 22, width: 300, textAlign: 'center' }}
      >{`Copied Text:\n${copiedText}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFeee',
    // margin: 30,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 25,
  },
  buttonContainer: {
    width: 250,
    flex: 1,
    justifyContent: 'center',
  },
  clipboardToastContainer: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5,
  },
  clipboardText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
