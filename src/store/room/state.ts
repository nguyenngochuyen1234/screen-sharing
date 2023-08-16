import { defineStore } from 'pinia'

export interface StateProps {
    roomInfo: any[],
    peer:any,
    idPeer:string,
    StudentsAdmited:any[]

}

export const useState = defineStore({
  id: 'manageRoomState',
  
  state: (): StateProps => {
    return {
      roomInfo: [],peer:null, idPeer:'',StudentsAdmited:[]
    }
  },
})
