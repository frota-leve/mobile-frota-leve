import React, { useEffect, useState } from "react";
import { router, Slot } from "expo-router";
import { View } from "react-native";
import SessionContext from "../../components/SessionContext";
import Navbar from "../../components/Navbar";

const Layout = () => {
  const [session, updateSession] = useState<string>("");

  return (
    <SessionContext.Provider value={{ session, updateSession }}>
      <View className="h-full">
        <View className="h-[90%]">
          <Slot />
        </View>
        <View className="h-[10%]">
          <Navbar />
        </View>
      </View>
    </SessionContext.Provider>
  );
};

export default Layout;
