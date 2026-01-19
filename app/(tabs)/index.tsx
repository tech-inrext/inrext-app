import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function HomeScreen() {
  // Replace this URL with your website URL
  const WEBSITE_URL = 'https://dashboard.inrext.com';

  return (
    <View style={styles.container}>
      <WebView 
        source={{ uri: WEBSITE_URL }}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
