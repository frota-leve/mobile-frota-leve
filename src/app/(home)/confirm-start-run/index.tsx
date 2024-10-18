import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { useSession } from "../../../contexts/SessionContext";
import { Button, useTheme } from "react-native-paper";
import { CameraView, useCameraPermissions } from "expo-camera";


const Index = () => {
    const theme = useTheme()

    const handleCancel = () => {
        router.replace("/");
    };

    return (
        <View className="flex-1 w-[100%]  items-center">
            <View className="w-[90%] flex-1  items-center ">
                <View className="w-full items-center">
                    <Text className="text-2xl font-extralight mb-10">
                        Confirmar Início de Corrida
                    </Text>
                </View>
                <View className="w-full flex-row h-full flex-1">
                    <View className="flex-1 bg-blue-500 p-4">

                    </View>
                    <View className="flex-1 bg-red-500 p-4">

                    </View>
                </View>
            </View>
            <View className="w-[90%] items-center justify-end py-2">
                <Button className="w-full" theme={theme} icon="close-circle-outline" mode="contained" onPress={handleCancel}>
                    Cancelar
                </Button>
            </View>
        </View>
    );
};

export default Index;
