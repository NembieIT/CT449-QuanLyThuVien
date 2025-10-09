<template lang="">
    <div class="p-5 w-full h-full bg-white rounded-2xl overflow-hidden flex flex-col items-center justify-start gap-5">
        <div class="w-full flex items-center justify-center p-5">
            <img src="../../assets/vue.svg" alt="Logo">
        </div>
        <div class="mt-15 flex flex-col items-center justify-center gap-5 w-full">
            <SidebarItem title="Homepage" icon="fa-house"></SidebarItem>
            <SidebarItem title="Homepage" icon="fa-house"></SidebarItem>
            <SidebarItem title="Homepage" icon="fa-house"></SidebarItem>
        </div>
    </div>
</template>
<script setup>
    import SidebarItem from './sidebarItem.vue';
</script>