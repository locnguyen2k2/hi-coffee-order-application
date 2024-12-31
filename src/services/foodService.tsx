import axios from 'axios'
import {APP_BASE_API_URL, ipv4} from '../../constants/IPv4'
const getListFood = async (category: any) => {
    try {
        if (category != null && category != undefined) {
            const formData = new FormData()
            formData.append('type_id', category)
            return await axios({
                url: 'http://' + ipv4() + `/${APP_BASE_API_URL}/api/danh-sach-mon`,
                method: 'post',
                data: formData,
                headers: { "Content-Type": "multipart/form-data" }
            })
        } else {
            return await axios.post('http://' + ipv4() + `/${APP_BASE_API_URL}/api/danh-sach-mon`)
        }
    } catch (error) {
        console.log(error)
    }
}

export default {
    getListFood,
}
