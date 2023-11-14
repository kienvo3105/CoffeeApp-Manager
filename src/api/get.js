import { useState } from "react";
import config from "../config";
import * as Keychain from 'react-native-keychain';


export const useGet = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [result, setResult] = useState(undefined);

    const fetchGet = async (path) => {
        setIsLoading(true);
        setIsError(false);
        const credentials = await Keychain.getGenericPassword();

        // const response = await fetch(process.env.REACT_APP_BACKEND_URL + path, {
        const response = await fetch(config.API_URL + path, {
            method: "GET",
            headers: {
                Authorization: `${credentials.password}`,
            },
        })
            .then((res) => {
                setIsLoading(false);
                if (!res.ok) setIsError(true);
                return res.json();
            })
            .catch((err) => {
                setIsError(true);
                setIsLoading(false);
            });
        setResult(response);
        return response;
    };

    return { isLoading, isError, fetchGet, result };
};
