import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Icon, useTheme } from "react-native-paper";

export default function LastRunsList() {

    const theme = useTheme()

    type Register = {
        model: string;
        plate: string;
        startDate: string;
        endDate: string;
        kmTraveled: number;
        violations: number;
    };

    const [data, setData] = useState<Register[]>([
        {
            model: "Corolla",
            plate: "ABC-1234",
            startDate: "28/08",
            endDate: "29/08",
            kmTraveled: 5000,
            violations: 0,
        },
        {
            model: "Civic",
            plate: "ABC-1234",
            startDate: "28/08",
            endDate: "29/08",
            kmTraveled: 6000,
            violations: 1,
        },
        {
            model: "Fusion",
            plate: "ABC-1234",
            startDate: "28/08",
            endDate: "29/08",
            kmTraveled: 4000,
            violations: 2,
        },
        {
            model: "Corvette",
            plate: "ABC-1234",
            startDate: "28/08",
            endDate: "29/08",
            kmTraveled: 3000,
            violations: 3,
        },
        {
            model: "Golf",
            plate: "ABC-1234",
            startDate: "28/08",
            endDate: "29/08",
            kmTraveled: 4500,
            violations: 1,
        },
    ]);


    return (<>
        <ScrollView className=" w-full max-h-[70%]">
            {data &&
                data.map((register: Register) => (
                    <View
                        key={register.model}
                        className="flex-row justify-around items-center py-2 px-2 my-2 bg-secondary rounded-xl"
                    >
                        <View className=" w-[40%] items-start">
                            <View className="flex-row items-center">
                                <Icon size={20} source="car" />
                                <Text className="text-2xl ml-1 font-semibold">
                                    {register.model}
                                </Text>
                            </View>
                            <Text className="text-md font-extralight">
                                {register.plate}
                            </Text>
                            <Text className="text-md font-extralight">
                                Infrações: {register.violations}
                            </Text>
                        </View>
                        <View className="ml-3 w-[50%] items-start">
                            <Text className="text-lg font-extralight">
                                Início: {register.startDate}
                            </Text>
                            <Text className="text-lg font-extralight">
                                Fim: {register.endDate}
                            </Text>
                            <Text className="text-lg font-extralight">
                                Percorrido: {register.kmTraveled}Km
                            </Text>
                        </View>
                    </View>
                ))}
        </ScrollView>
    </>)
}