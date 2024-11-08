import React from "react";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import SessionProvider from "../contexts/SessionContext";
import { RaceProvider } from "../contexts/RaceContext";

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
        <RaceProvider>
          <SafeAreaView className="h-full font-thin">
            <Slot />
          </SafeAreaView>
        </RaceProvider>
      </SessionProvider>
    </PaperProvider>
  );
};

export default Layout;
