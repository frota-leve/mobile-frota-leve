import axios from "axios";
import { CameraCapturedPicture } from "expo-camera";

const baseURL = process.env.EXPO_PUBLIC_API_URL;

class RaceService {
    static async startRace(body: { employeeId: string, carId: string, token: string }) {

        const params = { employeeId: body.employeeId, carId: body.carId }
        const route = `${baseURL}/api/races`;
        const headers = {
            headers: {
                Authorization: `Bearer ${body.token}`
            }
        }
        try {
            const response = await axios.post(route, params, headers);
            const data = await response.data;
            return data;
        } catch (error) {
            throw console.error("Error while Starting Race, error: ", error);
        }
    }

    static async endRace(body: { raceId: string, finalMileage: number, file: CameraCapturedPicture, token: string }) {

        const route = `${baseURL}/api/races/finish/${body.raceId}?finalMileage=${body.finalMileage}`;

        const headers = {
            headers: {
                Authorization: `Bearer ${body.token}`,
                'Content-Type': 'multipart/form-data'
            }
        }

        const filename = body.file.uri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        const formData = new FormData();
        if (!body.file.base64) return
        formData.append('file', {
            uri: body.file.uri,
            name: filename,
            type: type,
        });

        try {
            const response = await axios.put(route, formData, headers);

            const data = await response.data;
            return data;
        } catch (error) {
            console.error("Error while Ending Race, error: ", error);
            throw error
        }
    }

    static async getRaces(body: { token: string, page?: number, size?: number }) {
        const route = `${baseURL}/api/races/me?page=${body.page || 0}&size=${body.size || 10}`;
        
        const headers = {
            headers: {
                Authorization: `Bearer ${body.token}`
            }
        }

        console.log("console token", headers);

        try {
            const response = await axios.get(route, headers);
            const data = await response.data;
            console.log("Dados das corridas encontrados:", data);
            return data;
        } catch (error) {
            console.error("Erro ao buscar corridas:", error);
            throw error;
        }
    }
}

export default RaceService;
