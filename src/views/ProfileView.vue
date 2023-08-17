<template>
  <v-row class="profile-wrap">
    <v-col>
      <h1 class="mb-5">Basic data</h1>
      <div class="d-flex align-center">
        <v-avatar class="mr-2" :image="avatarURL" size="64"></v-avatar>
        <v-file-input
          class="hidden-input"
          v-model="file"
          hide-details
          accept="image/*"
        >
        </v-file-input>
        <span class="ml-1">Upload image or capture a new one</span>
        <v-btn
          class="camera-btn"
          variant="text"
          icon="mdi-camera"
          :ripple="false"
          @click="openCamera"
        >
        </v-btn>
      </div>
      <div class="mt-2" v-show="showCamera">
        <video id="cameraFeed" autoplay></video>
        <canvas ref="canvas" style="display: none;"></canvas>
        <div class="d-flex justify-space-between align-center">
          <v-btn class="capture-btn" variant="text" :ripple="false" @click="capturePhoto">
            Capture & Save
          </v-btn>
          <v-btn class="stop-btn" variant="text" :ripple="false" @click="stopCamera">
            Stop Camera
          </v-btn>
        </div>

      </div>
      <v-row class="mt-5">
        <v-col cols="12" md="6">
          <v-text-field
            label="Name"
            v-model="name"
            variant="outlined"
            type="text"
            placeholder="Name"
            :rules="[rules.required]"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <h2>Account data</h2>
        </v-col>
        <v-col md="7"  class="d-flex align-center">
          <v-text-field
            label="E-mail"
            v-model="email"
            variant="outlined"
            type="email"
            placeholder="testmail@gmail.com"
            :rules="[rules.required, rules.email]"
          >

          </v-text-field>
        </v-col>
        <v-col md="4" class="d-flex align-center">
          <v-btn variant="outlined" class="mb-5">
            Reset password
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col></v-col>
  </v-row>
</template>

<script setup>
import {ref, onMounted, watch} from "vue";
import defaultAvatar from '@/assets/avatar.jpeg'

//avatar and camera
const file = ref(null);
const avatarURL = ref(defaultAvatar)
const camera = ref(null)
const canvas = ref(null);
const streamRef = ref(null);
const showCamera = ref(false)

//user data
const email = ref('')
const name = ref('')

//avatar and camera
onMounted(() => {
  camera.value = document.getElementById('cameraFeed')
})

watch(file, (v) => {
  console.log('File type:', typeof v, v instanceof Blob, v)
  if (v) {
    avatarURL.value = URL.createObjectURL(v[0]);
  } else {
    avatarURL.value = defaultAvatar;
  }
});

const openCamera = () => {
  navigator.mediaDevices.getUserMedia({video: true}).then(
    stream => {
      camera.value.srcObject = stream
      showCamera.value = true
      streamRef.value = stream
      camera.value.onloadedmetadata = () => {
        // Adjust the canvas size to match video stream
        canvas.value.width = camera.value.videoWidth;
        canvas.value.height = camera.value.videoHeight;
      };
    }
  ).catch(error => {
    console.log('Error accessing camera:', error)
  })
}

const capturePhoto = () => {
  const context = canvas.value.getContext('2d');
  context.drawImage(camera.value, 0, 0, canvas.value.width, canvas.value.height);

  const imageUrl = canvas.value.toDataURL('image/png');
  avatarURL.value = imageUrl
  const link = document.createElement('a');

  link.href = imageUrl;
  link.download = 'captured-image.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const stopCamera = () => {
  if (streamRef.value) {
    streamRef.value.getTracks().forEach(track => track.stop());
    camera.value.srcObject = null;
  }
  showCamera.value = false
}

//user data
const validateEmail = (value) => {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return pattern.test(value) || 'Invalid e-mail';
};

const rules = ref({
  required: value => !!value || 'Field is required',
  email: value => validateEmail(value)
});

</script>

<style lang="scss" scoped>
@import "@/assets/scss/profile";
</style>
