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
                    {{ nvEdit ? 'CHỈNH SỬA NHÂN VIÊN' : 'THÊM NHÂN VIÊN MỚI' }}
                </h1>
                <h2 class="text-[15px] font-bold font-text1">Quay lại trang admin : <router-link
                        to="/admin/all">Back</router-link>
                </h2>
                <div class="w-full">
                    <div class="flex items-center justify-center gap-5">
                        <a-form-item label="username" name="usernameNV" class="w-1/3"
                            :rules="!nvEdit?[{ required: true, message: 'Hãy điền username!' }]:[]">
                            <a-input v-model:value="formState.usernameNV" :placeholder="nvEdit?.usernameNV" />
                        </a-form-item>
                        <a-form-item label="Tên" name="nameNV"
                            :rules="!nvEdit?[{ required: true, message: 'Hãy điền tên!' }]:[]" class="w-1/3">
                            <a-input v-model:value="formState.nameNV" :placeholder="nvEdit?.nameNV" />
                        </a-form-item>
                    </div>

                    <div class="flex items-center justify-center gap-5">
                        <a-form-item label="Địa chỉ" name="addressNV"
                            :rules="!nvEdit?[{ required: true, message: 'Hãy điền địa chỉ!' }]:[]" class="w-1/3">
                            <a-input v-model:value="formState.addressNV" :placeholder="nvEdit?.addressNV" />
                        </a-form-item>
                        <a-form-item label="SĐT" name="phoneNV"
                            :rules="!nvEdit?[{ required: true, message: 'Hãy điền sđt!' }]:[]" class="w-1/3">
                            <a-input v-model:value="formState.phoneNV" :placeholder="nvEdit?.phoneNV" />
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
import NVControllerApi from "../../controllerApi/nhanvien.admincontroller";

import { LoadingOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';
const indicator = h(LoadingOutlined, {
    style: {
        fontSize: '24px',
    },
    spin: true,
});

const route = useRoute();
const id = ref('');
const nvEdit = ref(null);
const loading = ref(false);
const isLoaded = ref(false);

const formState = reactive({
    usernameNV: '',
    nameNV: '',
    addressNV: '',
    phoneNV: ''
});

async function onFinish(values) {
    loading.value = true;
    if (nvEdit.value) {
        const dataUpdate = {};
        for (const key in values) {
            if (values[key] !== '' && values[key] !== null && values[key] !== undefined) {
                dataUpdate[key] = values[key];
            }
        }
        if (Object.keys(dataUpdate).length > 0) {
            try {
                const res = await NVControllerApi.updateNV(id.value, dataUpdate);
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
            const res = await NVControllerApi.addNV(values);
            if (res.EC === 1) {
                loading.value = false;
                toast.success("Thêm thành công !", {
                    autoClose: 1600,
                    theme: "dark"
                })
                setTimeout(() => {
                    window.location.reload();
                }, 1600);
            } else {
                loading.value = false;
                toast.error(res.message, {
                    autoClose: 1600,
                    theme: "dark"
                })
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
    toast.error("Tạo đơn không thành công !", {
        autoClose: 1600,
        theme: "dark"
    })
    console.log("Error : ", errorInfo);
};

onMounted(async () => {
    id.value = route.params.id;
    nvEdit.value = (await NVControllerApi.getID(id.value))?.NV;
    isLoaded.value = true;
})
</script>