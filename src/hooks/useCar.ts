import { useEffect, useState } from "react";
import CarService from "../services/CarService";

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

export function useCar({ plate, token }: { plate: string, token: string }) {
    const [car, setCar] = useState<Car>()

    const fetchCar = async () => {
        try {
            const response = await CarService.getCar({ plate, token });

            setCar(response)
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchCar()
    }, [])

    if (!car) return {} as Car
    return car
}