import {
    ReactNode,
    createContext,
    useCallback,
    useState,
    useContext,
    useEffect,
    useMemo
} from "react";
import { ParkingSlot } from "../apis/slot/type";
import axiosWithConfig, { setAxiosConfig } from "../apis/axiosWithConfig";
import { toast } from "sonner";
import { getAllParkingSlot } from "../apis/slot/api";
import { error } from "console";

interface ContextSlot {
    tokenSlot: string;
    slot: Partial<ParkingSlot>;
    changeTokenHandler: (token?: string) => void;
}

interface Props {
    children: ReactNode;
}

const initialValue = {
    tokenSlot: "",
    slot: {},
    changeTokenHandler: () => {},
}

const TokenContext =  createContext<ContextSlot>(initialValue);

export const TokenProvider = ({ children }: Props) => {
    const [tokenSlot, setToken] = useState(localStorage.getItem("parking-token") ?? "");
    const [slot, setSlot] = useState<Partial<ParkingSlot>>({});

    useEffect (() => {
        setAxiosConfig (tokenSlot);
        tokenSlot !== "" && fetchParkingSlot();
    }, [tokenSlot]);

    axiosWithConfig.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response.status === 401){
                changeTokenHandler();
            }
            return Promise.reject(error);
        }
    );

    async function fetchParkingSlot() {
        try {
            const result = await getAllParkingSlot();
            setSlot(result.data);
        } catch (error) {
            toast ((error as Error).message);
        }
    }
    const changeTokenHandler(newToken :
    }