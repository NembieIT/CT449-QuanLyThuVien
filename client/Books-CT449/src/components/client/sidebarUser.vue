<template lang="">
    <div v-if="loaded" class="flex flex-col items-center h-full w-full bg-white">
        <div class="h-[20%] w-full">
            <img class="h-full w-full object-contain"
                src="../../../public/Red_and_Blue_Modern_School_Logo-removebg-preview.png" alt="Logo">
        </div>
        <div class="flex flex-col gap-5 w-full h-[55%] p-5">
            <router-link to="/trangchu"
                class="w-full p-3 flex items-center justify-start gap-5 cursor-pointer hover:bg-blue-200/70 transition-all rounded-[10px]"
                :class="{
                    'bg-blue-200' : page == '/trangchu',
                }">
                <HomeOutlined />
                <span>Trang chủ</span>
            </router-link>
            <router-link to="/category"
                class="w-full p-3 flex items-center justify-start gap-5 cursor-pointer hover:bg-blue-200/70 rounded-[10px]"
                :class="{
                    'bg-blue-200' : page == '/category',
                }">
                <HomeOutlined />
                <span>Phân loại</span>
            </router-link>
            <router-link to="/borrow"
                class="w-full p-3 flex items-center justify-start gap-5 cursor-pointer hover:bg-blue-200/70 rounded-[10px]"
                :class="{
                    'bg-blue-200' : page == '/borrow',
                }">
                <HomeOutlined />
                <span>Sách đang mượn</span>
            </router-link>
            <router-link to="/favorite"
                class="w-full p-3 flex items-center justify-start gap-5 cursor-pointer hover:bg-blue-200/70 rounded-[10px]"
                :class="{
                    'bg-blue-200' : page == '/favorite',
                }">
                <HomeOutlined />
                <span>Sách yêu thích</span>
            </router-link>
        </div>

        <div class="flex flex-col gap-5 w-full h-[20%] p-5">
            <router-link to="/inform"
                class="w-full p-3 flex items-center justify-start gap-5 cursor-pointer hover:bg-blue-200/70 rounded-[10px]">
                <UserOutlined />
                <span>Thông tin cá nhân</span>
            </router-link>
            <router-link to="/auth"
                class="w-full p-3 flex items-center justify-start gap-5 cursor-pointer hover:bg-blue-200/70 rounded-[10px]">
                <LogoutOutlined />
                <span>Đăng xuất</span>
            </router-link>
        </div>
    </div>
</template>
<script setup>
import { defineProps, ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const page = ref('');
const loaded = ref(false);

watch(() => route.fullPath, (newVal, oldVal) => {
    page.value = newVal;
})

onMounted(() => {
    page.value = route.fullPath;
    loaded.value = true;
})
</script>