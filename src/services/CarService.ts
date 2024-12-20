import axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_API_URL;


class CarService {
    static async getCar(body: { plate: string, token: string }) {
        try {
            const route = `${baseURL}/api/car/${body.plate}`;
            const headers = {
                headers: {
                    Authorization: `Bearer ${body.token}`
                }
            }

            const response = await axios.get(route, headers);

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
