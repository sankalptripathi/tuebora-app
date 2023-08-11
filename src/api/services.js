import axios from "axios";

const baseUrl = "http://localhost:5000";

export const getUsers = (key='') => {
    const url = (key === "" || key === "all_users" ? `${baseUrl}/users` : `${baseUrl}/users?manager=${key}`)
    const users = axios.get(url, {
        returnType: 'json'
    })
    .then((response) => {
        if(response.status === 200) {
            return response.data;
        }
    })
    .catch(e => console.log(e));
    return users;
}

export const getAccounts = async () => {
    const accounts = await axios.get(`${baseUrl}/accounts`, {
        responseType: "json",
    })
    .then((response) => {
        if(response.status === 200) {
            return response.data;
        }
    })
    .catch(e => console.log(e));
    return accounts;
}