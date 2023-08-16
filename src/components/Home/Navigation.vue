<script setup lang="ts">
import Logo from '../../assets/sprite/svg/logo.vue'
import IconCopy from '../../assets/sprite/svg/Icon_copy.vue'
import IconChat from '../../assets/sprite/svg/Student Desktop Sharing/Home/icon_chat.vue'
import IconSetting from '../../assets/sprite/svg/Student Desktop Sharing/Home/icon_setting.vue'
import IconUser from '../../assets/sprite/svg/Student Desktop Sharing/Home/icon_user.vue'
import ImageSquare from '../../assets/sprite/svg/Student Desktop Sharing/Home/ImageSquare.vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import database from '../../firebase/init';
import { useConstants } from '../../composables/constants'
import { ref as refFirebase, remove } from "firebase/database";
const constants = useConstants()
const router = useRouter()
const classCode = router.currentRoute.value.params.id
const userDataLocal = localStorage.getItem("data_user");
const userData = userDataLocal ? JSON.parse(userDataLocal) : {};
const handleUserLeave = async () => {
    await remove(refFirebase(database, `calls/${classCode}`));
    await remove(refFirebase(database, `room/${classCode}`));
    router.push(constants.routePages.MANAGE_ROOM.CREATE_ROOM)
};
const handleCopy = () => {
    navigator.clipboard.writeText(classCode)
    ElNotification({
        title: 'Success',
        message: 'Copyed',
        type: 'success',
    })
}
</script>
<template>
    <div class="flex flex-row justify-between items-center py-[15px] px-[32px]">
        <div class="flex flex-row items-center">
            <Logo class="mr-[12px]" />
            <div class="flex flex-col justify-between ">
                <h3>Sharing Platform</h3>
                <div v-if="classCode" class="flex mt-[9px] items-center">
                    <span class="span-text-color">Teacher name: {{ userData.name }} | Room code: {{ classCode }}</span>
                    <IconCopy @click="handleCopy" class="cursor-pointer" />
                    <el-button type="danger" plain @click="handleUserLeave">Disconnect</el-button>
                </div>
            </div>
        </div>
        <div class="hidden sm:flex flex-row w-[318px] justify-between items-center ">
            <IconChat />
            <IconSetting />
            <el-button type="primary" :icon="ImageSquare" round color="#DFEBFF">Save image</el-button>
            <IconUser />
        </div>
    </div>
</template>