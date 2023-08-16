<script lang="ts" setup>
import logoAndTitle from '../../assets/sprite/svg/logoAndTitle.vue'
import IconRoom from '../../assets/sprite/svg/Student Desktop Sharing/Input/Icon_room.vue'
import { ref } from 'vue'
import { Back } from '@element-plus/icons-vue'
import { useConstants } from '../../composables/constants'
import { useRouter } from 'vue-router'
import teacherApi from '../../api/teacherApi.ts'
import { useManageRoomStore } from '../../store/room/index'
import { ElLoading } from 'element-plus'
import database from '../../firebase/init.ts'
import { ref as refFirebase, set } from "firebase/database";
const constants = useConstants()
const router = useRouter()

const navLogin = () => {
    router.push(constants.routePages.LOGIN)
}

const navRoom = (idRoom: string) => {
    const routePath = constants.routePages.MANAGE_ROOM.ROOM.replace(':id', idRoom);
    router.push(routePath);
}
const manageRoomStore = useManageRoomStore()
const roomName = ref('')
const handleCreateRoom = async () => {
    try {
        const loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
        })
        const dataRoom = await teacherApi.createRoom({ "name": roomName.value });
        let data = dataRoom.data.data
        localStorage.setItem("room_data", data)
        manageRoomStore.saveRoom(data)
        loading.close()
        await set(refFirebase(database, `calls`), dataRoom.data.data.id);
        navRoom(dataRoom.data.data.id)
    } catch (err: any) {
        console.log(err.message)
    }
}

</script>
<template>
    <div class="page-createroom">
        <logoAndTitle class="mb-[30px]" />
        <div class="px-[40px] py-[24px] bg-[#fff] box-createroom">
            <div>
                <h3 class="py-[24px]">Create room </h3>
                <el-input v-model="roomName" class="w-[100%]" placeholder="Room name" :prefix-icon="IconRoom" />
                <div class="text-span text-[#23262F]">
                </div>
                <el-button type="primary" class="mt-[32px]" @click="handleCreateRoom">Create</el-button>
                <div class="flex items-center mt-[17px] mb-[26px]">
                    <el-icon color="#409EFC" class="no-inherit">
                        <Back />
                    </el-icon>
                    <el-button type="primary" link @click="navLogin"> Back login</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
    
<style scoped></style>