
import axiosClient from "./axiosClient.ts"


const teacherApi = {
    register(data: any) {
        const url = `/register/teacher`
        return axiosClient.post(url, data)
    },
}
export default teacherApi;