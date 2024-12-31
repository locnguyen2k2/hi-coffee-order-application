import axios from 'axios'
import {APP_BASE_API_URL, ipv4} from '../../constants/IPv4'
const getListTable = async () => {
    try {
        return await axios.get('http://' + ipv4() + `/${APP_BASE_API_URL}/api/danh-sach-ban`)
    } catch (error) { console.log(error) }
}

export default {
    getListTable,
}
