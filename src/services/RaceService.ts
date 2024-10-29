import axios from "axios";

const baseURL = "http://localhost:8080";

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

}

export default RaceService;
