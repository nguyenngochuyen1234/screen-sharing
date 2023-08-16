
import axiosClient from "./axiosClient.ts"


const studentApi = {
    register(data: any) {
        const url = `/register/teacher`
        return axiosClient.post(url, data)
    },
}
export default studentApi;