<template lang="">
    <div class="h-[100vh] w-[100vw] flex items-center justify-center">
        <a-spin v-if="!isLoaded" :indicator="indicator" />
        <div v-if="isLoaded"
            class="relative w-[95%] md:w-[75%] lg:w-1/2 h-fit md:h-[70%] lg:h-[60%] border-3 p-5 flex items-center justify-center shadow-2xl bg-gray-200/95 rounded-2xl">
            <div class="md:w-[15%] md:h-[15%] md:block hidden object-fit absolute md:top-10 md:right-10">
                <img src="../../../public/Red_and_Blue_Modern_School_Logo-removebg-preview.png" alt="Logo">
            </div>
            <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
                autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed"
                class="w-full flex flex-col gap-4 justify-center items-center">
                <a-spin v-if="loading" class="absolute" :indicator="indicator" />
                <h1 class="text-2xl font-bold font-text1">
                    {{ BookEdit ? 'CHỈNH SỬA SÁCH' : 'THÊM SÁCH MỚI' }}
                </h1>
                <h2 class="text-[15px] font-bold font-text1">Quay lại trang admin : <router-link
                        to="/admin/all">Back</router-link>
                </h2>
                <div class="w-full">
                    <div class="flex items-center justify-center gap-5">
                        <a-form-item label="Tên sách" name="tensach" class="w-[40%]"
                            :rules="!BookEdit?[{ required: true, message: 'Hãy điền tên sách!' }]:[]">
                            <a-input v-model:value="formState.tensach" :placeholder="BookEdit?.TENSACH" />
                        </a-form-item>
                        <a-form-item label="Giá" name="dongia"
                            :rules="!BookEdit?[{ required: true, message: 'Hãy điền giá sách!' }]:[]" class="w-[40%]">
                            <a-input v-model:value="formState.dongia" :placeholder="BookEdit?.DONGIA" type="Number" />
                        </a-form-item>
                    </div>

                    <div class="flex items-center justify-center gap-5">
                        <a-form-item label="Số quyển" name="soquyen"
                            :rules="!BookEdit?[{ required: true, message: 'Hãy điền số quyển sách!' }]:[]"
                            class="w-[40%]">
                            <a-input v-model:value="formState.soquyen" :placeholder="BookEdit?.SOQUYEN" type="Number" />
                        </a-form-item>
                        <a-form-item label="Năm xuất bản" name="namxuatban"
                            :rules="!BookEdit?[{ required: true, message: 'Hãy điền năm xuất bản!' }]:[]"
                            class="w-[40%]">
                            <a-input v-model:value="formState.namxuatban" :placeholder="BookEdit?.NAMXUATBAN"
                                type="Number" />
                        </a-form-item>
                    </div>

                    <div class="flex items-center justify-center gap-5">
                        <a-form-item label="Nhà xuất bản" name="manxb"
                            :rules="!BookEdit?[{ required: true, message: 'Hãy chọn nhà xuất bản!' }]:[]"
                            class="w-[40%]">
                            <a-select @select="handleOther" v-model:value="formState.manxb"
                                placeholder="Vui lòng chọn nhà xuất bản">
                                <a-select-option value="other">Nhà xuất bản khác</a-select-option>
                                <a-select-option v-for="(item,index) in dataNXB" :key="index"
                                    :value="item._id">{{item.TENNXB}}</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="Tác giả" name="tacgia"
                            :rules="!BookEdit?[{ required: true, message: 'Hãy điền tác giả!' }]:[]" class="w-[40%]">
                            <a-input v-model:value="formState.tacgia" :placeholder="BookEdit?.TACGIA" />
                        </a-form-item>
                    </div>

                    <div class="flex items-center justify-center gap-5">
                        <a-form-item v-if="otherNXB" label="Mã NXB" name="manxbnew"
                            :rules="!BookEdit?[{ required: true, message: 'Hãy điền mã nxb!' }]:[]" class="w-[40%]">
                            <a-input v-model:value="formState.manxbnew" />
                        </a-form-item>
                        <a-form-item v-if="otherNXB" label="Tên NXB" name="tennxbnew"
                            :rules="!BookEdit?[{ required: true, message: 'Hãy điền tên nxb!' }]:[]" class="w-[40%]">
                            <a-input v-model:value="formState.tennxbnew" />
                        </a-form-item>
                    </div>

                    <div class="flex items-center justify-center gap-5">
                        <a-form-item v-if="otherNXB" label="Địa chỉ" name="diachinxbnew"
                            :rules="!BookEdit?[{ required: true, message: 'Hãy điền địa chỉ nxb!' }]:[]"
                            class="w-[40%]">
                            <a-input v-model:value="formState.diachinxbnew" />
                        </a-form-item>
                        <a-form-item v-if="otherNXB" label="Địa chỉ" class="w-[40%] invisible">
                            <a-input />
                        </a-form-item>
                    </div>

                    <a-form-item class="flex items-center justify-center">
                        <a-button type="primary" html-type="submit">Submit</a-button>
                    </a-form-item>
                </div>
            </a-form>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref, defineProps, onBeforeMount, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { toast } from 'vue3-toastify'
