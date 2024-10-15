import React, { useEffect, useState } from "react";
import { router, Slot } from "expo-router";
import { View } from "react-native";
import SessionContext from "../../contexts/SessionContext";
import Navbar from "../../components/Navbar";
import { PaperProvider, useTheme } from "react-native-paper";

const Layout = () => {
  const theme = useTheme()

  return (
    <PaperProvider theme={theme}>
      <View className="h-full">
        <View className="h-[93%]">
          <Slot />
        </View>
        <View className="h-[7%]">
          <Navbar />
        </View>
      </View>
    </PaperProvider>
  );
};

export default Layout;
