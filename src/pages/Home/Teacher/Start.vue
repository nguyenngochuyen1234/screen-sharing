<script setup lang="ts">
import ImgGroup from '../../../assets/imgs/Group.png'
import IconCopy from '../../../assets/sprite/svg/Icon_copy.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const classCode = router.currentRoute.value.params.id
</script>

<template>
    <div class="bg-[#fff] rounded-10 flex flex-col items-center relative">
        <div class="flex-col my-[60px]">
            <img :src="ImgGroup" />
            <p class="text-span span-text-color mt-[22px]">No screens are currently being shared</p>
        </div>
        <div class="flex flex-col items-center justify-center mb-8">
            <h4 class="mb-[14px]">Send Student link and room code to get started</h4>
            <div class="item-circle">
                <p class="text-span text-[#23262F]">Link student:</p>
                <div class="flex items-center">
                    <el-link type="primary" class="link-text mr-[18px]">Student Link</el-link>
                    <IconCopy />
                </div>
            </div>
            <div class="item-circle items-center">
                <p class="text-span text-[#23262F]">Room code:</p>
                <div class="flex">
                    <p class="text-span text-[#23262F] mr-[18px]">{{ classCode }}</p>
                    <IconCopy />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.item-circle {
    display: flex;
    padding: 14px 16px;
    border: 1px solid #DFDFE6;
    border-radius: 30px;
    width: 269px;
    align-items: center;
    justify-content: space-between;
    margin: 6px 0;
}
</style>