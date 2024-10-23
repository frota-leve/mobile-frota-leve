import axios from "axios";

const baseURL = "http://localhost:8080";

class RaceService {
    static async startRun(body: { token: string, carId: string, employeeId: string }) {
        console.log("Starting Run with body: ", body);
        try {
            const params = {
                carId: body.carId,
                employeeId: body.employeeId
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${body.token}`
                }
            }
            const response = await axios.post(`${baseURL}/api/race`, params, config);

            if (response.status !== 200)
                throw new Error(`Failed to start run: ${response.statusText}`);

            const data = await response.data;
            return data;
        } catch (error) {
            throw console.error("Error while Starting Run, error: ", error);
        }
    }

}

export default RaceService;
