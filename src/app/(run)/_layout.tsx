import React, { useEffect, useState } from "react";
import { router, Slot } from "expo-router";
import { Platform, View } from "react-native";
import { PaperProvider, useTheme } from "react-native-paper";

const Layout = () => {
    const theme = useTheme()

    return (
        <PaperProvider theme={theme}>
            <View className="h-full">
                <Slot />
            </View>
        </PaperProvider>
    );
};

export default Layout;
