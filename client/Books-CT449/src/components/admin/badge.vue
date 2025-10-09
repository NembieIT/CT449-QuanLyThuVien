<template lang="">
    <div :class="class" class="rounded-[10px] md:px-5 px-2 py-2 font-bold text-[15px] md:text-[16px] text-gray-900">
        <span>{{title}} : {{count}}</span>
    </div>
</template>
<script setup>
defineProps({
    title: String,
    count: Number,
    class: String
})
</script>