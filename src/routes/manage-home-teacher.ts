import constants from '../constants/index.ts'
import View from '../pages/Home/Teacher/index.vue'
export const manageHomeTeacherRoute = [
  {
    path: constants.routePages.MANAGE_HOME.TEACHER.VIEW,
    component: View,
    meta: { layout: 'haveInterface' },
  }
]
