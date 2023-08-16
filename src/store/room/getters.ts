import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useState, type StateProps } from './state'

export interface GettersProps {
  getRoom: any,
  getPeer: any,
  getIdPeer:any,
  getStudentsAdmited:any

}

export const useGetters = defineStore('manageRoomGetters', (): GettersProps => {
  const state: StateProps = useState()
  const getRoom = computed(() => {
    return state.roomInfo
  })
  const getPeer = computed(() => {
    return state.peer
  })
  const getIdPeer = computed(() => {
    return state.idPeer
  })
  const getStudentsAdmited = computed(() => {
    return state.StudentsAdmited
  })

  return {
    getRoom, getPeer, getIdPeer, getStudentsAdmited
  }
})
