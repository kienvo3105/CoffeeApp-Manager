import { useState } from "react";
import config from "../config";
import * as Keychain from 'react-native-keychain';


export const usePost = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [result, setResult] = useState(null);

    const fetchPost = async (path, data) => {
        setIsLoading(true);
        setIsError(false);

        const credentials = await Keychain.getGenericPassword();
        const response = await fetch(config.API_URL + path, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                authorization: `${credentials ? credentials.password : null}`,
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
                console.log("error fetch post", err)
            });
        setResult(response);
        return response;
    };

    return { isLoading, isError, fetchPost, result };
};
