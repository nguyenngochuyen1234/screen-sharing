  
<script lang="ts" setup>
import { ref } from 'vue'
import { User } from '@element-plus/icons-vue'
import imgLogin from '../assets/imgs/imgLogin.png'
import logo from '../assets/sprite/svg/logo.vue'
import { useConstants } from '../composables/constants'
import { useRouter } from 'vue-router'
import teacherApi from '../api/teacherApi.ts'
import { ElNotification } from 'element-plus'
const teacherPass = ref('')
const teacherEmail = ref('')
const teacherName = ref('')
const constants = useConstants()
const router = useRouter()


const handleSubmit = async () => {
    try {
        console.log({
            "name": teacherName.value,
            "email": teacherEmail.value,
            "password": teacherPass.value,
        })
        const response = await teacherApi.register({
            "name": teacherName.value,
            "email": teacherEmail.value,
            "password": teacherPass.value,
        });
        console.log({ response })
        if (response) {
            ElNotification({
                title: 'Success',
                message: 'You have successfully registered.',
                type: 'success',
            })
        } else {
            ElNotification({
                title: 'Failure',
                message: 'Registration failed, please check again.',
                type: 'error',
            })

        }
    } catch (err: any) {
        ElNotification({
            title: 'Failure',
            message: 'Registration failed, please check again.',
            type: 'error',
        })
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
                    <h1 class="text-title mt-[30px] w-[260px] leading-[40px] whitespace-normal">Sign up to sharing Platform
                    </h1>
                </div>
                <el-input v-model="teacherName" class="w-50 my-3" size="large" placeholder="Your name"
                    :prefix-icon="User" />
                <el-input v-model="teacherEmail" class="w-50 my-3" size="large" placeholder="Your email"
                    :prefix-icon="User" />
                <el-input v-model="teacherPass" class="w-50 my-3" size="large" placeholder="Your password"
                    :prefix-icon="User" />
                <el-button type="primary" @click="handleSubmit">Sign in</el-button>
                <p class="text-left span-text-color text-[15px] mt-1">Already have an account? <span class="cursor-pointer"
                        @click="() => router.push(constants.routePages.LOGIN)">Sign in</span></p>
            </div>
        </div>
    </div>
</template>


<style scoped></style>