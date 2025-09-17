<template lang="">
    <div class="relative p-3 w-full h-[100vh] flex items-start justify-center border border-red-800">
        <Motion v-if="load" :initial="{ x: -100 }" :animate="{ x: 0 }" :exit="{ x: 100 }" :transition="{ duration: 0.5 }" >
            <div class="absolute md:static top-0 left-0 w-[55vw] md:w-[30vw] h-[100vh] bg-red-400 opacity-30"></div>
        </Motion>
            <div class="w-[95%] md:w-[70vw] h-[100vh] bg-amber-400 rounded-2xl p-5">
                <NavbarAdmin></NavbarAdmin>
            </div>
    </div>
    <button @click="load=!load">Click</button>
</template>
<script setup>
    import { ref } from "vue"
    import NavbarAdmin from '../../components/navbarAdmin.vue'
    import { Motion } from "@motionone/vue";

    const load = ref(false)
</script>