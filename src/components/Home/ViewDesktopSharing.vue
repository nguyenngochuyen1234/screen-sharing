<script setup lang="ts">
import IconEmail from '../../assets/sprite/svg/Student Desktop Sharing/Home/Icon_email.vue'
import IconView from '../../assets/sprite/svg/Student Desktop Sharing/Home/View.vue'
import { updateDocument, deleteDocument } from '../../firebase/apis.ts'
import { ref as refFirebase, onValue,  } from "firebase/database";
import database from '../../firebase/init.ts'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import ScreenSharing from './ScreenSharing.vue'
import { ElNotification } from 'element-plus'
const router = useRouter()
const classCode = router.currentRoute.value.params.id
const zoomVideo = ref(false)
const props = defineProps<{
    name: string
    email: string
    idCall: string
}>()
onMounted(() => {
    onValue(refFirebase(database, `calls/${classCode}/${props.idCall}`), (snapshot) => {
        if (snapshot.val().disconnect == "selfRemoving") {
            console.log(snapshot.val().disconnect)
            ElNotification({
                title: 'Warning',
                message: 'You have left the class',
                type: 'warning',
            })
           

        }
    });
});
const handleBan = async () => {
    try {
        await updateDocument(`calls/${classCode}`, props.idCall, { disconnect: "beingRemoved" })
        await deleteDocument(`calls/${classCode}`, props.idCall)
    } catch (err: any) {
        console.log(err)
    }
}
const handelZoomVideo = () => {
    zoomVideo.value = true
}
</script>

<template>
    <div class="w-[420px] rounded-10 overflow-hidden relative">
        <IconView class="absolute top-[8px] right-[8px] z-10" @click="handelZoomVideo" />
        <ScreenSharing :idCall="idCall" :classCode="classCode" :zoomVideo="zoomVideo" />
        <div class="bg-[#fff] w-[100%] flex flex-row justify-between py-[16px] px-[24px]">
            <div class="flex flex-row">
                <div class="circle-shape">1</div>
                <div>
                    <p class="text-bold-small mb-[6px]">{{ props.name }}</p>
                    <div class="flex">
                        <IconEmail class="mr-[8px]" />
                        <span class="text-span-small">{{ props.email }}</span>
                    </div>
                </div>
            </div>
            <el-button type="danger" @click="handleBan" plain round>Ban</el-button>
        </div>
    </div>
</template>

<style scoped>
.circle-shape {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin-right: 16px;
    gap: 10px;
    width: 36px;
    height: 36px;
    border: 1.5px solid #DFDFE6;
    border-radius: 30px;
}
</style>