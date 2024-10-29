import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Button, Icon, useTheme } from "react-native-paper";
import { useCar } from "../../../hooks/useCar";
import { useSession } from "../../../contexts/SessionContext";
import * as ImagePicker from 'expo-image-picker';

const Index = () => {
    const [image, setImage] = useState<string | null>(null);
    const params = useLocalSearchParams();
    const { session } = useSession()
    const token = session.token ?? ''
    const plate = params.plate
    const startDate = params.formattedDate as string
    const startTime = params.formattedTime as string
    const car = useCar({ plate: plate, token: token } as { plate: string, token: string });
    const theme = useTheme();
    const iconsSize = 24;

    const confirmEndRun = () => {
        Alert.alert("Deseja Realmente Finalizar a Corrida?", "", [
            { text: "Não" },
            { text: "Sim", onPress: () => (handleEndRun) },
        ]);
    }

    const handleEndRun = () => {
        // router.push('/end-run')
    };


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };




    const handleAddEvidence = () => {
        pickImage()
    }




    const date = new Date();

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
                        Finalizar Corrida
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
                        <View className="w-full px-2">
                            <View className="w-full flex-row justify-between">
                                <View className="flex-row items-center">
                                    <Icon
                                        color={theme.colors.primary}
                                        size={iconsSize}
                                        source="ray-start-arrow"
                                    />
                                    <Text className="text-md ml-1">
                                        <Text className="font-semibold">Início:</Text> {startDate} {startTime}
                                    </Text>
                                </View>
                                <View className="flex-row items-center">
                                    <Icon
                                        color={theme.colors.primary}
                                        size={iconsSize}
                                        source="ray-end"
                                    />
                                    <Text className="text-md ml-1">
                                        <Text className="font-semibold">Fim:</Text> {formattedDate} {formattedTime}
                                    </Text>
                                </View>
                            </View>
                            <View className="w-full items-start">
                                <View className="flex-row items-center justify-center">
                                    <Icon
                                        color={theme.colors.primary}
                                        size={iconsSize}
                                        source="card-account-details"
                                    />
                                    <Text className="text-md ml-1">
                                        <Text className="font-semibold">Motorista:</Text> {session.name}
                                    </Text>
                                </View>
                                <View className="flex-row items-center justify-center">
                                    <Icon
                                        color={theme.colors.primary}
                                        size={iconsSize}
                                        source="file-image"
                                    />
                                    <Text className="text-md ml-1 mr-4">
                                        <Text className="font-semibold">Evidência:</Text>
                                    </Text>
                                    <Icon
                                        color={theme.colors.primary}
                                        size={iconsSize}
                                        source="card-account-details"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className="gap-y-2">

                        <Button
                            className="w-full"
                            theme={theme}
                            icon="file-image-plus"
                            mode="contained"
                            onPress={handleAddEvidence}
                        >
                            Anexar Evidência
                        </Button>
                        <Button
                            className="w-full"
                            theme={theme}
                            icon="send-circle"
                            mode="contained"
                            onPress={confirmEndRun}
                        >
                            Confirmar Finalizar
                        </Button>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Index;
