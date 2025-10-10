<template lang="">
    <router-link :to="`/admin${goto}`"
        class="bg-black flex items-center justify-start gap-5 p-2 w-full h-full overflow-clip text-[18px] text-white rounded-[10px] cursor-pointer hover:opacity-80 transition-all">
        <i :class="['fa-solid ',icon]"></i>
        <h2>{{title}}</h2>
    </router-link>
</template>
<script setup>
defineProps({
    title: String,
    icon: String,
    goto: String
})
</script>