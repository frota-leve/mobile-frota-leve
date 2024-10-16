import React from "react";
import { router, Slot } from "expo-router";
import { SafeAreaView } from "react-native";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import SessionProvider from "../contexts/SessionContext";

const Layout = () => {

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#FFC314",
      onPrimary: "#060606",
      secondary: "#FFDC78",
      foreground: "#E0E0E0",
      background: "#fff",
    },
  };

  return (
    <PaperProvider theme={theme}>
      <SessionProvider>
        <SafeAreaView className="h-full font-thin">
          <Slot />
        </SafeAreaView>
      </SessionProvider>
    </PaperProvider>
  );
};

export default Layout;
