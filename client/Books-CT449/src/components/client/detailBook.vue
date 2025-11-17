<template lang="">
    <div class="bg-blue-200 h-full w-full flex flex-col p-5">
        <div class="p-5 h-[50%] flex items-center justify-center bg-white/70 rounded-2xl">
            <img class="h-full" src="https://m.media-amazon.com/images/I/81WWtmr43AL._UF1000,1000_QL80_.jpg" alt="">
        </div>
        <div class="h-[40%] text-left flex flex-col gap-2 overflow-scroll">
            <span class="uppercase text-2xl text-center">How To Read People Like A Book</span>
            <span class="text-gray-700/80 break-all">Trịnh Trần Phương Tuấn</span>
            <span class="text-red-400 flex items-center gap-5"><HeartOutlined class="cursor-pointer" /> <span>10</span></span>
            <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique vero distinctio numquam doloribus
                id reiciendis laborum optio neque asperiores soluta?</span>
        </div>
        <div class="h-[10%] flex items-center justify-center">
            <div
                class="bg-white flex items-center justify-center w-[65%] p-3 rounded-[10px] hover:bg-blue-700 hover:text-white cursor-pointer transition-all">
                <i class="fa-solid fa-book"></i>
                <span>Mượn sách</span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    Book: Object
})
</script>