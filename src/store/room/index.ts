import { extractStore } from '../../utils/extractStore'
import { defineStore } from 'pinia'
import { useActions, type ActionsProps } from './actions'
import { useGetters, type GettersProps } from './getters'
import { useState, type StateProps } from './state'

type ManageRoomStoreProps = StateProps & ActionsProps & GettersProps

export const useManageRoomStore: () => ManageRoomStoreProps = defineStore('manageRoom', () => {
  return {
    ...extractStore(useState()),
    ...extractStore(useGetters()),
    ...extractStore(useActions()),
  }
})
