import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const WEBSITE_URL = "https://dashboard.inrext.com";

  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>WebView removed for crash test</Text>
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
  placeholder: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
