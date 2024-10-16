import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Icon, useTheme } from "react-native-paper";

export default function LastRunsList() {

    const theme = useTheme()
    const iconsSize = 18

    type Register = {
        model: string;
        plate: string;
        startDate: string;
        endDate: string;
        kmTraveled: number;
        violations: number;
        aproved: boolean
    };

    const [data, setData] = useState<Register[]>([
        {
            model: "Corolla",
            plate: "ABC-1234",
            startDate: "28/08",
            endDate: "29/08",
            kmTraveled: 5000,
            violations: 0,
            aproved: false
        },
        {
            model: "Civic",
            plate: "ABC-1234",
            startDate: "28/08",
            endDate: "29/08",
            kmTraveled: 6000,
            violations: 1,
            aproved: false
        },
        {
            model: "Fusion",
            plate: "ABC-1234",
            startDate: "28/08",
            endDate: "29/08",
            kmTraveled: 4000,
            violations: 2,
            aproved: true
        },
        {
            model: "Corvette",
            plate: "ABC-1234",
            startDate: "28/08",
            endDate: "29/08",
            kmTraveled: 3000,
            violations: 3,
            aproved: true
        },
        {
            model: "Golf",
            plate: "ABC-1234",
            startDate: "28/08",
            endDate: "29/08",
            kmTraveled: 4500,
            violations: 1,
            aproved: true
        },
        {
            model: "Palio",
            plate: "ABC-1234",
            startDate: "28/08",
            endDate: "29/08",
            kmTraveled: 2000,
            violations: 4,
            aproved: false
        },
        {
            model: "Fiesta",
            plate: "ABC-1234",
            startDate: "28/08",
            endDate: "29/08",
            kmTraveled: 1000,
            violations: 5,
            aproved: true
        },
        {
            model: "Fusca",
            plate: "ABC-1234",
            startDate: "28/08",
            endDate: "29/08",
            kmTraveled: 2000,
            violations: 4,
            aproved: false
        },
        {
            model: "Camaro",
            plate: "ABC-1234",
            startDate: "28/08",
            endDate: "29/08",
            kmTraveled: 1000,
            violations: 5,
            aproved: true
        },
        {
            model: "Focus",
            plate: "ABC-1234",
            startDate: "28/08",
            endDate: "29/08",
            kmTraveled: 2000,
            violations: 4,
            aproved: false
        },
        {
            model: "320I",
            plate: "ABC-1234",
            startDate: "28/08",
            endDate: "29/08",
            kmTraveled: 1000,
            violations: 5,
            aproved: false
        }
    ]);


    return (<>
        <ScrollView className="p-3 my-4 w-full max-h-full">
            {data &&
                data.map((register: Register) => (
                    <View
                        key={register.model}
                        className="shadow-sm shadow-foreground bg-background items-center py-2 px-2 my-2 border border-foreground rounded-xl"
                    >
                        <View className="w-full flex-row items-start justify-between">
                            <View className="flex-row items-center mb-1">
                                <Icon color={theme.colors.primary} size={30} source="car" />
                                <Text className="text-2xl ml-1 font-semibold">
                                    {register.model}
                                </Text>
                            </View>
                            <View className={` ${register.aproved ? "bg-green-400" : "bg-red-400"} rounded-full px-2`}>
                                <Text className="text-md font-extralight mb-1">
                                    {register.aproved ? "aprovado" : "aguardando"}
                                </Text>
                            </View>
                        </View>
                        <View className="flex-row w-full justify-around ">
                            <View className="flex-1 items-start">
                                <View className="flex-row items-center">
                                    <Icon color={theme.colors.primary} size={iconsSize} source="card-text-outline" />
                                    <Text className="text-md ml-1">
                                        {register.plate}
                                    </Text>
                                </View>
                                <View className="flex-row items-center">
                                    <Icon color={theme.colors.primary} size={iconsSize} source="alert-circle-outline" />
                                    <Text className="text-md ml-1">
                                        <Text className="font-semibold" >Infrações:</Text> {register.violations}
                                    </Text>
                                </View>
                            </View>
                            <View className=" flex-1 items-start ">

                                <View className="flex-row items-center">
                                    <Icon color={theme.colors.primary} size={iconsSize} source="ray-start-arrow" />
                                    <Text className="text-md ml-1">
                                        <Text className="font-semibold" >Início:</Text> {register.startDate}
                                    </Text>
                                </View>
                                <View className="flex-row items-center">
                                    <Icon color={theme.colors.primary} size={iconsSize} source="ray-end" />
                                    <Text className="text-md ml-1">
                                        <Text className="font-semibold" >Fim:</Text> {register.endDate}
                                    </Text>
                                </View>
                                <View className="flex-row items-center">
                                    <Icon color={theme.colors.primary} size={iconsSize} source="map-marker-distance" />
                                    <Text className="text-md ml-1">
                                        <Text className="font-semibold" >Percorrido:</Text> {register.kmTraveled}Km
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
        </ScrollView>
    </>)
}