<template lang="">
    <div class="h-[10%]">
        <nav
            :class="`${darkmode?'bg-gray-700':'bg-gray-500/50'} p-5 h-[100%] w-full rounded-[10px] flex items-center justify-between`">
            <button v-if="mobileSize" @click="toggleSidebar"><i
                    class="fa-solid fa-bars hover:text-white transition-all"></i></button>
            <div :class="`${darkmode?'text-white':''}`">
                <h1>Xin chào Tiến Dũng !</h1>
            </div>

            <div class="relative flex items-center justify-center gap-5 text-2xl md:text-3xl">
                <i @click="toggleDarkmode" class="fa-solid fa-moon hover:text-white transition-all"></i>
                <div>
                    <a-dropdown>
                        <a class="ant-dropdown-link" @click.prevent>
                            <img class="cursor-pointer" src="../../assets/vue.svg" alt="Avt">
                        </a>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item>
                                    <div class="flex items-center justify-start gap-5">
                                        <UserOutlined />
                                        <router-link to="/admin/all">Giao diện người dùng</router-link>
                                    </div>
                                </a-menu-item>
                                <a-menu-item>
                                    <div class="flex items-center justify-start gap-5">
                                        <LogoutOutlined />
                                        <button @click="logout">Đăng xuất</button>
                                    </div>
                                </a-menu-item>
                            </a-menu>
                        </template>
</a-dropdown>
</div>
</div>
</nav>
</div>
</template>
<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import AuthControllerApi from '../../controllerApi/auth.controller';

defineProps({
    mobileSize: Boolean
})
const darkmode = ref(false);
const emit = defineEmits(['toggleSidebar', 'toggleDarkmode'])
function toggleSidebar() {
    emit('toggleSidebar');
}
function toggleDarkmode() {
    emit('toggleDarkmode');
    darkmode.value = !darkmode.value
}
const logout = () => {
    AuthControllerApi.logout();
}
</script>