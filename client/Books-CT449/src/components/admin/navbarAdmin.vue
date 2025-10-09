<template lang="">
    <div class="h-[10%]">
        <nav class="bg-gray-500/50 p-5 h-[100%] w-full rounded-[10px] flex items-center justify-between">
            <button v-if="mobileSize" @click="toggleSidebar"><i class="fa-solid fa-bars hover:text-white transition-all"></i></button>
            <div>
                <h1>Xin chào Tiến Dũng !</h1>
            </div>

            <div class="flex items-center justify-center gap-5 text-2xl md:text-3xl">
                <i class="fa-solid fa-moon"></i>
                <i class="fa-solid fa-bell"></i>
                <img class="cursor-pointer" src="../../assets/vue.svg" alt="Avt">
            </div>
        </nav>
    </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';
defineProps({
    mobileSize: Boolean
})
const emit = defineEmits(['toggleSidebar'])
function toggleSidebar() {
    emit('toggleSidebar');
}
</script>