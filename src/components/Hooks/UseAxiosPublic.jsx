import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://client-server-taupe.vercel.app'
})
const UseAxiosPublic = () => {
    return axiosPublic
};

export default UseAxiosPublic;