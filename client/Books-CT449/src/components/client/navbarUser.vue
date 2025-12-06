<template>
    <div class="w-full h-full flex items-center bg-white">
        <div class="w-[80%] h-full flex items-center justify-start p-5 gap-5">
            <MenuOutlined class="visible lg:invisible lg:pointer-events-none cursor-pointer" @click="toggleSidebar" />
            <form @submit="handleSubmit" v-if="useSearch"
                class="bg-gray-500/40 p-2 w-fit md:w-1/2 rounded-[10px] flex items-center gap-5">
                <SearchOutlined class="cursor-pointer p-2 rounded-[10px] hover:bg-white/50" />
                <input @input="inputSearch" v-model="searchValue" class="outline-none w-[80%] md:w-full text-[15px]"
                    type="text" placeholder="Tìm tên sách theo ý">
            </form>
        </div>
        <div v-if="props.user && Object.keys(props.user).length > 0"
            class="w-[20%] h-full flex items-center justify-end gap-5 p-5">
            <div class="flex items-center gap-5">
                <img src="../../../public/vite.svg" alt="Avt">
                <a-dropdown>
                    <div class="ant-dropdown-link flex items-center gap-3" @click.prevent>
                        <span>{{ props.user.username }}</span>
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
import { defineProps, ref, watch, onMounted } from 'vue';
import AuthControllerApi from '../../controllerApi/auth.controller';
import { useRouter } from 'vue-router';

const props = defineProps({
    user: Object,
    page: String,
})

const useSearch = ref(false);

const router = useRouter();

const searchValue = ref('');
const emit = defineEmits(['toggleSidebar', 'inputSearch']);

function inputSearch() {
    emit('inputSearch', searchValue.value);
}
function handleSubmit(e) {
    e.preventDefault();
}

function toggleSidebar() {
    emit('toggleSidebar');
}

const handlelogout = () => {
    AuthControllerApi.logout();
    router.push("/auth");
}
watch(() => props.page, () => {
    if (props.page == '/search' || props.page == '/all/hot' || props.page == '/all/newest' || props.page == '/borrow' || props.page == '/favorite') useSearch.value = true;
    else useSearch.value = false;
})

onMounted(() => {
    if (props.page == '/search' || props.page == '/all/hot' || props.page == '/all/newest' || props.page == '/borrow' || props.page == '/favorite') useSearch.value = true;
    else useSearch.value = false;
})

</script>