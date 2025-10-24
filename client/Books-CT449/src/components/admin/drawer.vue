<template lang="">
    <div>
        <a-drawer width="400" placement="right" :closable="false" :open="open" @close="onClose" class="font-text1">
            <div class="h-fit">
                <p class="text-5xl font-bold mb-10 uppercase text-emerald-400">Thông tin chi tiết</p>
                <div v-if="props.currentDetail">
                    <p v-for="(value, key) in props.currentDetail" :key="key" class="text-2xl font-text1 font-bold">
                        <span v-if="!dataDisplayDetail.includes(key)">
                            {{ formatLabelUser(key) }}:
                        </span>
                        <span class="text-red-500" v-if="!dataDisplayDetail.includes(key)">
                            {{ formatValue(key, value) }}
                        </span>
                    </p>
                </div>
            </div>
            <div class="mt-5">
                <Button :goto="`/add${FormatAdd(page)}/${props.currentDetail?._id}`" title="Chỉnh sửa" icon="fa-plus"
                    class="text-2xl"></Button>
            </div>
        </a-drawer>
    </div>
</template>
<script setup>
import { defineEmits, ref, onMounted, watch, onBeforeMount } from 'vue';
import Button from './button.vue'
import { dataDisplayDetail, dataFormatName } from '../../data/data.js'

const props = defineProps({
    show: Boolean,
    currentDetail: [Object, String],
    page: String
})

function FormatAdd(key) {
    const dataAdd = {
        user: 'user',
        nhanvien: 'nv',
        nxb: 'nxb'
    }
    return dataAdd[key] || dataAdd;
}

// 🧩 Hàm đổi tên key cho dễ đọc hơn
const formatLabelUser = (key) => {
    return dataFormatName[key] || key // Nếu không có trong map thì giữ nguyên key
}

// 🧩 Hàm xử lý giá trị đặc biệt (ví dụ ngày sinh)
const formatValue = (key, value) => {
    if (key === 'ngaysinh' && value) {
        return new Date(value).toLocaleDateString('vi-VN')
    }
    return value
}

const emit = defineEmits(['closeDetail'])

const open = ref(false);
const onClose = () => {
    open.value = false;
    emit('closeDetail');
};
watch(() => props.show,
    (newVal) => {
        open.value = newVal;
    }
)
onMounted(() => {
    open.value = props.show;
})
</script>