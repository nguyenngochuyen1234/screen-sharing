<script setup lang="ts">
import Navigation from '../../../components/Home/Navigation.vue'
import StartPage from './Start.vue'
import database from '../../../firebase/init';
// import ScreenSharing from '../../../components/Home/ScreenSharing.vue'
import { onValue, ref as refFirebase } from "firebase/database";
import { useRouter } from 'vue-router'
import { ref, onMounted, watch, Ref, onBeforeUnmount } from 'vue'
import ItemStudentRequest from '../../../components/Home/ItemStudentRequest.vue'
import ViewStudentsDesktop from './ViewStudentsDesktop.vue';
import { useManageRoomStore } from '../../../store/room/index'
// import Tick from '../../../assets/sprite/svg/Student Desktop Sharing/Home/tick.vue'
const manageRoomStore = useManageRoomStore()

const router = useRouter()
const classCode = router.currentRoute.value.params.id
const isViewDesktop = ref(false)
const resultRef: Ref<any[]> = ref([]);
const studentsRequestRef = ref([] as any[])
const studentsAdmitedRef = ref([] as any[])
const handleUserLeave = async () => {
  // await remove(refFirebase(database, `calls/${classCode}`));
};

window.addEventListener("beforeunload", (event) => {
  event.preventDefault();
  event.returnValue = "";
  handleUserLeave();
});
onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", handleUserLeave);
});
onMounted(() => {
  onValue(refFirebase(database, `calls/${classCode}`), (snapshot) => {
    const data = snapshot.val();
    const result: any[] = []
    if (data !== null) {
      Object.entries(data).map(([key, value]) => {
        isViewDesktop.value = true
        if (typeof value === 'object') {
          
          result.push({ ...value, id: key });
        }
      });
      resultRef.value = result
    }
    else {
      studentsRequestRef.value = []
      isViewDesktop.value = false
    }
  });
});
watch(
  () => resultRef.value,
  (newResult) => {
    const dataStudents = newResult.map((data: any) => {
      let dataStudent = data.dataStudent
      return {
        ...dataStudent,
        idCall: data.id,
        isAdmit: data.isAdmit
      }
    })
    let studentsRequest = dataStudents.filter(dt => dt.isAdmit == false)
    studentsRequestRef.value = studentsRequest
    if (!studentsRequest[0]) {
      studentsRequestRef.value = []
      isViewDesktop.value = false
    }

    let studentsAdmited = dataStudents.filter(dt => dt.isAdmit == true)
    studentsAdmitedRef.value = studentsAdmited
    manageRoomStore.saveStudentsAdmited(studentsAdmited)
    if (studentsAdmited[0]) {
      isViewDesktop.value = true
    } else isViewDesktop.value = false
  }
);

</script>
<template>
  <div>
    <Navigation />
    <div class="home-body overflow-auto">
      <div class="absolute z-10 right-10">
        <div>
          <!-- <div class="flex justify-end">
            <Tick />
            <el-button type="" link>Admit All</el-button>
          </div> -->
          <ItemStudentRequest v-for="(item) in studentsRequestRef" :key="item.idCall" class="my-[10px]" :dataStudent=item
            :classCode="classCode" />
        </div>
      </div>
      <StartPage v-if="!isViewDesktop" />
      <ViewStudentsDesktop v-if="isViewDesktop" :classCode="classCode" :studentsAdmitedRef="studentsAdmitedRef" />
    </div>
  </div>
</template>

<style>
.home-body {
  background-color: #DFDFE6;
  height: calc(100vh - 75px);
  padding: 16px;
}
</style>