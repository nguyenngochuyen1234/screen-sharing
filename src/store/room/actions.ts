import { setDocument, getDocument } from '../../firebase/apis'
// updateDocument

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid';
import { useState, type StateProps } from './state'


export interface ActionsProps {
  saveRoom: (params: any) => void
  saveStudentsAdmited: (params: any) => void
  addStudentAdmited: (params: any) => void
  saveRoomRealtime: (params: any) => void
  saveStudent: (params: any) => any
  getDataRoom: (id: string) => any
  savePeer: (peer: any) => any
}

export const useActions = defineStore('manageRoomActions', (): ActionsProps => {
  const state: StateProps = useState()

  const getDataRoom = async (id: any) => {
    const dataRoom = await getDocument('room', id)
    console.log({dataRoom})
    return dataRoom
  }

  const saveRoom = async (params: any) => {
    state.roomInfo = params
  }

  const saveRoomRealtime = async (params: any) => {
    await setDocument('room', '' + `${params.id}`, params)
  }

  const saveStudent = async (params: any) => {
    console.log({ params })
    const id = ref(uuidv4()).value
    await setDocument('students', '' + id, params)

  }

  const savePeer = (peer: any) => {
    state.peer = peer
  }

  const saveStudentsAdmited = (params:any) => {
    state.StudentsAdmited = params
  }

  const addStudentAdmited = (params:any) => {
    state.StudentsAdmited.push(params)
  }



  return {
    saveRoom,
    getDataRoom,
    saveStudent,
    savePeer,
    saveRoomRealtime,
    saveStudentsAdmited,
    addStudentAdmited
  }
})
