<template lang="">
    <div class="relative h-[100vh] w-[100vw] flex items-center justify-center">
        <div class="absolute h-full w-full flex items-center justify-center -z-10">
            <img src="../../../public/Red_and_Blue_Modern_School_Logo-removebg-preview.png" alt="Logo"
                class="h-[100%] w-1/2">
        </div>
        <div class="w-[95%] md:w-[75%] lg:w-1/2 h-fit md:h-[70%] lg:h-[60%] border p-5 flex items-center justify-center shadow-2xl bg-gray-200/95 rounded-2xl">
            <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
                autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed"
                class="w-full flex flex-col gap-4 justify-center items-center">
                <h1 class="text-2xl font-bold font-text1">THÊM NGƯỜI DÙNG MỚI</h1>
                <h2 class="text-[15px] font-bold font-text1">Quay lại trang admin : <router-link
                        to="/admin/all">Back</router-link>
                </h2>
                <div class="w-full">
                    <div class="flex items-center justify-center gap-5">
                        <a-form-item label="Họ lót" name="holot" class="w-1/3">
                            <a-input v-model:value="formState.holot" />
                        </a-form-item>
                        <a-form-item label="Tên" name="ten" :rules="[{ required: true, message: 'Hãy điền tên!' }]"
                            class="w-1/3">
                            <a-input v-model:value="formState.ten" />
                        </a-form-item>
                    </div>

                    <div class="flex items-center justify-center gap-5">
                        <a-form-item label="Giới tính" name="sex"
                            :rules="[{ required: true, message: 'Hãy chọn giới tính!' }]" class="w-1/3">
                            <a-select v-model:value="formState.sex" placeholder="Vui lòng chọn giới tính">
                                <a-select-option v-for="(item,index) in dataSex" :key="index"
                                    :value="item.sex">{{item.sex}}</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="Ngày sinh" required name="ngaysinh"
                            :rules="[{ required: true, message: 'Vui lòng chọn ngày sinh!' }, { validator: validateBirthday }]"
                            class="w-1/3">
                            <a-date-picker v-model:value="formState.ngaysinh" show-time type="date"
                                placeholder="Vui lòng chọn ngày sinh" style="width: 100%" />
                        </a-form-item>
                    </div>

                    <div class="flex items-center justify-center gap-5">
                        <a-form-item label="Địa chỉ" name="address"
                            :rules="[{ required: true, message: 'Hãy điền địa chỉ!' }]" class="w-1/3">
                            <a-input v-model:value="formState.address" />
                        </a-form-item>
                        <a-form-item label="SĐT" name="phone" :rules="[{ required: true, message: 'Hãy điền SĐT!' }]"
                            class="w-1/3">
                            <a-input v-model:value="formState.phone" />
                        </a-form-item>
                    </div>

                    <div class="flex items-center justify-center gap-5">
                        <a-form-item label="Username" name="username"
                            :rules="[{ required: true, message: 'Hãy điền username!' }]" class="w-1/3">
                            <a-input v-model:value="formState.username" />
                        </a-form-item>
                        <a-form-item label="Password" name="password"
                            :rules="[{ required: true, message: 'Hãy điền password!' }]" type="password" class="w-1/3">
                            <a-input v-model:value="formState.password" />
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
import { reactive, ref } from 'vue';
import { dataSex } from '../../data/data.js';
import { toast } from 'vue3-toastify'
import dayjs from 'dayjs'
import UserService from "../../services/admin/user.service.js";

const otherSex = ref(false);

const formState = reactive({
    holot: '',
    ten: '',
    ngaysinh: null,
    sex: '',
    address: '',
    phone: '',
    username: '',
    password: ''
});

const validateBirthday = async (_rule, value) => {
    if (dayjs(value).isAfter(dayjs(), 'day')) {
        return Promise.reject('Ngày sinh không được lớn hơn ngày hiện tại!')
    }
    return Promise.resolve()
}

const handleOther = (e) => {
    if (e.includes('other')) {
        otherSex.value = true;
    } else {
        otherSex.value = false;
    }
}

async function onFinish(values) {
    const { holot, ten, ngaysinh, sex, address, phone, ...payload } = values
    try {
        const res = await UserService.createUserAccount(payload);
        if (res.EC === 1) {
            const { password, ...payload } = values
            const res = await UserService.createUserInfo(payload);
            if (res.EC === 1) {
                toast.success("Thêm thành công !", {
                    autoClose: 1600,
                    theme: "dark"
                })
                setTimeout(() => {
                    window.location.reload();
                }, 1600);
            }
        } else {
            toast.error(res.message, {
                autoClose: 1600,
                theme: "dark"
            })
        }
    } catch (err) {
        console.log(err);
    }
};
const onFinishFailed = errorInfo => {
    toast.error("Tạo đơn không thành công !", {
        autoClose: 1600,
        theme: "dark"
    })
    console.log("Error : ", errorInfo);
};
</script>