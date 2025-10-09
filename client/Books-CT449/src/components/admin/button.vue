<template lang="">
    <router-link :to="`/admin${goto}`" :class="`${btnclass} border p-2 rounded-[10px] cursor-pointer`"><span><i
                :class="`fa-solid ${icon}`"></i></span> {{title}}</router-link>
</template>
<script setup>
import { defineProps } from 'vue';
defineProps({
    title: String,
    btnclass: String,
    icon: String,
    goto: String
})
</script>