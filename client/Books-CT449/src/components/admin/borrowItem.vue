<template lang="">
    <div
        class="flex items-center justify-start md:justify-between gap-5 p-2 md:p-5 rounded-[10px] bg-backgroundItemAD min-h-[20%] overflow-x-auto overflow-y-hidden">
        <div class="flex items-center justify-start md:justify-center gap-7">
            <img src="../../assets/vue.svg" alt="AVT">
            <div class="flex items-center justify-center gap-7 w-fit">
                <h3>{{props.prop1}}</h3>
                <h3>{{props.prop2}}</h3>
                <h3>{{props.prop3}}</h3>
            </div>
        </div>
        <div class="flex items-center justify-end gap-2 md:gap-7 w-fit">
            <div class="w-[200px] md:w-[350px] text-center">
                <span class="text-2xl text-green-500">{{props.status}}</span>
            </div>
            <div class="flex items-center w-fit lg:w-full justify-end gap-5">
                <button v-if="page=='all' || page=='pending'"
                    class="bg-white text-black p-1 md:p-2 rounded-[5px] cursor-pointer hover:bg-green-300 border transition-all duration-300">Duyệt
                    đơn</button>
                <button v-if="page=='all' || page=='pending'"
                    class="bg-white text-black p-1 md:p-2 rounded-[5px] cursor-pointer hover:bg-red-300 border transition-all duration-300">Từ
                    chối</button>
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
    </div>
</template>
<script setup>
import { defineProps, defineEmits, onMounted } from 'vue';
const props = defineProps({
    id: String,
    prop1: String,
    prop2: String,
    prop3: String,
    status: String,
    page: String
})
const emit = defineEmits(['details', 'delete']);
function handleDetail(id) {
    emit('details', id);
}
function handleDelete(id) {
    emit('delete', id);
}

</script>