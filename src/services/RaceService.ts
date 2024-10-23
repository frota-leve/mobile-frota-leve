import axios from "axios";

const baseURL = "http://localhost:8080";

class RaceService {
    static async startRace(body: { token: string, carId: string, employeeId: string }) {
        const params = {
            carId: body.carId,
            employeeId: body.employeeId
        }
        const config = {
            headers: { Authorization: `Bearer ${body.token}` }
        }
        try {
            const response = await axios.post(`${baseURL}/api/race`, params, config);
            const data = await response.data;
            return data;
        } catch (error) {
            throw console.error("Error while Starting Run, error: ", error);
        }
    }

}

export default RaceService;
