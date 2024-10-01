import React, { useEffect, useState } from "react";
import SessionContext, { Session, SessionContextType } from "../components/SessionContext";
import { router, Slot } from "expo-router";
import { View } from "react-native";

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
      if (session.token === "") {
        router.push("/login");
      }
    };

    checkSession();
  }, [session]);

  return (
    <SessionContext.Provider value={contextValue} >
      <View className="font-thin h-full">
        <Slot />
      </View>
    </SessionContext.Provider>
  );
};

export default Layout;
