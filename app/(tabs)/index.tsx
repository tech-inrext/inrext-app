import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  BackHandler,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

export default function HomeScreen() {
  const WEBSITE_URL = "https://dashboard.inrext.com";
  const source = useMemo(() => ({ uri: WEBSITE_URL }), [WEBSITE_URL]);
  const webRef = useRef<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const onBack = () => {
      if (canGoBack && webRef.current) {
        webRef.current.goBack();
        return true;
      }
      return false;
    };
    const sub = BackHandler.addEventListener("hardwareBackPress", onBack);
    return () => sub.remove();
  }, [canGoBack]);

  const handleReload = useCallback(() => {
    setError(null);
    webRef.current?.reload();
  }, []);

  if (!WEBSITE_URL) {
    return (
      <View style={styles.container}>
        <Text style={styles.placeholder}>No URL provided</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.placeholder}>{error}</Text>
        <Button title="Retry" onPress={handleReload} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        ref={webRef}
        source={source}
        style={styles.webview}
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={(e) =>
          setError(e.nativeEvent?.description || "Failed to load page")
        }
        onNavigationStateChange={(navState) =>
          setCanGoBack(!!navState.canGoBack)
        }
        originWhitelist={["https://*"]}
        javaScriptEnabled
        sharedCookiesEnabled
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
  placeholder: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
  },
  loading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
