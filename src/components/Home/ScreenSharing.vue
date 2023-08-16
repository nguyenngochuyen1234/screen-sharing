<template>
  <div>
    <video ref="videoRef" v-show="isScreenSharing" v-bind:class="{ zoomed: isZoomed }" autoplay
      @click="toggleZoom"></video>
    <video ref="videoRefZoom" v-show="false" autoplay></video>
  </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import database from '../../firebase/init.ts'
import { ref as refFirebase, get, onValue, set } from "firebase/database";
import { useManageRoomStore } from '../../store/room/index'
const manageRoomStore = useManageRoomStore()
const props = defineProps<{
  classCode: any,
  idCall: any,
  zoomVideo: boolean  
}>()
const dataStudentAdmit = ref(manageRoomStore.getStudentsAdmited)
console.log({dataStudentAdmit})
const callId = props.idCall
const classCode = props.classCode
const isScreenSharing = ref(false);
const videoRef = ref<HTMLVideoElement | null>(null);
const isZoomed = ref(false);
const videoRefZoom = ref<HTMLVideoElement | null>(null);
const servers = {
  iceServers: [
    {
      urls: [
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
      ],
    },
  ],
  iceCandidatePoolSize: 10,
};


const pc = new RTCPeerConnection(servers);
const setVideo = async () => {
  const remoteStream = new MediaStream();
  pc.ontrack = (event: any) => {
    event.streams[0].getTracks().forEach((track: any) => {
      remoteStream.addTrack(track);
    });
  };

  if (videoRef.value) {
    videoRef.value.srcObject = remoteStream;
    isScreenSharing.value = true;

  }
  if (videoRefZoom.value) {
    videoRefZoom.value.srcObject = remoteStream;
  }
  const callRef = refFirebase(database, `calls/${classCode}/${callId}`);
  const offerCandidatesRef = refFirebase(database, `calls/${classCode}/${callId}/offerCandidates`)

  const callSnapshot = await get(callRef);
  const callData = callSnapshot.val();

  const offerDescription = callData.offer;

  await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

  const answerDescription = await pc.createAnswer();
  await pc.setLocalDescription(answerDescription);

  const answer = {
    type: answerDescription.type,
    sdp: answerDescription.sdp,
  };

  await set(refFirebase(database, `calls/${classCode}/${callId}/answer`), answer);

  onValue(offerCandidatesRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const candidate = new RTCIceCandidate(childSnapshot.val());
      pc.addIceCandidate(candidate);
    });
  });

}
onMounted(() => {
  setVideo()
})


watch(
  () => dataStudentAdmit.value, 
  (value:any) => {
    console.log({value})
    setVideo()
})

function toggleZoom() {
  isZoomed.value = !isZoomed.value;
  if (isZoomed.value) {
    videoRefZoom.value?.play();
  } else {
    videoRefZoom.value?.pause();
  }
}
</script>
  
<style scoped>
.zoomed {
  width: 100vw;
  height: 100vh;
  object-fit: contain;
  position: fixed;
  padding: "20px";
  top: 0;
  left: 0;
  z-index: 10;
}
</style>