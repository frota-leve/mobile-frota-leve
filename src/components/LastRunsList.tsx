import { useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { Icon, useTheme } from "react-native-paper";
import RaceService from "../services/RaceService";
import { useSession } from '../contexts/SessionContext';

export default function LastRunsList() {
    const { session } = useSession();
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

    const [data, setData] = useState<Register[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRaces = async () => {
            try {
                if (!session.token) {
                    console.error("Token não encontrado");
                    return;
                }
                const response = await RaceService.getRaces({ token: session.token });
                setData(response.content);
            } catch (error: any) {
                if (error?.response?.status === 403) {
                    console.error("Sessão expirada ou token inválido");

                } else {
                    console.error("Erro ao carregar corridas:", error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchRaces();
    }, [session.token]);

    if (loading) {
        return <Text>Carregando...</Text>;
    }

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
                        <View className="flex-row  w-full justify-around ">
                            <View className="w-[45%] items-start">
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
                            <View className="w-[55%] items-start ">

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