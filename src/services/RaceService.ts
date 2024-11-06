import axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_API_URL;

class RaceService {
    static async startRace(body: { employeeId: string, carId: string, token: string }) {

        const params = { employeeId: body.employeeId, carId: body.carId }
        const route = `${baseURL}/api/race`;
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

    static async endRace(body: { raceId: string, finalMileage: number, file: string, token: string }) {

        const params = { id: body.raceId, finalMileage: body.finalMileage, file: body.file }
        const route = `${baseURL}/api/race/finish/${body.raceId}`;
        const headers = {
            headers: {
                Authorization: `Bearer ${body.token}`,
                'Content-Type': 'multipart/form-data'
                // ContentType: 'multipart/form-data'
            }
        }

        try {
            const response = await axios.put(route, params, headers);
            const data = await response.data;
            return data;
        } catch (error) {
            console.error("Error while Ending Race, error: ", error);
            throw error
        }
    }
}

export default RaceService;
