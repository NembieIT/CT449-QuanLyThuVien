<template lang="">
    <router-link :to="goto" class="flex items-center justify-center gap-5 md:text-3xl border p-5 rounded-2xl w-full hover:bg-black/50 transition-all">
        <i :class="icon"></i>
        <h1>{{title}}</h1>
    </router-link>
</template>
<script setup>
defineProps({
    title:String,
    icon:String,
    goto:String,
})
</script>