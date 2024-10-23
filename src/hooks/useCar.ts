import { useEffect, useState } from "react";
import CarService from "../services/CarService";
import { useSession } from "../contexts/SessionContext";

export type Car = {
    id: string,
    plate: string,
    model: string,
    name: string,
    brand: string,
    isFuel: boolean,
    status: string,
    active: boolean,
    mileage: number,
    qrCode: string[],
}

export function useCar() {
    const [plate, setPlate] = useState<string>()
    const [car, setCar] = useState<Car>()
    const { session } = useSession()
    const token = session.token

    const fetchCar = async () => {
        try {
            if (plate) {
                const response = await CarService.getCar({ plate, token });
                setCar(response)
            }
        } catch (error) {
            throw console.error("Error while fetching car, error: ", error);
        }
    }

    useEffect(() => {
        fetchCar()
    }, [plate])

    return { car, setPlate }
}