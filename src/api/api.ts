import axios from "axios";

export const instance = axios.create({
    baseURL: "ec2-18-117-84-227.us-east-2.compute.amazonaws.com:3000/",
    timeout: 3000,
    headers: {
        "Content-Type": "application/json",
    }
})