<template lang="">
    <Motion v-if="props.showDetailMobile" :initial="{ x: 500 }" :animate="load ? { x: 0 } : {x: 500}"
        :transition="{ duration: 0.5 }"
        class="absolute top-0 right-0 lg:static bg-blue-200 h-full  w-1/2 md:w-[40%] lg:w-full flex flex-col p-5">
        <CloseOutlined v-if="mobileSize" @click="closeDetail"
            class="absolute right-5 top-5 cursor-pointer scale-120 bg-gray-400 p-2 rounded-full hover:bg-white transition-all" />
        <div class="p-5 h-[50%] flex items-center justify-center bg-white/70 rounded-2xl">
            <img class="h-full"
                :src="props.book?.IMAGEURL || 'https://play.google.com/books/publisher/content/images/frontcover/j5jzEAAAQBAJ?fife=w256-h256'"
                alt="">
        </div>
        <div class="h-[40%] text-left flex flex-col gap-2 overflow-scroll mt-5">
            <span class="uppercase text-2xl text-center">{{props.book?.TENSACH || 'Tên Sách'}}</span>
            <span class="text-gray-700/80 break-all">{{props.book?.TACGIA || 'Tác giả'}}</span>
            <span class="text-red-400 flex items-center gap-5">
                <HeartOutlined class="cursor-pointer" /> <span>{{props.book?.FAV||0}}</span>
            </span>
            <span>{{props.book?.DESC||'Miêu tả sách'}}</span>
        </div>
        <div class="h-[10%] flex items-center justify-center">
            <div @click="openModel"
                class="bg-white flex items-center justify-center w-[65%] p-3 rounded-[10px] hover:bg-blue-700 hover:text-white cursor-pointer transition-all">
                <i class="fa-solid fa-book"></i>
                <span>Mượn sách</span>
            </div>
        </div>
    </Motion>
</template>
<script setup>
import { defineProps, ref, onMounted, watch } from 'vue';
import { Motion } from "@motionone/vue";

const emit = defineEmits(["openModel", "closeDetail", "showDetail"]);
const showDetail = ref(false);
const mobileSize = ref(false);
const load = ref(false);

const props = defineProps({
    book: Object,
    showDetailMobile: Boolean
})

watch(() => props.showDetailMobile, (newVal, oldVal) => {
    if (!newVal) {
        load.value = false;
    } else {
        load.value = true;
    }
})

function closeDetail() {
    load.value = false;
    setTimeout(() => {
        emit('closeDetail');
    }, 500)
}
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        mobileSize.value = false
        emit('showDetail')
        load.value = true
    } else {
        mobileSize.value = true
        emit('closeDetail');
    }
})

function getSize() {
    if (window.innerWidth > 1024) {
        mobileSize.value = false;
        emit('showDetail');
    } else {
        mobileSize.value = true;
    }
}
const openModel = () => {
    emit('openModel');
}

onMounted(() => {
    getSize();
})
</script>