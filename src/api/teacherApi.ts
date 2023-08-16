
import axiosClient from "./axiosClient.ts"


const teacherApi = {
    register(data: any) {
        const url = `/register/teacher`
        return axiosClient.post(url, data)
    },
    login(data: any) {
        const url = `/login`
        return axiosClient.post(url, data)
    },
    createRoom(nameRoom: any) {
        const url = `/teacher/creat`
        return axiosClient.post(url, nameRoom)
    }
}
export default teacherApi;