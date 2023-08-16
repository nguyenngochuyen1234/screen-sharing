  
<script lang="ts" setup>
import { ref } from 'vue'
import { User } from '@element-plus/icons-vue'
import imgLogin from '../assets/imgs/imgLogin.png'
import logo from '../assets/sprite/svg/logo.vue'
import { useRouter } from 'vue-router'
import teacherApi from '../api/teacherApi.ts'
import { useConstants } from '../composables/constants'
const constants = useConstants()
const teacherPass = ref('')
const teacherEmail = ref('')
const remember = ref(false)
const router = useRouter()

const navCreateRoom = () => {
    router.push(constants.routePages.MANAGE_ROOM.CREATE_ROOM)
}
const handleSubmit = async () => {
    try {
        const response = await teacherApi.login({
            "email": teacherEmail.value,
            "password": teacherPass.value,
        });
        console.log({response}) 
        localStorage.setItem('access_token', response.data.token)
        localStorage.setItem('data_user', JSON.stringify(response.data.user))
        navCreateRoom()
    } catch (err: any) {
        console.log(err.message);
    }
};
</script>
  
<template>
    <div class="flex flex-row h-[100vh] items-center p-[20px]">
        <div class="hidden sm:block">
            <img :src="imgLogin" class="h-[620px] w-[700px]" />
        </div>
        <div>
            <div class="flex flex-col mt-[0px] ml-[100px]">
                <logo />
                <div>
                    <h1 class="text-title mt-[30px] w-[260px] leading-[40px] whitespace-normal">Sign In to sharing Platform
                    </h1>
                </div>
                <span class="text-left span-text-color my-[20px] ">Login to your account to continue the process</span>

                <el-input v-model="teacherEmail" class="w-50 my-3" size="large" placeholder="Teacher email"
                :prefix-icon="User" />
                <el-input v-model="teacherPass" class="w-50 my-3" size="large" placeholder="Password"
                :prefix-icon="User" />
                <el-checkbox v-model="remember">Remember me</el-checkbox>
                <el-button type="primary" @click="handleSubmit">Sign in</el-button>
                <p class="text-left span-text-color text-[15px] mt-1">Don't have an account?<span class="cursor-pointer" @click="()=>router.push(constants.routePages.REGISTER)">Sign up</span></p>
            </div>
        </div>
    </div>
</template>


<style scoped></style>