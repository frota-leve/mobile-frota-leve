import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Button, Icon, TextInput, useTheme } from "react-native-paper";
import { useCar } from "../../../hooks/useCar";
import { useSession } from "../../../contexts/SessionContext";
import PictureView from "../../../components/PictureView";
import RaceService from "../../../services/RaceService";
import { useRace } from "../../../contexts/RaceContext";
import { CameraCapturedPicture } from "expo-camera";

const Index = () => {
    const params = useLocalSearchParams();
    const { session } = useSession()
    const token = session.token ?? ''
    const [finalMileage, setFinalMileage] = useState('')
    const plate = params.plate
    const [cameraView, setCameraView] = useState(false);
    const startDate = params.formattedDate as string
    const startTime = params.formattedTime as string
    const car = useCar({ plate: plate, token: token } as { plate: string, token: string });
    const theme = useTheme();
    const iconsSize = 24;
    const [photo, setPhoto] = useState<CameraCapturedPicture | undefined>(undefined);
    const { raceId } = useRace()

    const handleEndRun = async () => {

        if (!raceId || !photo) return

        const body = { raceId: raceId, finalMileage: Number(finalMileage), file: photo, token: token }

        try {
            const response = await RaceService.endRace(body)
            Alert.alert('Sucesso!', 'Corrida Finalizada!')
            router.push('/')
        } catch (error) {
            Alert.alert('Erro!', 'Erro ao Finalizar Corrida!')
            console.error("Error ", error)
        }
    };

    const handleAddEvidence = () => {
        setCameraView(true)
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
            <View className="w-[90%] flex-1  items-center">
                <View className="w-full items-center">
                    <Text className="text-2xl font-extralight mb-10">
                        Finalizar Corrida
                    </Text>
                </View>
                <View className="flex-1 w-full justify-center relative ">
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
                        <View className="w-full px-2 gap-y-3">
                            <View className="w-full flex-row justify-between">
                                <View className="flex-row items-center bg--300 w-[50%]">
                                    <Icon
                                        color={theme.colors.primary}
                                        size={iconsSize}
                                        source="ray-start-arrow"
                                    />
                                    <Text className="text-md ml-1">
                                        <Text className="font-semibold">Início:</Text> {startDate} {startTime}
                                    </Text>
                                </View>
                                <View className="flex-row items-center w-[50%]">
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
                            <View className=" flex-row justify-between w-full">
                                <View className="flex-row items-center  w-[50%]">
                                    <Icon
                                        color={theme.colors.primary}
                                        size={iconsSize}
                                        source="ray-start-arrow"
                                    />
                                    <Text className="text-md ml-1">
                                        <Text className="font-semibold">Km Inicial:</Text> {car.mileage}
                                    </Text>
                                </View>
                                <View className="flex-row items-center justify-start  w-[50%]">
                                    <Icon
                                        color={theme.colors.primary}
                                        size={iconsSize}
                                        source="ray-end"
                                    />
                                    <TextInput
                                        className="ml-1 rounded-full  flex-1"
                                        // keyboardType="numeric"
                                        mode="outlined"
                                        label="Km Final"
                                        value={finalMileage}
                                        onChangeText={mileage => setFinalMileage(mileage)}
                                    />
                                </View>
                            </View>
                            <View className="w-full flex-row items-start">
                                <View className="w-[50%]">

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
                                <View className="w-[50%]">
                                    <View className="flex-row items-center">
                                        <Icon
                                            color={theme.colors.primary}
                                            size={iconsSize}
                                            source="file-image"
                                        />
                                        <Text className="text-md ml-1 mr-1">
                                            <Text className="font-semibold">Evidência:</Text>
                                        </Text>
                                        <Icon
                                            color={photo ? 'green' : 'red'}
                                            size={iconsSize}
                                            source={photo ? 'check-circle' : 'close-circle'}
                                        />
                                    </View>
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
                            disabled={!photo}
                            onPress={handleEndRun}
                        >
                            Confirmar Finalizar
                        </Button>
                    </View>
                </View>
                {cameraView &&
                    <View className="absolute w-full h-full justify-center items-center ">
                        <View className="w-full justify-center items-center h-[50%] border-2 border-primary">
                            <PictureView setState={setCameraView} setPhoto={setPhoto} />
                        </View>
                    </View>
                }
            </View>

        </View>

    );
};

export default Index;
