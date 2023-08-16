import constants from '../constants/index'
import CreateRoom from '../pages/managerRoom/createRoom.vue'
export const manageRoomRoute = [
  {
    path: constants.routePages.MANAGE_ROOM.CREATE_ROOM,
    component: CreateRoom,
  },
  {
    path: constants.routePages.MANAGE_ROOM.ROOM,
    component: () => import('../pages/managerRoom/joinRoom.vue'),
    meta: { layout: 'haveInterface' },
  },
]
