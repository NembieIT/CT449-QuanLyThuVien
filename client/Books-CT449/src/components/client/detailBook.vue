<template lang="">
    <Motion v-if="props.showDetailMobile" :initial="{ x: 500 }" :animate="load ? { x: 0 } : {x: 500}"
        :transition="{ duration: 0.5 }"
        class="absolute top-0 right-0 md:static bg-blue-200 h-full overflow-y-scroll w-[65%] md:w-full flex flex-col p-5 z-10">
        <CloseOutlined v-if="mobileSize" @click="closeDetail"
            class="absolute right-5 top-5 cursor-pointer scale-120 bg-gray-400 p-2 rounded-full hover:bg-white transition-all z-10" />
        <div v-if="!props.book" class="mb-5">
            <h1 class="text-2xl text-center uppercase">Chào mừng bạn tới website quản lý sách !
            </h1>
            <span class="text-gray-700">Website quản lý mượn sách giúp thư viện hoặc nhà trường dễ dàng theo dõi, tra
                cứu và quản lý các đầu
                sách hiện có. Hệ
                thống hỗ trợ người dùng tìm kiếm sách, gửi yêu cầu mượn và theo dõi trạng thái mượn trả một cách nhanh
                chóng. Nhân viên
                quản lý có thể kiểm soát số lượng sách, tác giả, nhà xuất bản và lịch sử mượn trả một cách thuận tiện.
                Đây là giải pháp
                hiện đại giúp tối ưu thời gian và nâng cao hiệu quả hoạt động của thư viện.</span>
        </div>
        <div class="relative p-5 h-[50%] flex items-center justify-center bg-white/70 rounded-2xl">
            <img class="h-full"
                :src="props.book?.IMAGEURL || 'https://play.google.com/books/publisher/content/images/frontcover/j5jzEAAAQBAJ?fife=w256-h256'"
                alt="">
            <i v-if="!isFav && props.book" @click="handleAddFav" class="fa-regular fa-heart absolute top-7 right-7 scale-150 cursor-pointer bg-white rounded-full p-2 hover:bg-red-400 transition-all"></i>
            <i v-if="isFav && props.book" @click="handleRemoveFav" class="fa-solid fa-heart absolute top-7 right-7 scale-150 cursor-pointer bg-white rounded-full p-2 hover:bg-gray-300 transition-all text-red-400"></i>
        </div>
        <div v-if="props.book" class="h-[40%] text-center flex flex-col gap-2 overflow-scroll mt-5">
            <span class="uppercase text-2xl text-center">{{props.book?.TENSACH || ''}}</span>
            <span class="text-gray-700/80 break-all">{{props.book?.TACGIA.TENTACGIA || ''}}</span>
            <span class="text-red-400 flex items-center gap-2">
                <span>Yêu thích: {{props.book?.FAV||'0'}}</span>
            </span>
            <span class="text-left">{{props.book?.DESC||''}}</span>
        </div>
        <div v-if="props.book" class="h-[10%] flex items-center justify-center">
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
import UserClientControllerApi from '../../controllerApi/userclient.controller';
import { toast } from 'vue3-toastify'
import { Motion } from "@motionone/vue";

const emit = defineEmits(["openModel", "closeDetail", "showDetail", "noFav", "Faved", 'updateData']);
const showDetail = ref(false);
const mobileSize = ref(false);
const load = ref(false);

const props = defineProps({
    book: Object,
    showDetailMobile: Boolean,
    isFav: Boolean, //false = unlike, true = like
    Favlist: Array,
    user: Object
})

watch(() => props.showDetailMobile, (newVal, oldVal) => {
    if (!newVal) {
        load.value = false;
    } else {
        load.value = true;
    }
})

async function handleAddFav() {
    try {
        props.Favlist.push(props.book._id);
        const res = await UserClientControllerApi.updateTTUser({ id: props.user._id, favorite: props.Favlist });
        const res2 = await UserClientControllerApi.updateBook(props.book._id, { addFav: true });
        if (res.EC == 1 && res2.EC == 1) {
            toast.success("Đã thêm vào yêu thích !", {
                autoClose: 1500
            })
            emit('Faved');
            emit('updateData');
        } else {
            console.log('loi else')
            toast.error(res.message, {
                autoClose: 1500
            })
        }
    } catch (err) {
        toast.error("Lỗi ở backed", {
            autoClose: 1500
        })
        console.log(err);
    }
}
async function handleRemoveFav() {
    try {
        const newList = props.Favlist.filter(item => item !== props.book._id);
        console.log(newList);
        const res = await UserClientControllerApi.updateTTUser({ id: props.user._id, favorite: newList });
        const res2 = await UserClientControllerApi.updateBook(props.book._id, { addFav: false })
        if (res.EC == 1 && res2.EC == 1) {
            toast.success("Đã xoá khỏi yêu thích !", {
                autoClose: 700
            })
            emit('noFav');
            emit('updateData');
        } else {
            console.log('loi else')
            toast.error(res.message, {
                autoClose: 700
            })
        }
    } catch (err) {
        toast.error("Lỗi ở backed", {
            autoClose: 1500
        })
        console.log(err);
    }
}

function closeDetail() {
    load.value = false;
    setTimeout(() => {
        emit('closeDetail');
    }, 500)
}
window.addEventListener('resize', () => {
    if (window.innerWidth > 815) {
        mobileSize.value = false
        emit('showDetail')
        load.value = true
    } else {
        mobileSize.value = true
        emit('closeDetail');
    }
})

function getSize() {
    if (window.innerWidth > 815) {
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