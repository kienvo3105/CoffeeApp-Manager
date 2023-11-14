import { useState } from "react";
import config from "../config";
import * as Keychain from 'react-native-keychain';


export const usePatch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [result, setResult] = useState(null);

    const fetchPatch = async (path, data) => {
        setIsLoading(true);
        setIsError(false);
        const credentials = await Keychain.getGenericPassword();

        const response = await fetch(config.API_URL + path, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
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

    return { isLoading, isError, fetchPatch, result };
};
