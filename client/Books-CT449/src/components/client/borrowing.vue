<template lang="">
    <div v-if="loaded" class="relative h-full w-full bg-gray p-5">
        <div class="h-[10%] flex items-center justify-between p-5 bg-white">
            <h2 class="uppercase border-b-1 text-2xl">Đơn mượn hiện có</h2>
        </div>
        <div class="h-[90%] flex flex-col items-start justify-start gap-5 p-5 overflow-y-scroll bg-white">
            <div v-if="visibleTask?.length > 0" v-for="(item, index) in visibleTask" :key="item._id || index"
                class="w-full bg-gray-500/40 h-full rounded-2xl overflow-scroll flex items-center justify-start flex-wrap border">
                <div
                    class="h-full w-full flex items-center justify-center p-5 text-left gap-5 overflow-hidden">
                    <span class="text-blue-600 w-[30%]">{{ item.bookid?.TENSACH }}</span>
                    <span>Ngày mượn: {{ item.ngaymuon }}</span>
                    <span>Ngày trả: {{ item.ngaytra }}</span>
                    <span v-if="item.status=='done'" class="text-green-700 w-[10%]">Trạng thái: {{
                        formatStatus(item.status)
                        }}</span>
                    <span v-if="item.status=='late'" class="text-yellow-700 w-[10%]">Trạng thái: {{
                        formatStatus(item.status)
                        }}</span>
                    <span v-if="item.status=='deny'" class="text-red-500 w-[10%]">Trạng thái: {{
                        formatStatus(item.status)
                        }}</span>
                    <span v-if="item.status=='pending'" class="text-blue-500 w-[10%]">Trạng thái: {{
                        formatStatus(item.status)
                        }}</span>
                    <span v-if="item.status=='borrowing'" class="text-gray-700 w-[10%]">Trạng thái: {{
                        formatStatus(item.status)
                        }}</span>
                    <span v-if="item.status=='waiting'" class="text-violet-500 w-[10%]">Trạng thái: {{
                        formatStatus(item.status)
                        }}</span>
                    <span class="text-red-500 w-[10%]">Số tiền trễ: {{item.tienphat}}</span>
                </div>
                <div v-if="item.status=='borrowing' || item.status=='late' || item.status=='borrowing'"
                    class="w-[15%] h-full flex items-center justify-center">
                    <span @click="openModelDetail(item.bookid?._id, item._id)"
                        class="w-fit p-2 text-[15px] rounded-2xl cursor-pointer bg-white hover:bg-gray-400 transition-all text-center">Yêu
                        cầu trả sách</span>
                </div>
            </div>
            <div v-else class="flex flex-col items-center justify-center h-full w-full gap-5">
                <img class="h-1/2 w-1/2 object-contain" src="../../../public/notfound.png" alt="NotFound">
                <span>Nội dung tìm kiếm không có !</span>
            </div>
        </div>

        <Motion v-if="modelDetail" :initial="{ scale: 0.5 }" :animate="load ? { scale: 1 } : { scale: 0 }"
            :transition="{ duration: 0.5 }"
            class="absolute top-0 left-1/2 -translate-x-1/2 h-[80%] lg:h-fit w-[90%] lg:w-1/2 bg-gray-300 rounded-[10px] p-5 border overflow-scroll z-20">
            <div class="w-full flex items-center justify-end">
                <CloseCircleOutlined class="cursor-pointer scale-150" @click="closeModelDetail" />
            </div>
            <div
                class="flex flex-col md:flex-row items-center md:items-start justify-start md:justify-center mt-5 md:mt-10 h-[80%]">
                <div class="h-fit w-[80%] md:w-1/2 p-2 flex items-center justify-center">
                    <img :src="detailBook.IMAGEURL || 'https://play.google.com/books/publisher/content/images/frontcover/j5jzEAAAQBAJ?fife=w256-h256'"
                        alt="AVTBook">
                </div>
                <form class="w-full lg:w-1/2 text-center p-5 flex flex-col gap-2 md:gap-3 flex-1">
                    <h2 class="text-4xl">{{ detailBook.TENSACH }}</h2>
                    <span class="text-[15px] text-gray-600">Tác giả: {{ detailBook.TACGIA.TENTACGIA }}</span>
                    <span class="text-[15px] text-gray-600">Nhà xuất bản: {{ detailBook.MANXB.TENNXB }}</span>
                    <span class="text-gray-900 text-[18px]">Sau khi xác nhận, vui lòng trả sách trong hôm nay</span>
                    <button @click="handleReturnBook"
                        class="bg-black text-white w-full mx-auto p-3 rounded-[10px] cursor-pointer hover:bg-gray-500 hover:text-black transition-all">Xác
                        nhận yêu cầu trả sách</button>
                </form>
            </div>
        </Motion>
    </div>
</template>
<script setup>
import { defineProps, reactive, onMounted, ref, watch } from 'vue';
import UserClientControllerApi from "../../controllerApi/userclient.controller";
import { useRoute } from 'vue-router';
import { dataStatus } from '../../data/data';
import { toast } from 'vue3-toastify';
import { Motion } from "@motionone/vue";

// Hàm xoá dấu tiếng việt
function removeVietnameseTones(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'd')
        .toLowerCase()
        .replace(/\s+/g, '')
        .trim()
}

const route = useRoute();
const visibleTask = ref([]);
const loaded = ref(false);
const load = ref(false);
const modelDetail = ref(false);
const detailBook = ref({});
const updatingID = ref(''); //id borrow

const props = defineProps({
    dataBorrowing: Array,
    user: Object,
    searchValue: String,
})

const emit = defineEmits(['details', 'getAllData']);
function handleDetail(item) {
    emit('details', item);
}

function formatStatus(key) {
    return dataStatus[key]
}

async function getBook(id) {
    try {
        const res = (await UserClientControllerApi.getBookID(id));
        if (res.EC == 1) {
            detailBook.value = res.data;
        }
    } catch (err) {
        console.log(err);
    }
}

const openModelDetail = async (id, idBorrow) => {
    await getBook(id);
    updatingID.value = idBorrow;
    modelDetail.value = true;
    load.value = true;
}
const closeModelDetail = () => {
    load.value = false;
    setTimeout(() => {
        modelDetail.value = false;
    }, 500);
}

async function handleReturnBook(e) {
    e.preventDefault();
    const res = await UserClientControllerApi.updateBorrow(updatingID.value, { status: 'waiting' });
    if (res.EC == 1) {
        emit('getAllData')
        toast.success("Gửi đơn thành công, hãy đến trả sách !", {
            autoClose: 1200
        })
        load.value = false;
        setTimeout(() => {
            modelDetail.value = false;
        }, 1000)
    } else {
        toast.error(res.message, {
            autoClose: 1200
        })
    }
}

watch(() => props.searchValue, () => {
    if (props.searchValue) {
        const searchFinal = removeVietnameseTones(props.searchValue);
        visibleTask.value = props.dataBorrowing.filter(item => {
            return removeVietnameseTones(item.bookid.TENSACH).includes(searchFinal);
        })
    } else {
        visibleTask.value = props.dataBorrowing;
    }
})

watch(() => props.dataBorrowing, () => {
    visibleTask.value = props.dataBorrowing;
})

onMounted(async () => {
    visibleTask.value = props.dataBorrowing;
    loaded.value = true;
})
</script>