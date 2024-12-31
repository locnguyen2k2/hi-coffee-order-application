import axios from 'axios'
import {APP_BASE_API_URL, ipv4} from '../../constants/IPv4'
const getListCategory = async () => {
    try {
        return await axios.get('http://' + ipv4() + `/${APP_BASE_API_URL}/api/CategoryController/getListCategory/`)
    } catch (error) { console.log(error) }
}

// const addCategory = async (name: string) => {
//     const formData = new FormData()
//     formData.append('name', name)
//     try {
//         return await axios({
//             url: 'http://' + ipv4() + '/${APP_BASE_API_URL/api/categorycontroller/addCategory',
//             method: 'post',
//             data: formData,
//             headers: { "Content-Type": "multipart/form-data" }
//         })
//     } catch (error) { console.log(error) }
// }

export default {
    getListCategory,
    // addCategory
}
