<template lang="">
    <div class="h-[100vh] w-[100vw] flex items-center justify-center">
        <a-spin v-if="!isLoaded" :indicator="indicator" />
        <div v-if="isLoaded"
            class="relative w-[95%] md:w-[75%] lg:w-1/2 h-fit md:h-[70%] lg:h-[60%] border p-5 flex items-center justify-center shadow-2xl bg-gray-200/95 rounded-2xl">
            <div class="md:w-[15%] md:h-[15%] md:block hidden object-fit absolute md:top-10 md:right-5">
                <img src="../../../public/Red_and_Blue_Modern_School_Logo-removebg-preview.png" alt="Logo">
            </div>
            <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
                autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed"
                class="w-full flex flex-col gap-4 justify-center items-center">
                <a-spin v-if="loading" class="absolute" :indicator="indicator" />
                <h1 class="text-4xl font-bold font-text1">
                    {{ userEdit ? 'CHỈNH SỬA THÔNG TIN' : 'THÔNG TIN CÁ NHÂN' }}
                </h1>
                <h2 class="text-[15px] font-bold font-text1">Quay lại trang chủ : <router-link
                        to="/trangchu">Back</router-link>
                </h2>
                <div class="w-full">
                    <div class="flex items-center justify-center gap-5">
                        <a-form-item label="Họ lót" name="holot" class="w-1/3">
                            <a-input v-model:value="formState.holot" :placeholder="userEdit?.holot" />
                        </a-form-item>
                        <a-form-item label="Tên" name="ten"
                            :rules="!userEdit?[{ required: true, message: 'Hãy điền tên!' }]:[]" class="w-1/3">
                            <a-input v-model:value="formState.ten" :placeholder="userEdit?.ten" />
                        </a-form-item>
                    </div>

                    <div class="flex items-center justify-center gap-5">
                        <a-form-item label="Giới tính" name="sex"
                            :rules="!userEdit?[{ required: true, message: 'Hãy chọn giới tính!' }]:[]" class="w-1/3">
                            <a-select v-model:value="formState.sex" placeholder="Vui lòng chọn giới tính">
                                <a-select-option v-for="(item,index) in dataSex" :key="index"
                                    :value="item.sex">{{item.sex}}</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="Ngày sinh" name="ngaysinh"
                            :rules="!userEdit?[{ required: true, message: 'Vui lòng chọn ngày sinh!' }, { validator: validateBirthday }]:[{ validator: validateBirthday }]"
                            class="w-1/3">
                            <a-date-picker v-model:value="formState.ngaysinh" show-time type="date"
                                placeholder="Vui lòng chọn ngày sinh" style="width: 100%" />
                        </a-form-item>
                    </div>

                    <div class="flex items-center justify-center gap-5">
                        <a-form-item label="Địa chỉ" name="address"
                            :rules="!userEdit?[{ required: true, message: 'Hãy điền địa chỉ!' }]:[]" class="w-1/3">
                            <a-input v-model:value="formState.address" :placeholder="userEdit?.address" />
                        </a-form-item>
                        <a-form-item label="SĐT" name="phone"
                            :rules="!userEdit?[{ required: true, message: 'Hãy điền SĐT!' }]:[]" class="w-1/3">
                            <a-input v-model:value="formState.phone" :placeholder="userEdit?.phone" />
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
    import { dataSex } from '../../data/data.js';
    import { toast } from 'vue3-toastify'
    import dayjs from 'dayjs'
    import { jwtDecode } from "jwt-decode";
    import UserClientControllerApi from "../../controllerApi/userclient.controller";

    import { LoadingOutlined } from '@ant-design/icons-vue';
    import { h } from 'vue';
    const indicator = h(LoadingOutlined, {
        style: {
            fontSize: '24px',
        },
        spin: true,
    });

    const route = useRoute();
    const userEdit = ref(null);
    const loading = ref(false);
    const isLoaded = ref(false);

    const formState = reactive({
        id: '',
        holot: '',
        ten: '',
        ngaysinh: null,
        sex: '',
        address: '',
        phone: ''
    });

    const validateBirthday = async (_rule, value) => {
        if (dayjs(value).isAfter(dayjs(), 'day')) {
            return Promise.reject('Ngày sinh không được lớn hơn ngày hiện tại!')
        }
        return Promise.resolve()
    }

    async function onFinish(values) {
        const { holot, ten, ngaysinh, sex, address, phone } = values
        loading.value = true;
        if (userEdit.value) {
            const dataUpdate = {};
            for (const key in values) {
                if (values[key] !== '' && values[key] !== null && values[key] !== undefined) {
                    dataUpdate[key] = values[key];
                }
            }
            dataUpdate.id = userEdit.value._id;
            if (Object.keys(dataUpdate).length > 0) {
                try {
                    console.log('update TT: ', dataUpdate)
                    const res = await UserClientControllerApi.updateTTUser(dataUpdate);
                    if (res.EC == 1) {
                        loading.value = false
                        toast.success("Thành công", {
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
                loading.value = false
                toast.error("Vui lòng điền thông tin cần sửa", {
                    autoClose: 1600
                })
            }
        } else {
            try {
                values.id = formState.id;
                const res = await UserClientControllerApi.addTTUser(values)
                if (res.EC === 1) {
                    loading.value = false;
                    toast.success("Thêm thành công !", {
                        autoClose: 1600,
                        theme: "dark"
                    })
                    setTimeout(() => {
                        window.location.reload();
                    }, 1600);
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
        toast.error("Không thành công !", {
            autoClose: 1600,
            theme: "dark"
        })
        console.log("Error : ", errorInfo);
    };

    onMounted(async () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const userInfo = jwtDecode(token);
            formState.id = userInfo.id;
        }
        userEdit.value = (await UserClientControllerApi.getTTUser(formState.id)).data[0];
        isLoaded.value = true;
    })
</script>