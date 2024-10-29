import React from "react";
import { Alert, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Button, Icon, useTheme } from "react-native-paper";
import { useSession } from "../../../contexts/SessionContext";
import { useCar } from "../../../hooks/useCar";

const Index = () => {
    const params = useLocalSearchParams();
    const { session } = useSession()
    const token = session.token ?? ''
    const plate = params.plate
    const dateString = params.dateString as string
    const car = useCar({ plate: plate, token: token } as { plate: string, token: string });
    const theme = useTheme();
    const iconsSize = 24;

    const confirmEndRun = () => {
        Alert.alert("Deseja Realmente Finalizar a Corrida?", "", [
            { text: "Não" },
            {
                text: "Sim", onPress: () => {
                    handleEndRun()
                }
            },
        ]);
    }

    const handleEndRun = () => {
        router.navigate({ pathname: '/end-run', params: { plate: plate, formattedDate: formattedDate, formattedTime: formattedTime } });
    };

    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const formattedDate = `${day}/${month}`;
    const formattedTime = `${hours}:${minutes}`;

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
                                <Text className="text-5xl ml-1 font-bold">{car.model}</Text>
                            </View>
                            <View className="flex-row items-center">
                                <Icon
                                    color={theme.colors.primary}
                                    size={iconsSize}
                                    source="card-text-outline"
                                />
                                <Text className="text-xl font-semibold ml-1">{car.plate}</Text>
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
                                    <Text className="font-semibold">Início:</Text> {formattedDate} {formattedTime}
                                </Text>
                            </View>
                            <View className="flex-row items-center">
                                <Icon
                                    color={theme.colors.primary}
                                    size={iconsSize}
                                    source="card-account-details"
                                />
                                <Text className="text-md ml-1">
                                    <Text className="font-semibold">Motorista:</Text> {session.name}
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
