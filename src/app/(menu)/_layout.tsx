import React from "react";
import { Slot } from "expo-router";
import { View } from "react-native";
import Navbar from "../../components/Navbar";
import { PaperProvider, useTheme } from "react-native-paper";

const Layout = () => {
  const theme = useTheme()

  return (
    <PaperProvider theme={theme}>
      <View className="h-full">
        <View className="h-[92%]">
          <Slot />
        </View>
        <View className="h-[8%]">
          <Navbar />
        </View>
      </View>
    </PaperProvider>
  );
};

export default Layout;
