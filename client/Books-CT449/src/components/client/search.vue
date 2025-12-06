<template lang="">
    <div v-if="!loaded" class="h-full w-full flex items-center justify-center">
        <a-spin class="bg-white rounded-full" :indicator="indicator" />
    </div>
    <div v-if="loaded" class="h-full w-full bg-gray p-5">
        <div class="h-full flex items-center justify-center gap-[5%] p-5 flex-wrap overflow-scroll bg-white">
            <div v-if="visibleTask.length > 0" v-for="(item, index) in visibleTask" :key="item._id || index"
                class="w-[40%] md:w-[35%] 2xl:w-[20%] h-1/2 2xl:h-[65%] bg-gray-500/40 rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between">
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
    import { defineProps, reactive, onMounted, ref, watch } from 'vue';
    import UserClientControllerApi from '../../controllerApi/userclient.controller';
    import { useRoute } from 'vue-router';
    import { LoadingOutlined } from '@ant-design/icons-vue';
    import { h } from 'vue';
    const indicator = h(LoadingOutlined, {
        style: {
            fontSize: '24px',
        },
        spin: true,
    });

    const route = useRoute();

    const visibleTask = ref([]);
    const loaded = ref(false);
    const props = defineProps({
        dataBook: Array,
        searchValue: String
    })

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

    const emit = defineEmits(['details']);
    function handleDetail(item) {
        emit('details', item);
    }

    const categoryState = reactive({
        searchValue: ''
    })

    watch(() => props.searchValue, () => {
        const searchFinal = removeVietnameseTones(props.searchValue);
        if (!searchFinal) {
            visibleTask.value = props.dataBook;
        } else {
            visibleTask.value = props.dataBook.filter(item => {
                const tensach = removeVietnameseTones(item.TENSACH);
                if (tensach.includes(searchFinal)) return true
            })
        }
    })

    onMounted(async () => {
        visibleTask.value = props.dataBook;
        loaded.value = true;
    })
</script>