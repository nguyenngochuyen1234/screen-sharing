<script setup lang="ts">
import ViewDesktopSharing from "../../../components/Home/ViewDesktopSharing.vue"
import { watch, ref } from 'vue'

const props = defineProps<{
    classCode: any,
    studentsAdmitedRef: any
}>()
const studentsAdmitedRef = ref(props.studentsAdmitedRef || [])

watch(
    () => props.studentsAdmitedRef,
    () => {
        studentsAdmitedRef.value = props.studentsAdmitedRef
    }
)


</script>

<template>
    <div>
        <el-row :gutter="30">
            <el-col v-for="item in studentsAdmitedRef" :span="8">
                <ViewDesktopSharing class="my-[10px]" :name="item.studentName" :email="item.studentMail"
                    :idCall="item.idCall" :key="item.idCall" />
            </el-col>
        </el-row>
    </div>
</template>