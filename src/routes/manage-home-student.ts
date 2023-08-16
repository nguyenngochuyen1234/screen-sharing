import constants from '../constants/index.ts'
import View from '../pages/Home/Student/View.vue'

export const manageHomeStudentRoute = [
  {
    path: constants.routePages.MANAGE_HOME.STUDENT.VIEW,
    component: View,
    meta: { layout: 'haveInterface' },
  },
]
