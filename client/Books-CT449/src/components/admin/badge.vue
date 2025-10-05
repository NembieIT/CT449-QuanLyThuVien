<template lang="">
    <div :class="class" class="bg-black/50 rounded-[5px] md:rounded-2xl md:px-5 px-2 py-2 font-bold text-[15px] md:text-2xl">
        <span>{{title}} : {{pending}}</span>
    </div>
</template>
<script setup>
defineProps({
    title: String,
    pending: Number,
    class: String
})
</script>