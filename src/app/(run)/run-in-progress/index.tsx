import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { router } from "expo-router";
import { Button, Icon, useTheme } from "react-native-paper";

const Index = () => {
    const theme = useTheme();
    const iconsSize = 24;

    const confirmEndRun = () => {
        Alert.alert("Deseja Realmente Finalizar a Corrida?", "", [
            { text: "Não" },
            { text: "Sim", onPress: () => (handleEndRun) },
        ]);
    }

    const handleEndRun = () => {
        router.push('/end-run')
    };

    return (
        <View className="flex-1 w-[100%]  items-center">
            <View className="w-[90%] flex-1  items-center ">
                <View className="w-full items-center">
                    <Text className="text-2xl font-extralight mb-10">
                        Corrida Em Andamento
                    </Text>
                </View>
                <View className="flex-1 w-full justify-center">
                    <View className="shadow-sm w-full shadow-foreground bg-background items-center  py-6 px-2 my-2 border border-foreground rounded-xl">
                        <View className=" w-full items-center py-4">
                            <View className="flex-row ">
                                <Icon color={theme.colors.primary} size={42} source="car" />
                                <Text className="text-5xl ml-1 font-bold">CELTA</Text>
                            </View>
                            <View className="flex-row items-center">
                                <Icon
                                    color={theme.colors.primary}
                                    size={iconsSize}
                                    source="card-text-outline"
                                />
                                <Text className="text-xl font-semibold ml-1">ABC-1234</Text>
                            </View>
                        </View>
                        <View className="w-full px-4">
                            <View className="flex-row items-center">
                                <Icon
                                    color={theme.colors.primary}
                                    size={iconsSize}
                                    source="ray-start-arrow"
                                />
                                <Text className="text-md ml-1">
                                    <Text className="font-semibold">Início:</Text> 23/08 08:23
                                </Text>
                            </View>
                            <View className="flex-row items-center">
                                <Icon
                                    color={theme.colors.primary}
                                    size={iconsSize}
                                    source="card-account-details"
                                />
                                <Text className="text-md ml-1">
                                    <Text className="font-semibold">Motorista:</Text> Davi Taveira
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Button
                        className="w-full"
                        theme={theme}
                        icon="stop-circle-outline"
                        mode="contained"
                        onPress={confirmEndRun}
                    >
                        Finalizar Corrida
                    </Button>
                </View>
            </View>
        </View>
    );
};

export default Index;
