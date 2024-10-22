import React from "react";
import { Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Button, Icon, useTheme } from "react-native-paper";
import { useCar } from "../../../hooks/useCar";

const Index = () => {
    const params = useLocalSearchParams();
    const plate = params.plate
    const car = useCar({ plate: plate } as { plate: string });
    const theme = useTheme()
    const iconsSize = 24

    const handleCancel = () => {
        router.replace("/");
    };

    const handleConfirmStartRun = () => {
        router.replace("/run-in-progress")
    }



    return (
        <View className="flex-1 w-[100%]  items-center">
            <View className="w-[90%] flex-1  items-center ">
                <View className="w-full items-center">
                    <Text className="text-2xl font-extralight mb-10">
                        Confirmar Início de Corrida
                    </Text>
                </View>
                <View className="flex-1 w-full justify-center">

                    <View
                        className="shadow-sm w-full shadow-foreground bg-background items-center  py-6 px-2 my-2 border border-foreground rounded-xl"
                    >
                        <View className=" w-full items-center py-4">
                            <View className="flex-row ">
                                <Icon color={theme.colors.primary} size={42} source="car" />
                                <Text className="text-5xl ml-1 font-bold">
                                    {car.model}
                                </Text>
                            </View>
                            <View className="flex-row items-center">
                                <Icon color={theme.colors.primary} size={iconsSize} source="card-text-outline" />
                                <Text className="text-xl font-semibold ml-1">
                                    ABC-1234
                                </Text>
                            </View>
                        </View>
                        <View className="w-full px-4">

                            <View className="flex-row items-center">
                                <Icon color={theme.colors.primary} size={iconsSize} source="ray-start-arrow" />
                                <Text className="text-md ml-1">
                                    <Text className="font-semibold" >Data:</Text> 23/08
                                </Text>
                            </View>
                            <View className="flex-row items-center">
                                <Icon color={theme.colors.primary} size={iconsSize} source="card-account-details" />
                                <Text className="text-md ml-1">
                                    <Text className="font-semibold" >Motorista:</Text> Davi Taveira
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Button className="w-full" theme={theme} icon="car-traction-control" mode="contained" onPress={handleConfirmStartRun}>
                        Iniciar
                    </Button>
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
