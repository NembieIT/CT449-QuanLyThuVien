<template lang="">
    <div
        class="bg-black flex items-center justify-center gap-5 p-5 w-full text-2xl md:text-3xl text-white rounded-[10px] cursor-pointer hover:opacity-80 transition-all">
        <i :class="['fa-solid ',icon]"></i>
        <h2>{{title}}</h2>
    </div>
</template>
<script setup>
    defineProps({
        title: String,
        icon: String
    })
</script>