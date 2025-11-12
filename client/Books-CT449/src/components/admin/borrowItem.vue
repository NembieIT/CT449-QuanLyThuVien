<template lang="">
    <div
        class="flex items-center justify-start md:justify-between gap-5 p-2 md:p-5 rounded-[10px] bg-backgroundItemAD min-h-[20%] overflow-x-auto">
        <div class="flex items-center justify-start md:justify-between gap-7 min-w-full md:min-w-[60%]">
            <img src="../../assets/vue.svg" alt="AVT">
            <div class="flex items-center justify-center gap-7">
                <h3>{{props.prop1}}</h3>
                <h3>{{props.prop2}}</h3>
                <h3>{{props.prop3}}</h3>
            </div>
            <div class="w-[200px] md:w-[350px] text-center flex items-center justify-end">
                <span v-if="props.status=='pending'"
                    class="text-2xl text-blue-500 bg-black/15 p-2 rounded-2xl">{{dataStatus[props.status]}}</span>
                <span v-if="props.status=='done'"
                    class="text-2xl text-green-800 bg-black/15 p-2 rounded-2xl">{{dataStatus[props.status]}}</span>
                <span v-if="props.status=='borrowing'"
                    class="text-2xl text-gray-700 bg-black/15 p-2 rounded-2xl">{{dataStatus[props.status]}}</span>
                <span v-if="props.status=='late'"
                    class="text-2xl text-yellow-600 bg-black/15 p-2 rounded-2xl">{{dataStatus[props.status]}}</span>
                <span v-if="props.status=='deny'"
                    class="text-2xl text-red-600 bg-black/15 p-2 rounded-2xl">{{dataStatus[props.status]}}</span>
            </div>
        </div>
        <div class="flex items-center justify-end gap-2 md:gap-7 min-w-fit">
            <button v-if="page=='all' && props.status=='borrowing'" @click="handleComplete(props.id)"
                class="bg-white text-black p-1 md:p-2 rounded-[5px] cursor-pointer hover:bg-green-300 border transition-all duration-300">Hoàn
                tất đơn</button>
            <button v-if="page=='pending'" @click="handleAccept(props.id)"
                class="bg-white text-black p-1 md:p-2 rounded-[5px] cursor-pointer hover:bg-green-300 border transition-all duration-300">Duyệt
                đơn</button>
            <button v-if="page=='pending'" @click="handleDeny(props.id)"
                class="bg-white text-black p-1 md:p-2 rounded-[5px] cursor-pointer hover:bg-red-300 border transition-all duration-300">Từ
                chối</button>
            <button v-if="page=='all'" @click="handleDelete(props.id)"
                class="bg-white text-black p-1 md:p-2 rounded-[5px] cursor-pointer hover:bg-red-300 border transition-all duration-300">Xoá
                đơn</button>
            <button v-if="page=='user'" @click="handleDelete(props.id)"
                class="bg-white text-black p-1 md:p-2 rounded-[5px] cursor-pointer hover:bg-red-300 border transition-all duration-300">Xoá
                người dùng</button>
            <button v-if="page=='nhanvien'" @click="handleDelete(props.id)"
                class="bg-white text-black p-1 md:p-2 rounded-[5px] cursor-pointer hover:bg-red-300 border transition-all duration-300">Xoá
                nhân viên</button>
            <button v-if="page=='nxb'" @click="handleDelete(props.id)"
                class="bg-white text-black p-1 md:p-2 rounded-[5px] cursor-pointer hover:bg-red-300 border transition-all duration-300">Xoá
                nhà xuất bản</button>
            <button v-if="page=='books'" @click="handleDelete(props.id)"
                class="bg-white text-black p-1 md:p-2 rounded-[5px] cursor-pointer hover:bg-red-300 border transition-all duration-300">Xoá
                sách</button>
            <button @click="handleDetail(props.id)"
                class="bg-white text-black p-1 md:p-2 rounded-[5px] cursor-pointer hover:bg-black/20 border transition-all duration-300">Xem
                chi tiết</button>
        </div>
    </div>
</template>
<script setup>
    import { defineProps, defineEmits, onMounted } from 'vue';
    import { dataStatus } from '../../data/data'
    const props = defineProps({
        id: String,
        prop1: String,
        prop2: String || Number,
        prop3: String,
        status: String,
        page: String
    })
    const emit = defineEmits(['details', 'delete', 'accept', 'deny', 'complete']);
    function handleDetail(id) {
        emit('details', id);
    }
    function handleDelete(id) {
        emit('delete', id);
    }
    function handleAccept(id) {
        emit('accept', id);
    }
    function handleDeny(id) {
        emit('deny', id);
    }
    function handleComplete(id) {
        emit('complete', id);
    }
</script>