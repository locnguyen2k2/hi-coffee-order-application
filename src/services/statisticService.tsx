import axios from 'axios'
import {APP_BASE_API_URL, ipv4} from '../../constants/IPv4'
const getInDay = async (statistical_object: any, statistical_type: any, from: any, to: any) => {
    const formData = new FormData()
    let URL = ''
    formData.append('statistical_object', statistical_object);
    formData.append('statistical_type', statistical_type);
    formData.append('from', from);
    if (statistical_type == 'range') {
        formData.append('to', to);
        URL = `/${APP_BASE_API_URL}/api/thong-ke-theo-ngay`
    } else {
        URL = `/${APP_BASE_API_URL}/api/thong-ke-trong-ngay`
    }
    try {
        return await axios({
            data: formData,
            method: 'post',
            headers: { "Content-Type": "multipart/form-data" },
            url: 'http://' + ipv4() + URL,
        })
    } catch (error) { console.log(error) }
}

export default {
    getInDay,
}
