<template lang="">
    <div v-if="loaded" class="h-full w-full bg-white">
        <div class="w-full h-fit p-5">
            <span>Phân loại</span>
            <div class="flex items-center justify-center gap-2">
                <div class="w-1/3">
                    <a-form-item label="Nhà xuất bản" name="nxb"
                        :rules="[{ required: true, message: 'Hãy chọn nhà xuất bản !' }]" class="w-full">
                        <a-select v-model:value="categoryState.nxb">
                            <a-select-option v-for="(item,index) in dataNXB" :key="index"
                                :value="item._id">{{item.TENNXB}}</a-select-option>
                        </a-select>
                    </a-form-item>
                </div>
                <div class="w-1/3">
                    <a-form-item label="Tác giả" name="tacgia"
                        :rules="[{ required: true, message: 'Hãy chọn tác giả !' }]" class="w-full">
                        <a-select v-model:value="categoryState.tacgia">
                            <a-select-option v-for="(item,index) in dataAuthor" :key="index"
                                :value="item._id">{{item.TENTACGIA}}</a-select-option>
                        </a-select>
                    </a-form-item>
                </div>
                <div class="w-1/3">
                    <a-form-item label="Tác giả" name="tacgia"
                        :rules="[{ required: true, message: 'Hãy chọn tác giả !' }]" class="w-full">
                        <a-select v-model:value="categoryState.tacgia">
                            <a-select-option v-for="(item,index) in dataAuthor" :key="index"
                                :value="item._id">{{item.TENTACGIA}}</a-select-option>
                        </a-select>
                    </a-form-item>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { defineProps, reactive, onMounted, ref } from 'vue';
    import UserClientControllerApi from '../../controllerApi/userclient.controller';

    const dataNXB = ref([]);
    const dataAuthor = ref([]);
    const loaded = ref(false);
    const props = defineProps({
        dataBook: Array
    })

    const categoryState = reactive({
        tacgia: '',
        year: '',
        nxb: '',
    })
    onMounted(async () => {
        dataNXB.value = (await UserClientControllerApi.getNXB()).data;
        dataAuthor.value = (await UserClientControllerApi.getTacgia()).data;
        loaded.value = true;
    })
</script>