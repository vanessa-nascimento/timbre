import axios from 'axios';
import { useState, useEffect } from 'react';
export const author = "Fred Flintstone"

const [data, setData] = React.useState([]);
const instance = axios.create({
    baseURL: 'localhost:8080/api/',
});
useEffect(() => {
    const getAPI = () => {
        instance.get('/usuarios').then(response => {
            console.log(JSON.stringify(response.data.data));
            const products = response.data.data;
            setData(products);
        }).catch(res => console.log(res));
    }
    getAPI()
},[]);