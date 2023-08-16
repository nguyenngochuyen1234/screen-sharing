import { createRouter, createWebHistory } from 'vue-router'
import { authRoute } from './auth'
import { manageHomeTeacherRoute } from './manage-home-teacher'
import { manageHomeStudentRoute } from './manage-home-student'
import { manageRoomRoute } from './manage-room'
const routes = [...authRoute, ...manageHomeTeacherRoute, ...manageRoomRoute, ...manageHomeStudentRoute]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
