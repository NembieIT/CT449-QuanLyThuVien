<template lang="">
    <div
        :class="`relative p-5 w-full h-full ${props.darkmode?'bg-gray-900':'bg-white'} rounded-2xl flex flex-col items-center justify-start gap-[5%] border-red-400 overflow-x-hidden overflow-y-auto`">
        <div v-if="props.mobileSize" class="w-full flex items-center justify-end">
            <i @click="toggleSidebar" class="fa-solid fa-xmark hover:scale-150 transition-all"></i>
        </div>
        <div class="w-full flex items-center justify-center p-5 h-[15%]">
            <img src="../../../public/Red_and_Blue_Modern_School_Logo-removebg-preview.png" alt="Logo">
        </div>
        <div class="flex flex-col items-center justify-start gap-5 w-full h-fit">
            <SidebarItem :darkmode="props.darkmode" goto="/all" title="Tất cả" icon="fa-house"></SidebarItem>
            <SidebarItem :darkmode="props.darkmode" goto="/pending" title="Đợi duyệt" icon="fa-clock"></SidebarItem>
            <SidebarItem :darkmode="props.darkmode" goto="/books" title="Sách" icon="fa-book"></SidebarItem>
            <SidebarItem :darkmode="props.darkmode" goto="/author" title="Tác giả" icon="fa-users"></SidebarItem>
            <SidebarItem :darkmode="props.darkmode" goto="/nxb" title="Nhà xuất bản" icon="fa-building"></SidebarItem>
            <SidebarItem :darkmode="props.darkmode" goto="/user" title="Danh sách người dùng" icon="fa-user"></SidebarItem>
            <SidebarItem v-if="props.isAdmin" :darkmode="props.darkmode" goto="/nhanvien" title="Danh sách nhân viên" icon="fa-building-user"></SidebarItem>
        </div>

        <div class="h-[5%] w-full flex flex-col items-center justify-center text-center">
            <h2 :class="`${props.darkmode?'text-white':'text-black'}`">CT449 - QuanLyThuVien</h2>
            <h2 :class="`${props.darkmode?'text-white':'text-black'}`">B2303803 - Mai Tien Dung</h2>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
import SidebarItem from './sidebarItem.vue';
const props = defineProps({
    mobileSize: Boolean,
    darkmode: Boolean,
    isAdmin: Boolean
})
const emit = defineEmits(['toggleSidebar']);
function toggleSidebar() {
    emit('toggleSidebar');
}
</script>