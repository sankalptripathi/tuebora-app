import axios from "axios";

const baseUrl = "http://localhost:5000";

export const getUsers = async (tabKey='', limit=30) => {
    const url = (tabKey === "" || tabKey === "all_users" ? `${baseUrl}/users?_page=1&_limit=${limit}` : `${baseUrl}/users?_page=1&_limit=${limit}&manager=${tabKey}`)
    const users = await axios.get(url, {
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

export const getUserSchema = async () => {
    const userSchema = await axios.get(`${baseUrl}/usersSchema`, {
        responseType: "json",
    })
    .then((response) => {
        if(response.status === 200) {
            return response.data;
        }
    })
    .catch(e => console.log(e));
    return userSchema;
}

export const getAccountsSchema = async () => {
    const accountSchema = await axios.get(`${baseUrl}/accountsSchema`, {
        responseType: "json",
    })
    .then((response) => {
        if(response.status === 200) {
            return response.data;
        }
    })
    .catch(e => console.log(e));
    return accountSchema;
}