import NXBControllerApi from "../../controllerApi/nxb.admincontroller.js"
import BookControllerApi from "../../controllerApi/books.admincontroller.js"

import { LoadingOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';
const indicator = h(LoadingOutlined, {
    style: {
        fontSize: '24px',
    },
    spin: true,
});

var dataNXB = ref([]);
const otherNXB = ref(false);
const route = useRoute();
const id = ref('');
const BookEdit = ref(null);
const loading = ref(false);
const isLoaded = ref(false);

const formState = reactive({
    tensach: '',
    dongia: '',
    soquyen: '',
    namxuatban: '',
    manxb: '',
    tacgia: '',
    manxbnew: '',
    tennxbnew: '',
    diachinxbnew: ''
});

const handleOther = (e) => {
    if (e.includes('other')) {
        otherNXB.value = true;
    } else {
        otherNXB.value = false;
    }
}

async function onFinish(values) {
    loading.value = true;
    if (BookEdit.value) {
        const dataUpdate = {};
        for (const key in values) {
            if (values[key] !== '' && values[key] !== null && values[key] !== undefined) {
                dataUpdate[key] = values[key];
            }
        }
        if (Object.keys(dataUpdate).length > 0) {
            try {
                const res = await BookControllerApi.updateBook(id.value, dataUpdate);
                if (res.EC == 1) {
                    loading.value = false
                    toast.success("OK cu", {
                        autoClose: 1600
                    })
                    setTimeout(() => {
                        window.location.reload();
                    }, 1600);
                } else {
                    loading.value = false
                    toast.error(res.message, {
                        autoClose: 1600,
                        theme: "dark"
                    })
                }
            } catch (err) {
                loading.value = false
                toast.error("Loi server", {
                    autoClose: 1600,
                    theme: "dark"
                })
                console.log(err);
            }
        } else {
            loading.value = false;
            toast.error("Vui lòng điền thông tin cần sửa !", {
                autoClose: 1600
            })
        }
    } else {
        try {
            var next = ref(false);
            const { manxbnew, tennxbnew, diachinxbnew, manxb, ...payload } = values;
            if (otherNXB.value) {
                const res = await NXBControllerApi.addNXB({ manxbnew, tennxbnew, diachinxbnew });
                if (res.EC === 1) {
                    next.value = true;
                } else {
                    toast.error(res.message, {
                        autoClose: 1600
                    })
                }
            } else {
                next.value = true;
            }
            if (next.value) {
                const manxbFinal = manxb.value == 'other' ? manxbnew.value : manxb.value;
                const res = await BookControllerApi.addBook(payload, manxbFinal);
                if (res.EC === 1) {
                    loading.value = false;
                    toast.success("Thêm thành công !", {
                        autoClose: 1600
                    })
                    setTimeout(() => {
                        window.location.reload();
                    }, 1600);
                }
            }
        } catch (err) {
            loading.value = false;
            toast.error("Loi server", {
                autoClose: 1600,
                theme: "dark"
            })
            console.log(err);
        }
    }
};
const onFinishFailed = errorInfo => {
    loading.value = false;
    toast.error("Tạo không thành công !", {
        autoClose: 1600,
        theme: "dark"
    })
    console.log("Error : ", errorInfo);
};

onMounted(async () => {
    id.value = route.params.id || '';
    dataNXB = (await NXBControllerApi.getNXB());
    BookEdit.value = (await BookControllerApi.getID(id.value))?.book;
    isLoaded.value = true;
})
</script>