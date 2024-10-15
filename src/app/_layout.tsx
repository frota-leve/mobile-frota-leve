import React, { useEffect, useState } from "react";
import SessionContext, { Session, SessionContextType } from "../contexts/SessionContext";
import { router, Slot } from "expo-router";
import { SafeAreaView, View } from "react-native";
import { DefaultTheme, PaperProvider } from "react-native-paper";

const Layout = () => {
  const [session, updateToken] = useState<Session>(() => { return { token: null } });

  const updateSession = (token: string | null) => {
    updateToken({ token });
  }
  const contextValue: SessionContextType = {
    session,
    updateSession,
  };

  useEffect(() => {
    const checkSession = () => {
      if (!session.token) {
        router.push("/login");
      }
    };

    checkSession();
  }, [session]);

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
      <SessionContext.Provider value={contextValue} >
        <SafeAreaView className=" h-full font-thin ">
          <Slot />
        </SafeAreaView>
      </SessionContext.Provider>
    </PaperProvider>
  );
};

export default Layout;
