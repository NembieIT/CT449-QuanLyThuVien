<template lang="">
    <div
        class="relative p-5 w-full h-full bg-white rounded-2xl flex flex-col items-center justify-start gap-[5%] border-red-400 overflow-hidden">
        <div v-if="mobileSize" class="w-full flex items-center justify-end">
            <i @click="toggleSidebar" class="fa-solid fa-xmark hover:scale-150 transition-all"></i>
        </div>
        <div class="w-full flex items-center justify-center p-5 h-[15%] border">
            <img src="../../assets/vue.svg" alt="Logo">
        </div>
        <div class="flex flex-col items-center justify-start gap-5 w-full h-fit">
            <SidebarItem goto="/all" title="Tất cả" icon="fa-house"></SidebarItem>
            <SidebarItem goto="/pending" title="Đợi duyệt" icon="fa-house"></SidebarItem>
            <SidebarItem goto="/nhanvien" title="Danh sách nhân viên" icon="fa-house"></SidebarItem>
            <SidebarItem goto="/doanhthu" title="Doanh thu" icon="fa-house"></SidebarItem>
        </div>

        <div class="h-[5%] w-full flex flex-col items-center justify-center text-center">
            <h2>CT449 - QuanLyThuVien</h2>
            <h2>B2303803 - Mai Tien Dung</h2>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
import SidebarItem from './sidebarItem.vue';
defineProps({
    mobileSize: Boolean
})
const emit = defineEmits(['toggleSidebar']);
function toggleSidebar() {
    emit('toggleSidebar');
}
</script>