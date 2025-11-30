<template>
    <div v-if="loaded" class="relative h-screen w-screen flex items-center justify-center font-text2">
        <div class="w-[15vw] h-full">
            <SidebarUser></SidebarUser>
        </div>

        <div class="w-[85vw] h-full">
            <div class="h-[10vh] w-full">
                <NavbarUser :user="user"></NavbarUser>
            </div>
            <div class="h-[90vh] w-full flex items-center bg-gray-500">
                <div class="w-[80%] h-full overflow-y-scroll overflow-x-hidden">
                    <Homepage></Homepage>
                </div>

                <div class="w-[20%] h-full">
                    <DetailBook @openModel="openModelDetail"></DetailBook>
                </div>
            </div>
        </div>

        <Motion v-if="modelDetail" :initial="{ scale: 0.5 }" :animate="load ? { scale: 1 } : { scale: 0 }"
            :transition="{ duration: 0.5 }" class="absolute h-[65%] w-1/2 bg-gray-300 rounded-[10px] p-5">
            <div class="w-full flex items-center justify-end">
                <CloseCircleOutlined class="cursor-pointer scale-150" @click="openModelDetail" />
            </div>
            <div class="flex items-start justify-center border">
                <div class="w-1/2 p-2 border">
                    <img src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?semt=ais_hybrid&w=740&q=80"
                        alt="">
                </div>
                <div class="w-1/2 text-center p-5 flex flex-col gap-3">
                    <h2 class="text-4xl">Ten Sach</h2>
                    <span>Tac gia : Author</span>
                    <span>Love : 10</span>
                    <span>Số lượng còn lại: 10</span>
                    <a-form-item label="Thời gian mượn" name="region">
                        <a-select v-model:value="formState.timeBorrow" placeholder="Chọn thời gian trả sách">
                            <a-select-option v-for="(item, index) in dataDate" :key="index" :value="item[index]">{{ item
                            }}</a-select-option>
                        </a-select>
                    </a-form-item>
                </div>
            </div>
        </Motion>
    </div>

</template>
<script setup>
import NavbarUser from '../../components/client/navbarUser.vue';
import SidebarUser from '../../components/client/sidebarUser.vue';
import Homepage from '../../components/client/homepage.vue';
import DetailBook from '../../components/client/detailBook.vue';
import { Motion } from '@motionone/vue';
import { ref, onMounted, reactive } from 'vue';
import { dataDate } from '../../data/data'

const user = ref(null);
const loaded = ref(false);
const modelDetail = ref(false);
const load = ref(false);

const formState = reactive({
    timeBorrow: undefined
})

const openModelDetail = () => {
    if (modelDetail.value) {
        load.value = false;
        setTimeout(() => {
            modelDetail.value = false;
        }, 500);
    } else {
        load.value = true;
        modelDetail.value = true;
    }
}

onMounted(() => {
    user.value = localStorage.getItem('accessToken');
    loaded.value = true;
})
</script>