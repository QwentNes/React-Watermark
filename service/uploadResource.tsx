import * as React from 'react';
import axios from "axios";
import {TResponse} from "../types/main";

const API_URL = 'http://localhost/Watermark_backend/'

axios.defaults.baseURL = API_URL

export const UploadResource = {
    async All(data: FormData) {
        return axios.post<Array<TResponse>>('/resource/upload', data, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    }
}