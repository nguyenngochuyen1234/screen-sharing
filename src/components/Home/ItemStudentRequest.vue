<script setup lang="ts">
import IconEmail from '../../assets/sprite/svg/Student Desktop Sharing/Home/Icon_email.vue'
import { deleteDocument, updateDocument } from '../../firebase/apis.ts'
import { ref, onMounted } from 'vue';
import { useManageRoomStore } from '../../store/room/index'
const manageRoomStore = useManageRoomStore()
const props = defineProps<{
    dataStudent:any
    classCode: any
}>()
const dataStudent = ref(props.dataStudent)
const classCode = props.classCode
onMounted(()=>{
    dataStudent.value = props.dataStudent

})
const handleDeny = async () => {
    try {
        
        await deleteDocument(`calls/${classCode}`, dataStudent.value.idCall)
    } catch (err: any) {
        console.log(err)
    }
}
const handleAdmit = async () => {
    try {
        await updateDocument(`calls/${classCode}`, dataStudent.value.idCall,{ isAdmit: true })
        manageRoomStore.addStudentAdmited(dataStudent.value)
    } catch (err: any) {
        console.log(err)
    }
}
</script>
<template>
    <div class="item-student-request">
        <div>
            <p class="text-bold-small mb-[6px]">{{ dataStudent.studentName }}</p>
            <div class="flex">
                <IconEmail class="mr-[8px]" />
                <span class="text-span-small">{{ dataStudent.studentMail }}</span>
            </div>
        </div>
        <div>
            <el-button round @click="handleDeny">Deny entry</el-button>
            <el-button type="primary" @click="handleAdmit" round>Admit</el-button>
        </div>
    </div>
</template>

<style>
.item-student-request {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 24px;
    position: relative;
    gap: 50px;
    background: #FFFFFF;
    box-shadow: 0px 2px 15px 5px rgba(52, 64, 84, 0.15);
    border-radius: 10px;
}
</style>