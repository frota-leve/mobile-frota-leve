import React, { useState } from "react";
import { ActivityIndicator, Alert, Text, View, Image, Keyboard } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Button, Icon, TextInput, useTheme } from "react-native-paper";
import { useSession } from "../../../contexts/SessionContext";
import PictureView from "../../../components/PictureView";
import RaceService from "../../../services/RaceService";
import { CameraCapturedPicture } from "expo-camera";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

const Index = () => {
  const params = useLocalSearchParams();
  const { session } = useSession();
  const token = session.token ?? "";
  const [finalMileage, setFinalMileage] = useState("");
  const [cameraView, setCameraView] = useState(false);
  const theme = useTheme();
  const iconsSize = 24;
  const [photo, setPhoto] = useState<CameraCapturedPicture | undefined>(
    undefined
  );
  const { raceId, startAt, startMileage }: any = params;
  const [loadingEndRun, setLoadingEndRun] = useState<boolean>(false);

  const handleEndRun = async () => {
    if (!raceId || !photo) return;

    const body = {
      raceId,
      finalMileage: Number(finalMileage),
      file: photo,
      token: token,
    };

    try {
      setLoadingEndRun(true);
      await RaceService.endRace(body);
      Alert.alert("Sucesso!", "Corrida Finalizada!");
      router.push("/");
    } catch (error) {
      Alert.alert("Erro!", "Erro ao Finalizar Corrida!");
      console.error("Error ", error);
    } finally {
      setLoadingEndRun(false);
    }
  };

  const handleAddEvidence = () => {
    Keyboard.dismiss();
    setCameraView(true);
  };

  return (
    <View className="flex-1 w-[100%]  items-center">
      <View className="w-[90%] flex-1  items-center">
        <View className="flex-1 w-full justify-center relative ">
          <View className="shadow-sm w-full shadow-foreground bg-background items-center  py-6 px-2 my-2 border border-foreground rounded-xl">
            <View className="w-full px-2 gap-y-3">
              <View className="w-full flex-row justify-between">
                <View className="flex-row items-center bg--300 w-[50%]">
                  <Icon
                    color={theme.colors.primary}
                    size={iconsSize}
                    source="ray-start-arrow"
                  />
                  <Text className="text-md ml-1">
                    <Text className="font-semibold">
                      Início: {startAt ? format(startAt, 'dd/MM/yyy HH:mm', { locale: ptBR }) : ''}
                    </Text>
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
                    <Text className="font-semibold">
                      KM Inicial: { startMileage } KM
                    </Text>
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
                    onChangeText={(mileage) => setFinalMileage(mileage)}
                  />
                </View>
              </View>
              <View className="w-full flex-row items-start">
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
                    {
                      photo ? <Image source={{uri: photo?.uri}} style={{width: 100, height: 100}} />
                        : <Icon
                            color={photo ? "green" : "red"}
                            size={iconsSize}
                            source={photo ? "check-circle" : "close-circle"}
                          />
                    }
                    
                    {/* <Icon
                      color={photo ? "green" : "red"}
                      size={iconsSize}
                      source={photo ? "check-circle" : "close-circle"}
                    /> */}
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
              icon="send"
              mode="contained"
              disabled={!photo || loadingEndRun}
              loading={loadingEndRun}
              onPress={handleEndRun}
            >
              Finalizar
            </Button>
          </View>
        </View>
        {cameraView && (
          <View className="absolute w-full h-full justify-center items-center ">
            <View className="w-full justify-center items-center h-[50%] border-2 border-primary">
              <PictureView setState={setCameraView} setPhoto={setPhoto} />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Index;
