import constants from '../constants/index'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
export const authRoute = [
  {
    path: constants.routePages.LOGIN,
    component: Login,
    meta: { layout: 'noInterface' },
  },
  {
    path: constants.routePages.REGISTER,
    component: Register,
    meta: { layout: 'noInterface' },
  },
  {
    path: constants.routePages.ROOT,
    redirect: constants.routePages.LOGIN,
  },
]
