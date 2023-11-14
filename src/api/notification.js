// Import fetch (đã tích hợp sẵn trong trình duyệt)
// Không cần import axios nữa
// const API = axios.create({ ... });
import config from "../config";
// add a scan
export const register = async data => {
    try {
        const response = await fetch(`${config.API_URL}notification`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Tùy chọn này tương đương với withCredentials trong Axios
        });

        if (!response.ok) {
            throw new Error('Failed to register');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        throw error;
    }
};

export const update = async data => {
    try {
        const response = await fetch(`${config.API_URL}notification?userId=${data?.userId}`, {
            method: 'PATCH',
            body: JSON.stringify({ tokenId: data?.tokenId }),
            headers: {
                'Content-Type': 'application/json',
            },
            // credentials: 'include', // Tùy chọn này tương đương với withCredentials trong Axios
        });
        if (!response.ok) {
            throw new Error('Failed to update');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        throw error;
    }
};
