<template>
    <div>
      <input type="file" @change="handleFileChange" accept="image/*" ref="fileInput" style="display: none;" />
    </div>
  </template>
<script>
import { ref } from 'vue';
import { storage } from '@/firebaseConfig'; // Adjust the path according to your project structure
import { ref as firebaseRef, uploadBytes, getDownloadURL } from 'firebase/storage';

export default {
  name: 'AddPhoto',
  emits: ['photoUploaded'],
  setup(props, { emit }) {
    const fileInput = ref(null);

    const triggerInput = () => fileInput.value.click();

    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      
      // Retrieve the user's email as an identifier from localStorage
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        console.error("No user email found.");
        return; // Exit the function if there is no user email
      }

      // Use a sanitized version of the userEmail in the storage path
      // Be cautious with using email directly, consider hashing or another form of anonymization
      const sanitizedEmail = userEmail.replace(/[^a-zA-Z0-9]/g, "_"); // Basic sanitization
      const storageRef = firebaseRef(storage, `/user_images/${sanitizedEmail}/${file.name}`);
      
      try {
        const uploadTaskSnapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
        emit('photoUploaded', downloadURL);
      } catch (error) {
        console.error("Error uploading file: ", error);
      }
    };

    return {
      fileInput,
      triggerInput,
      handleFileChange,
    };
  },
};
</script>

