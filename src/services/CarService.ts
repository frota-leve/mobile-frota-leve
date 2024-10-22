import axios from "axios";

const baseURL = "http://localhost:8080";

class CarService {
    static async getCar(body: { plate: string }) {
        try {
            const response = await axios.get(`${baseURL}/api/car/${body.plate}`);

            if (response.status !== 200)
                throw new Error(`Failed to get car: ${response.statusText}`);

            const data = await response.data;
            return data;
        } catch (error) {
            throw console.error("Error while Get Car, error: ", error);
        }
    }

}

export default CarService;
