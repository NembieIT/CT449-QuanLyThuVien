<template>
    <div v-if="loaded" class="h-full w-full p-5 flex flex-col gap-[6%]">
        <div class="h-fit w-full bg-white p-5">
            <div class="h-[10%] flex items-center justify-between">
                <span class="text-2xl uppercase">Sách hot !!!</span>
                <div
                    class="flex items-center text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white p-2 rounded-2xl transition-all">
                    <span class="uppercase">See All</span>
                    <RightOutlined />
                </div>
            </div>
            <div class="h-[80%] flex items-center justify-center gap-[5%] p-5 flex-wrap overflow-scroll mt-5">
                <div v-if="bookHot.length > 0" v-for="(item, index) in bookHot" :key="item._id || index"
                    class="w-[40%] lg:w-[20%] h-1/2 lg:h-full bg-gray-500/40 rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between">
                    <img class="h-[60%] w-full object-cover hover:object-contain hover:scale-90 transition-all rounded-2xl"
                        @click="handleDetail(item)"
                        :src="item.IMAGEURL || 'https://play.google.com/books/publisher/content/images/frontcover/j5jzEAAAQBAJ?fife=w256-h256'"
                        alt="Book">
                    <div class="h-[40%] flex flex-col justify-center p-3 text-center">
                        <span>{{ item.TENSACH }}</span>
                        <span class="text-black/40">{{ item.TACGIA.TENTACGIA }}</span>
                    </div>
                </div>
                <div v-else class="flex items-center justify-center h-full w-[20%]">
                    <img class="h-full w-full" src="../../../public/notfound.png" alt="NotFound">
                </div>
            </div>
        </div>
        <div class="h-fit w-full bg-white p-5">
            <div class="h-[10%] flex items-center justify-between">
                <span class="text-2xl uppercase">Sách mới nhất !</span>
                <div
                    class="flex items-center text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white p-2 rounded-2xl transition-all">
                    <span class="uppercase">See All</span>
                    <RightOutlined />
                </div>
            </div>
            <div v-if="newestBook.length > 0"
                class="h-[80%] flex items-center justify-center gap-[5%] p-5 flex-wrap overflow-scroll mt-5">
                <div v-for="(item, index) in newestBook" :key="item._id || index"
                    class="w-[40%] lg:w-[20%] h-1/2 lg:h-full bg-gray-500/40 rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between">
                    <img class="h-[60%] w-full object-cover hover:object-contain hover:scale-90 transition-all rounded-2xl"
                        @click="handleDetail(item)"
                        :src="item.IMAGEURL || 'https://play.google.com/books/publisher/content/images/frontcover/j5jzEAAAQBAJ?fife=w256-h256'"
                        alt="Book">
                    <div class="h-[40%] flex flex-col justify-center p-3 text-center">
                        <span>{{ item.TENSACH }}</span>
                        <span class="text-black/40">{{ item.TACGIA.TENTACGIA }}</span>
                    </div>
                </div>
            </div>
            <div v-else class="flex items-center justify-center h-full w-[20%]">
                <img class="h-full w-full" src="../../../public/notfound.png" alt="NotFound">
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineProps, onMounted, ref, defineEmits } from 'vue';

const loaded = ref(false);
const bookHot = ref(null);
const newestBook = ref(null);
const props = defineProps({
    dataBook: Array
})
const emit = defineEmits(['details']);
function handleDetail(item) {
    emit('details', item);
}
onMounted(() => {
    bookHot.value = props.dataBook.filter(item => item.FAV > 2).slice(0, 4);
    newestBook.value = props.dataBook.slice(-4);
    loaded.value = true;
})
</script>