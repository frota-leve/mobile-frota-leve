import React, { useEffect, useState } from "react";
import SessionContext from "../components/SessionContext";
import { router, Slot } from "expo-router";
import { View } from "react-native";
import Navbar from "../components/Navbar";

const Layout = () => {
  const [session, updateSession] = useState<string>("");

  useEffect(() => {
    const checkSession = () => {
      if (session === "") {
        router.push("/login");
      }
    };

    checkSession();
  }, [session]);

  return (
    <SessionContext.Provider value={{ session, updateSession }}>
      <View className="font-thin h-full">
        <Slot />
      </View>
    </SessionContext.Provider>
  );
};

export default Layout;
