<template>
    <div class="w-full h-full flex items-center bg-white">
        <div class="w-[80%] h-full flex items-center justify-start p-5">
            <div class="bg-gray-500/40 p-2 w-[50%] rounded-[10px] flex items-center gap-5">
                <SearchOutlined class="cursor-pointer p-2 rounded-[10px] hover:bg-white/50" />
                <input class="outline-none" type="text" placeholder="Tìm tên sách theo ý">
            </div>
        </div>
        <div v-if="props.user" class="w-[20%] h-full flex items-center justify-end gap-5 p-5">
            <BellOutlined class="cursor-pointer scale-150" />
            <div class="flex items-center gap-5">
                <img src="../../../public/vite.svg" alt="Avt">
                <a-dropdown>
                    <div class="ant-dropdown-link flex items-center gap-3" @click.prevent>
                        <span>USER</span>
                        <DownOutlined />
                    </div>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item>
                                <router-link to="/inform">Thông tin cá nhân</router-link>
                            </a-menu-item>
                            <a-menu-item>
                                <button @click="handlelogout">Đăng xuất</button>
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </div>
        </div>
        <div v-else class="w-[20%] h-full flex items-center justify-end gap-5 p-5">
            <router-link to="/auth"
                class="bg-gray-600 p-3 text-white rounded-[5px] hover:bg-gray-900 transition-all">Đăng
                Ký</router-link>
            <router-link to="/auth" class="text-gray-500 hover:text-gray-900">Đăng Nhập</router-link>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
import AuthControllerApi from '../../controllerApi/auth.controller';
import { useRouter } from 'vue-router';

const router = useRouter();

const handlelogout = () => {
    AuthControllerApi.logout();
    router.push("/auth");
}
const props = defineProps({
    user: String
})
</script>