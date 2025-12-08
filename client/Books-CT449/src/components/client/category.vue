<template lang="">
    <!-- <div v-if="!loaded" class="h-full w-full flex items-center justify-center scale-500">
        <a-spin class="bg-white rounded-full" :indicator="indicator" />
    </div> -->
    <div v-if="loaded" class="h-full w-full bg-gray p-5">
        <div class="w-full h-[20%] p-5 bg-white z-5">
            <span>Phân loại</span>
            <div class="flex items-center justify-start gap-2">
                <div class="w-1/3">
                    <a-form-item label="Nhà xuất bản" name="nxb" class="w-full">
                        <a-select @change="handleFilter" v-model:value="categoryState.nxb">
                            <a-select-option value=""> </a-select-option>
                            <a-select-option v-for="(item,index) in dataNXB" :key="index"
                                :value="item._id">{{item.TENNXB}}</a-select-option>
                        </a-select>
                    </a-form-item>
                </div>
                <div class="w-1/3">
                    <a-form-item label="Tác giả" name="tacgia" class="w-full">
                        <a-select @change="handleFilter" v-model:value="categoryState.tacgia">
                            <a-select-option value=""> </a-select-option>
                            <a-select-option v-for="(item,index) in dataAuthor" :key="index"
                                :value="item._id">{{item.TENTACGIA}}</a-select-option>
                        </a-select>
                    </a-form-item>
                </div>
                <div class="w-1/3">
                    <a-form-item label="Năm xuất bản" name="year" class="w-full">
                        <a-select @change="handleFilter" v-model:value="categoryState.year">
                            <a-select-option value=""> </a-select-option>
                            <a-select-option v-for="(item,index) in dataYear" :key="index"
                                :value="item">{{item}}</a-select-option>
                        </a-select>
                    </a-form-item>
                </div>
            </div>
        </div>

        <div class="h-[80%] flex items-center justify-center gap-[5%] p-5 flex-wrap overflow-scroll bg-white">
            <div v-if="visibleTask.length > 0" v-for="(item, index) in visibleTask" :key="item._id || index"
                class="w-[40%] md:w-[35%] 2xl:w-[20%] h-1/2 2xl:h-[75%] bg-gray-500/40 rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between">
                <img class="h-1/2 xl:h-[60%] w-full object-cover hover:object-contain hover:scale-90 transition-all rounded-2xl"
                    @click="handleDetail(item)"
                    :src="item.IMAGEURL || 'https://play.google.com/books/publisher/content/images/frontcover/j5jzEAAAQBAJ?fife=w256-h256'"
                    alt="Book">
                <div class="h-1/2 xl:h-[40%] flex flex-col justify-start p-3 text-left overflow-scroll">
                    <span class="text-center text-[20px] text-blue-500">{{ item.TENSACH }}</span>
                    <span class="text-black/40 text-center">{{ item.TACGIA.TENTACGIA }}</span>
                    <span>Năm xuất bản: {{ item.NAMXUATBAN }}</span>
                    <span>Số quyển còn lại: {{ item.SOQUYEN }}</span>
                </div>
            </div>
            <div v-else class="flex flex-col items-center justify-center h-full w-full gap-5">
                <img class="h-1/2 w-1/2 object-contain" src="../../../public/notfound.png" alt="NotFound">
                <span>Nội dung tìm kiếm không có !</span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineProps, reactive, onMounted, ref } from 'vue';
import UserClientControllerApi from '../../controllerApi/userclient.controller';
import { dataYear } from "../../data/data";
import { LoadingOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';
const indicator = h(LoadingOutlined, {
    style: {
        fontSize: '24px',
    },
    spin: true,
});

const dataNXB = ref([]);
const dataAuthor = ref([]);
const visibleTask = ref([]);
const loaded = ref(false);
const props = defineProps({
    dataBook: Array
})

const emit = defineEmits(['details']);
function handleDetail(item) {
    emit('details', item);
}

const categoryState = reactive({
    tacgia: '',
    year: '',
    nxb: '',
})

function handleFilter() {
    var from = 0, to = 9999;
    if (categoryState.year) {
        from = categoryState.year.split(' - ')[0];
        to = categoryState.year.split(' - ')[1];
    }
    visibleTask.value = props.dataBook.filter(item => {
        const year = parseInt(item.NAMXUATBAN);

        const matchNXB = categoryState.nxb ? item.MANXB._id === categoryState.nxb : true;
        const matchTG = categoryState.tacgia ? item.TACGIA._id === categoryState.tacgia : true;

        const matchFrom = from ? year >= from : true;
        const matchTo = to ? year <= to : true;
        if (!to) {
            const matchTime = year <= 1990;
            return matchNXB && matchTG & matchTime
        }
        return matchNXB && matchTG && matchFrom && matchTo;
    });
}

onMounted(async () => {
    dataNXB.value = (await UserClientControllerApi.getNXB()).data;
    dataAuthor.value = (await UserClientControllerApi.getTacgia()).data;
    visibleTask.value = props.dataBook;
    // setTimeout(() => {
    //     loaded.value = true;
    // }, 100)
    loaded.value = true;
})
</script>