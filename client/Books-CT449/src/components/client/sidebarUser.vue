<template lang="">
    <Motion v-if="loaded && props.sidebar" :initial="{ x: -500 }" :animate="load ? { x: 0 } : {x: -500}"
        :transition="{ duration: 0.5 }"
        class="absolute lg:static flex flex-col items-center h-full w-1/2 md:w-[40%] lg:w-full bg-white z-10">
        <CloseOutlined v-if="mobileSize" class="absolute right-5 top-5 cursor-pointer" @click="closeSidebar" />
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
                <UnorderedListOutlined />
                <span>Phân loại</span>
            </router-link>
            <router-link to="/search"
                class="w-full p-3 flex items-center justify-start gap-5 cursor-pointer hover:bg-blue-200/70 rounded-[10px]"
                :class="{
                    'bg-blue-200' : page == '/search',
                }">
                <SearchOutlined />
                <span>Tìm kiếm</span>
            </router-link>
            <router-link to="/borrow"
                class="w-full p-3 flex items-center justify-start gap-5 cursor-pointer hover:bg-blue-200/70 rounded-[10px]"
                :class="{
                    'bg-blue-200' : page == '/borrow',
                }">
                <BookOutlined />
                <span>Sách đang mượn</span>
            </router-link>
            <router-link to="/favorite"
                class="w-full p-3 flex items-center justify-start gap-5 cursor-pointer hover:bg-blue-200/70 rounded-[10px]"
                :class="{
                    'bg-blue-200' : page == '/favorite',
                }">
                <HeartOutlined />
                <span>Sách yêu thích</span>
            </router-link>
        </div>

        <div class="flex flex-col gap-5 w-full h-[20%] p-5">
            <router-link to="/inform"
                class="w-full p-3 flex items-center justify-start gap-5 cursor-pointer hover:bg-blue-200/70 rounded-[10px]">
                <UserOutlined />
                <span>Thông tin cá nhân</span>
            </router-link>
            <div @click="handlelogout"
                class="w-full p-3 flex items-center justify-start gap-5 cursor-pointer hover:bg-blue-200/70 rounded-[10px]">
                <LogoutOutlined />
                <span>Đăng xuất</span>
            </div>
        </div>
    </Motion>
</template>
<script setup>
import { defineProps, ref, onMounted, watch } from 'vue';
import AuthControllerApi from '../../controllerApi/auth.controller';
import { useRoute, useRouter } from 'vue-router';
import { Motion } from "@motionone/vue";

const route = useRoute();
const router = useRouter();
const page = ref('');
const loaded = ref(false);
const mobileSize = ref(false);
const load = ref(false);

const props = defineProps({
    sidebar: Boolean
})
const emit = defineEmits(['closeSidebar', 'showSidebar']);

watch(() => route.fullPath, (newVal, oldVal) => {
    page.value = newVal;
})
watch(() => props.sidebar, (newVal, oldVal) => {
    if (!newVal) {
        load.value = false;
    } else {
        load.value = true;
    }
})

// Side function
function closeSidebar() {
    load.value = false;
    setTimeout(() => {
        emit('closeSidebar');
    }, 500)
}
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        mobileSize.value = false
        emit('showSidebar')
        load.value = true
    } else {
        mobileSize.value = true
        emit('closeSidebar')
    }
})

const handlelogout = () => {
    AuthControllerApi.logout();
    router.push("/auth");
}

function getSize() {
    if (window.innerWidth > 1024) {
        mobileSize.value = false;
        emit('showSidebar');
    } else {
        mobileSize.value = true;
    }
}

onMounted(() => {
    getSize();
    page.value = route.fullPath;
    loaded.value = true;
})
</script>