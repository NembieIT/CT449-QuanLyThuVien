<template lang="">
    <div
        class="flex items-center justify-start md:justify-between gap-5 p-2 md:p-5 rounded-[10px] bg-backgroundItemAD min-h-[20%] overflow-x-auto">
        <div class="flex items-center justify-start md:justify-center gap-7 overflow-clip">
            <img src="../../assets/vue.svg" alt="AVT">
            <div class="flex items-center justify-center gap-7 w-[250px]">
                <h3>{{name}}</h3>
                <h3>{{email}}</h3>
                <h3>{{phone}}</h3>
            </div>
        </div>
        <div class="flex items-center justify-center gap-2 md:gap-7 w-[700px]">
            <div class="w-[200px] md:w-[350px] text-center">
                <span class="text-2xl text-green-500">{{status}}</span>
            </div>
            <div class="flex items-center w-fit lg:w-full justify-center gap-5">
                <button
                    class="bg-white text-black p-1 md:p-2 rounded-[5px] cursor-pointer hover:bg-green-300 border transition-all duration-300">Duyệt
                    đơn</button>
                <button
                    class="bg-white text-black p-1 md:p-2 rounded-[5px] cursor-pointer hover:bg-red-300 border transition-all duration-300">Từ
                    chối</button>
                <button
                    class="bg-white text-black p-1 md:p-2 rounded-[5px] cursor-pointer hover:bg-black/20 border transition-all duration-300">Xem
                    chi tiết</button>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { defineProps } from 'vue';
    defineProps({
        name: String,
        email: String,
        phone: String,
        status: String
    })
</script>