<template lang="">
    <div
        :class="`flex flex-col items-start md:flex-row md:items-center justify-start md:justify-between gap-5 p-2 md:p-5 rounded-[10px] ${darkmode?'bg-gray-800':'bg-backgroundItemAD'} min-h-[20%] overflow-auto md:overflow-hidden`">
        <div class="flex items-center justify-between gap-7 w-full xl:w-[60%]">
            <div class="flex items-center justify-start gap-5 w-[60%] md:w-[70%]">
                <div class="w-[50px] h-full">
                    <img src="../../assets/vue.svg" alt="AVT">
                </div>
                <div :class="`flex items-center justify-start gap-7 ${darkmode?'text-white':''} font-bold`">
                    <h3>{{props.prop1}}</h3>
                    <h3>{{props.prop2}}</h3>
                    <h3>{{props.prop3}}</h3>
                    <h3>{{props.prop4}}</h3>
                </div>
            </div>
            <div class="w-[40%] md:w-[30%] text-center flex items-center justify-end">
                <span v-if="props.status=='pending'"
                    :class="`w-full font-text2 text-[18px] text-blue-500 ${darkmode?'md:bg-white':'md:bg-black/15'} p-2 rounded-2xl`">{{dataStatus[props.status]}}</span>
                <span v-if="props.status=='done'"
                    :class="`w-full font-text2 text-[18px] text-green-800 ${darkmode?'md:bg-white':'md:bg-black/15'} p-2 rounded-2xl`">{{dataStatus[props.status]}}</span>
                <span v-if="props.status=='borrowing'"
                    :class="`w-full font-text2 text-[18px] text-gray-700 ${darkmode?'md:bg-white':'md:bg-black/15'} p-2 rounded-2xl`">{{dataStatus[props.status]}}</span>
                <span v-if="props.status=='late'"
                    :class="`w-full font-text2 text-[18px] text-yellow-600 ${darkmode?'md:bg-white':'md:bg-black/15'} p-2 rounded-2xl`">{{dataStatus[props.status]}}</span>
                <span v-if="props.status=='deny'"
                    :class="`w-full font-text2 text-[18px] text-red-600 ${darkmode?'md:bg-white':'md:bg-black/15'} p-2 rounded-2xl`">{{dataStatus[props.status]}}</span>
            </div>
        </div>
        <div class="flex items-center justify-end gap-2 md:gap-7 min-w-fit">
            <button v-if="page=='all' && props.status=='borrowing'"
                @click="handleComplete({idborrow: props.id, bookid: props.bookid})"
                class="bg-white text-black p-1 md:p-2 rounded-[5px] cursor-pointer hover:bg-green-300 border transition-all duration-300">Hoàn
                tất đơn</button>
            <button v-if="page=='pending'" @click="handleAccept(props.id)"
                class="bg-white text-black p-1 md:p-2 rounded-[5px] cursor-pointer hover:bg-green-300 border transition-all duration-300">Duyệt
                đơn</button>
            <button v-if="page=='pending'" @click="handleDeny({idborrow: props.id, bookid: props.bookid})"
                class="bg-white text-black p-1 md:p-2 rounded-[5px] cursor-pointer hover:bg-red-300 border transition-all duration-300">Từ
                chối</button>
            <button v-if="page=='all'" @click="handleDelete(props.id)"
                class="bg-white text-black p-1 md:p-2 rounded-[5px] cursor-pointer hover:bg-red-300 border transition-all duration-300">Xoá
                đơn</button>
            <button v-if="page=='user'" @click="handleGetID(props.id)"
                class="bg-white text-black p-1 md:p-2 rounded-[5px] cursor-pointer hover:bg-red-300 border transition-all duration-300">Lấy
                ID</button>
            <button v-if="page=='user'" @click="handleDelete(props.id)"
                class="bg-white text-black p-1 md:p-2 rounded-[5px] cursor-pointer hover:bg-red-300 border transition-all duration-300">Xoá
                người dùng</button>
            <button v-if="page=='user' && props.prop4=='unlock'" @click="handleLock(props.id)"
                class="bg-white text-black p-1 md:p-2 rounded-[5px] cursor-pointer hover:bg-red-300 border transition-all duration-300">Khoá
                người dùng</button>
            <button v-if="page=='user' && props.prop4=='lock'" @click="handleUnLock(props.id)"
                class="bg-white text-black p-1 md:p-2 rounded-[5px] cursor-pointer hover:bg-red-300 border transition-all duration-300">Mở khoá
                người dùng</button>
            <button v-if="page=='nhanvien' && props.prop4=='unlock'" @click="handleLock(props.id)"
                class="bg-white text-black p-1 md:p-2 rounded-[5px] cursor-pointer hover:bg-red-300 border transition-all duration-300">Khoá tài khoản</button>
            <button v-if="page=='nhanvien' && props.prop4=='lock'" @click="handleUnLock(props.id)"
                class="bg-white text-black p-1 md:p-2 rounded-[5px] cursor-pointer hover:bg-red-300 border transition-all duration-300">Mở khoá tài khoản</button>
            <button v-if="page=='nhanvien'" @click="handleDelete(props.id)"
                class="bg-white text-black p-1 md:p-2 rounded-[5px] cursor-pointer hover:bg-red-500 border transition-all duration-300">Xoá
                nhân viên</button>
            <button v-if="page=='nxb'" @click="handleDelete(props.id)"
                class="bg-white text-black p-1 md:p-2 rounded-[5px] cursor-pointer hover:bg-red-300 border transition-all duration-300">Xoá
                nhà xuất bản</button>
            <button v-if="page=='author'" @click="handleDelete(props.id)"
                class="bg-white text-black p-1 md:p-2 rounded-[5px] cursor-pointer hover:bg-red-300 border transition-all duration-300">Xoá
                tác giả</button>
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
    prop2: [String, Number],
    prop3: [String, Number],
    prop4: [String, Number],
    status: String,
    bookid: String,
    img: String,
    page: String,
    darkmode: Boolean
})
const emit = defineEmits(['details', 'delete', 'accept', 'deny', 'complete', 'getid', 'lock', 'unlock']);
function handleDetail(id) {
    emit('details', id);
}
function handleDelete(id) {
    emit('delete', id);
}
function handleLock(id) {
    emit('lock', id);
}
function handleUnLock(id) {
    emit('unlock', id);
}
function handleAccept(id) {
    emit('accept', id);
}
function handleDeny(data) {
    emit('deny', data);
}
function handleComplete(data) {
    emit('complete', data);
}
function handleGetID(id) {
    emit('getid', id);
}
</script>