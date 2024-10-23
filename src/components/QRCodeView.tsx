import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { useTheme, Button, Icon } from 'react-native-paper';
import { useCar } from '../hooks/useCar';

export default function App() {
    const [flash, setFlash] = useState(false);
    const theme = useTheme()
    const { car, setPlate } = useCar()
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        return <View className='flex-1 justify-center items-center'>
            <Text className='text-center font-extralight pb-5'>Carregando Permissões</Text>
            <Icon color={theme.colors.primary} size={42} source="loading" />
        </View>;
    }

    if (!permission.granted) {
        return (
            <View className='flex-1 justify-center items-center'>
                <Text className='text-center font-extralight w-[50%] pb-5'>É necessário permitir o acesso a Câmera</Text>
                <Button className="w-[50%] mt-8" theme={theme} icon="cctv" mode="contained" onPress={requestPermission}>
                    Permitir Acesso
                </Button>
            </View>
        );
    }

    const handleFlash = () => {
        setFlash(!flash);
        const result = { data: 'ABC1234' } as BarcodeScanningResult
        handleResult(result)
    }

    const handleResult = (result: BarcodeScanningResult) => {
        const plate = 'ABC0X20'
        setPlate(plate)
        try {
            if (car) {
                router.navigate({ pathname: '/confirm-start-run', params: { plate: plate } });
            }

        } catch (error) {
            Alert.alert('Erro', 'QR Code Inválido')
            throw console.error("Error while handlering result, error: ", error);
        }
    }

    return (
        <View className='flex-1 justify-center'>
            <CameraView className="flex-1" facing="back" enableTorch={flash} onBarcodeScanned={handleResult}>
                <View className="w-[100%] h-full items-center justify-end py-2">
                    <Button className="w-[50%] mt-8" theme={theme} icon={flash ? "flash-off" : "flash"} mode="contained" onPress={handleFlash}>
                        {flash ? "Desligar Flash" : "Ligar Flash"}
                    </Button>
                </View>
            </CameraView>
        </View>
    );
}

