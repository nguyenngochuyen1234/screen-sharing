<script lang="ts" setup>
import logoAndTitle from '../../assets/sprite/svg/logoAndTitle.vue'
import { useConstants } from '../../composables/constants'
import { useRouter } from 'vue-router'
import {  ref } from "vue";
import { useManageRoomStore } from '../../store/room/index'
const manageRoomStore = useManageRoomStore()
const constants = useConstants()
const router = useRouter()
const roomData = ref(manageRoomStore.getRoom)

const roomId = router.currentRoute.value.params.id


const idPeer = ref(manageRoomStore.getIdPeer || '')
const navCreateRoom = () => {
    router.push(constants.routePages.MANAGE_ROOM.CREATE_ROOM)
}

const navRoom = async (idRoom: any) => {
    try {
        const roomDataValue = roomData.value
        manageRoomStore.saveRoomRealtime({ ...roomDataValue, idPeer: idPeer.value })
        const routePath = constants.routePages.MANAGE_HOME.TEACHER.VIEW.replace(':id', idRoom);
        router.push(routePath);
    } catch (err: any) {
        console.log(err.message)
    }
}

</script>
<template>
    <div class="page-joinroom">
        <logoAndTitle class="mb-[30px]" />
        <div class="px-[40px] py-[24px] bg-[#fff] box-joinroom">
            <div>
                <h3 class="py-[24px]">Room information</h3>
                <div class="line1 my-[8px]"></div>
                <div class="text-span text-[#23262F]">
                    <div class="flex justify-between py-[9px]">
                        <span>Room name:</span>
                        <span>{{ roomData?.name }}</span>
                    </div>
                    <div class="flex justify-between py-[9px]">
                        <span>Room code:</span>
                        <span>{{ roomData?.id }}</span>
                    </div>
                    <div class="flex justify-between py-[9px]">
                        <span>Start time</span>
                        <span>2023-05-15T00:14:23.000z</span>
                    </div>
                    <div class="flex justify-between py-[9px]">
                        <span>Link sttudent: </span>
                        <span>
                            <el-link type="primary">Student Link</el-link>
                        </span>
                    </div>
                </div>
                <div class="mt-[32px]">
                    <el-button type="primary" round @click="() => navRoom(roomId)">Join room </el-button>
                    <el-button type="danger" plain round @click="navCreateRoom">Remove room</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
    
<style scoped></style>