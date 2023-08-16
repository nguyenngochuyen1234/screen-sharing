<script setup lang="ts">

import Navigation from '../../../components/Home/Navigation.vue'
import ImgDesktop from '../../../assets/sprite/Img_desktop.vue'
import IconEmail from '../../../assets/sprite/svg/Student Desktop Sharing/Home/icon_email.vue'
import IconUser from '../../../assets/sprite/svg/Student Desktop Sharing/Home/icon_user.vue'
import IconMonitorPlay from '../../../assets/sprite/svg/Student Desktop Sharing/Input/MonitorPlay.vue'
import { ref as refFirebase, push, onValue, child, get } from "firebase/database";
import database from '../../../firebase/init.ts'
import { setDocument, deleteDocument,updateDocument } from '../../../firebase/apis.ts'
import { ElNotification } from 'element-plus'
import { ref, watch, onMounted } from 'vue'
const classCode = ref('')
const studentName = ref('')
const studentMail = ref('')
const classData = ref()
const loadingBtn = ref(false)
const isFindClass = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null);
const isScreenSharing = ref(false);
const isStudentJoin = ref(false)
let callId: string | null;
let localStream: MediaStream | null = null;
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
onMounted(() => {
    onValue(refFirebase(database, `calls`), () => {
        if (callId && classCode.value && isScreenSharing) {
            get(child(refFirebase(database), `calls/${classCode.value}`)).then((snapshot) => {
                console.log(snapshot.exists())
                if (!snapshot.exists()) {
                    ElNotification({
                        title: 'Warning',
                        message: 'Teacher have disconnected class',
                        type: 'warning',
                    })
                    isFindClass.value = false
                    handleDeleteStudent("beingRemoved")
                }
            }).catch((error) => {
                console.error(error);
            });
            get(child(refFirebase(database), `calls/${classCode.value}/${callId}`)).then((snapshot) => {
                if (snapshot.exists() && snapshot.val().disconnect == "beingRemoved") {
                    ElNotification({
                        title: 'Warning',
                        message: 'You have left the class',
                        type: 'warning',
                    })
                    handleDeleteStudent("beingRemoved")
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    });
});
const handleSaveStudent = async () => {
    const pc = new RTCPeerConnection(servers);
    try {
        localStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        if (videoRef.value) {
            videoRef.value.srcObject = localStream;
        }
        isScreenSharing.value = true;
        const remoteStream = new MediaStream();

        if (localStream) {
            localStream.getTracks().forEach((track) => {
                pc.addTrack(track, localStream);
            });
        }

        pc.ontrack = (event: any) => {
            event.streams[0].getTracks().forEach((track: any) => {
                remoteStream.addTrack(track);
            });
        };
        const callRef = await push(child(refFirebase(database), 'calls'));
        callId = callRef.key;
        const offerCandidatesRef = refFirebase(database, `calls/${classCode.value}/${callId}/offerCandidates`)
           
        pc.onicecandidate = (event: any) => {
            event.candidate && push(offerCandidatesRef, event.candidate.toJSON());
        };

        const offerDescription = await pc.createOffer();
        await pc.setLocalDescription(offerDescription);

        const offer = {
            sdp: offerDescription.sdp,
            type: offerDescription.type,
        };


        onValue(refFirebase(database, `calls/${classCode.value}/${callRef.key}`), (snapshot) => {
            const data = snapshot.val();
            if (!pc.currentRemoteDescription && data?.answer) {
                const answerDescription = new RTCSessionDescription(data.answer);
                pc.setRemoteDescription(answerDescription);
            }
        });


        await setDocument(`calls/${classCode.value}`, `${callRef.key}`, {
            dataStudent: {
                "studentName": studentName.value,
                "studentMail": studentMail.value,
            },
            "offer": offer,
            "isAdmit": false,
            "disconnect":"none"
        })


    } catch (error) {
        console.log(error)
    }
}
const handleDeleteStudent = async (disconnect:string) => {

    try {
        if (localStream) {
            localStream.getTracks().forEach((track) => track.stop());
        }
        isScreenSharing.value = false
        if (callId) {
            if(disconnect=="selfRemoving"){
                await updateDocument(`calls/${classCode.value}`, callId,{ disconnect: "selfRemoving " })
            }
                await deleteDocument(`calls/${classCode.value}`, callId)
        }
    } catch (error) {
        console.log(error)
    }
}
const handleFindClass = async () => {
    try {
        loadingBtn.value = true
        onValue(refFirebase(database, `room/${classCode.value}`), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                classData.value = data
            }
        });


    } catch (err: any) {
        console.log(err.message)
    }
}
watch(() => classData.value,
    (newValue) => {
        if (newValue) {
            loadingBtn.value = false
            isFindClass.value = true

        }
    }
)
</script>

<template>
    <div>
        <Navigation />
        <div class="home-body overflow-auto">
            <div class="h-[100%] flex flex-row ">
                <div class="h-[100%] flex flex-col justify-between">
                    <h4 class="w-[992px] p-[20px] bg-[#fff] link-text-color rounded-[10px] mb-[20px] mr-6">
                        <div v-if="isFindClass" class="flex justify-between">
                            <div>
                                <p class=" mb-2">{{ classData.name }}</p>
                                <span class="text-[#87898E] font-[400] text-[15px]">Code: {{ classData.id }}</span>
                            </div>

                            <el-button v-if="!isScreenSharing" type="primary" round class="px-6 my-2"
                                @click="handleSaveStudent">Join</el-button>
                            <el-button v-if="isScreenSharing" type="primary" round class="px-6 my-2"
                                @click="()=>handleDeleteStudent('selfRemoving')">Leave</el-button>
                        </div>
                        <p v-if="!isFindClass">Fine a class get started...</p>
                    </h4>
                    <div class="w-[992px]">
                        <ImgDesktop v-if="!isScreenSharing" />
                        <div>
                            <video ref="videoRef" v-show="isScreenSharing" autoplay></video>
                        </div>
                    </div>
                </div>
                <div class="bg-[#fff] min-w-[300px] p-[10px]">
                    <h4 v-if="isStudentJoin" class="mt-[20px] mb-3">Join class</h4>

                    <el-input v-model="classCode" class="w-50 my-2" placeholder="Class code"
                        :prefix-icon="IconMonitorPlay" />
                    <el-input v-model="studentName" class="w-50 my-2" placeholder="Student name" :prefix-icon="IconUser" />
                    <el-input v-model="studentMail" class="w-50 my-2" placeholder="Student email"
                        :prefix-icon="IconEmail" />
                    <el-button type="primary" round class="my-2 w-[100%]" @click="handleFindClass"
                        :loading="loadingBtn">Find</el-button>
                </div>
            </div>
        </div>
    </div>
</template>