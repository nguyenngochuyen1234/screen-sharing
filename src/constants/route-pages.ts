const routePages = {
    ROOT: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    MANAGE_ROOM: {
      ROOT: '/manage-room',
      CREATE_ROOM: '/manage-room/create-room',
      ROOM: '/manage-room/room/:id',
    },
    MANAGE_HOME: {
      TEACHER:{
        VIEW:'/manage-room/room/view/:id',
      },
      STUDENT:{
        VIEW:'/manage-client/client',
      }
    },
  }
  
  export default routePages
  