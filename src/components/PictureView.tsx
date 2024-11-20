import {
  BarcodeScanningResult,
  CameraCapturedPicture,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { router } from "expo-router";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import { useTheme, Button, Icon } from "react-native-paper";
import CarService from "../services/CarService";
import { useSession } from "../contexts/SessionContext";

export default function App({
  setState,
  setPhoto,
}: {
  setState: Dispatch<SetStateAction<boolean>>;
  setPhoto: Dispatch<SetStateAction<CameraCapturedPicture | undefined>>;
}) {
  const [flash, setFlash] = useState(false);
  const theme = useTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const { session } = useSession();
  const cameraRef = useRef<CameraView>(null);
  const [loading, setLoading] = useState<boolean>(false);

  if (!permission) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center font-extralight pb-5">
          Carregando Permissões
        </Text>
        <Icon color={theme.colors.primary} size={42} source="loading" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center font-extralight w-[50%] pb-5">
          É necessário permitir o acesso a Câmera
        </Text>
        <Button
          className="w-[50%] mt-8"
          theme={theme}
          icon="cctv"
          mode="contained"
          onPress={requestPermission}
        >
          Permitir Acesso
        </Button>
      </View>
    );
  }

  const handleTakePicture = async () => {
    try {
      if (cameraRef.current) {
        setLoading(true);
        const photoData = await cameraRef.current.takePictureAsync({
          base64: true,
        });
        setPhoto(photoData);
      }
      Alert.alert("Foto Tirada", "Foto tirada com sucesso");
    } catch (error) {
      Alert.alert("Erro!", "Ocorreu um erro ao tirar a foto, tente novamente");
    } finally {
      setLoading(false);
      setState(false);
    }
  };

  const handleCancel = () => {
    setState(false);
  };

  const handleResult = async (result: BarcodeScanningResult) => {
    if (!result.data) return;

    const plate = result.data;
    const token = session.token ?? "token";

    const params = { plate: plate, token: token };

    try {
      const car = await CarService.getCar(params);
      if (car) {
        router.navigate({
          pathname: "/confirm-start-run",
          params: { plate: plate },
        });
        return;
      }
    } catch (error) {
      Alert.alert(
        "QR Code Inválido",
        "Veículo não encontrado na base de dados"
      );
      throw console.error("erro ao buscar veículo com qr code: ", error);
    }
  };

  return (
    <View className="flex-1 justify-center w-full">
      <CameraView
        className="flex-1"
        facing="back"
        enableTorch={flash}
        ref={cameraRef}
      >
        <View className="w-[100%] flex-row h-full items-end justify-evenly py-2">
          <Button
            className="w-[40%] mt-8"
            theme={theme}
            icon="cancel"
            mode="contained"
            disabled={loading}
            onPress={handleCancel}
          >
            Cancelar
          </Button>
          <Button
            className="w-[40%] mt-8"
            theme={theme}
            loading={loading}
            icon="camera-enhance-outline"
            mode="contained"
            onPress={handleTakePicture}
          >
            { loading ? 'Anexando...'
              : 'Tirar Foto'
            }
          </Button>
        </View>
      </CameraView>
    </View>
  );
}
