import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme, PermissionsAndroid } from "react-native";
// import { OneSignal, LogLevel } from "react-native-onesignal";
import Constants from "expo-constants";


SplashScreen.preventAutoHideAsync();
// OneSignal.initialize(Constants?.expoConfig?.extra?.oneSignalAppId);
// OneSignal.Notifications.requestPermission(true);

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    PoppinsSemiBold: require("../assets/font/Poppins-SemiBold.ttf"),
    PoppinsRegular: require("../assets/font/Poppins-Regular.ttf"),
    Oke: require("../assets/font/PlaywriteDEVAGuides-Regular.ttf"),
    // PoppinsBold : require("../assets/font/Poppins-Bold.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="history" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </>
  );
}
