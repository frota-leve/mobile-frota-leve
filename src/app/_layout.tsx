import React, { useEffect, useState } from "react";
import SessionContext, { Session, SessionContextType } from "../components/SessionContext";
import { router, Slot } from "expo-router";
import { View } from "react-native";
import { DefaultTheme, PaperProvider } from "react-native-paper";

const Layout = () => {
  const [session, updateToken] = useState<Session>(() => {return {token: null}});
  
  const updateSession = (token: string | null) => {
    updateToken({ token });
  }
  const contextValue:SessionContextType = {
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
        <View className="font-thin h-full">
          <Slot />
        </View>
      </SessionContext.Provider>
    </PaperProvider>
  );
};

export default Layout;
