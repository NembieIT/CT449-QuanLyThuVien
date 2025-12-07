<template lang="">
    <div class="relative h-screen w-screen overflow-hidden flex items-center justify-center font-text2 bg-gray-700/70">
        <div
            class="overflow-y-scroll lg:overflow-y-hidden h-[85%] lg:h-[80%] w-[90%] lg:w-1/2 bg-gray-200 rounded-[10px] border-3 p-5">
            <div class="flex flex-col mb-5">
                <span class="text-2xl">Welcome to</span>
                <span class="text-3xl text-purple-800 font-bold">CT449-Borrow Book Library</span>
            </div>
            <div class="w-full border rounded-2xl flex items-center justify-center text-center mb-5">
                <span @click="changeForm=false"
                    :class="`${!changeForm?'bg-gray-700 text-white':''} w-1/2 p-2 h-full rounded-2xl cursor-pointer hover:bg-gray-700 hover:text-white transition-all`">Đăng
                    ký</span>
                <span @click="changeForm=true"
                    :class="`${changeForm?'bg-gray-700 text-white':''} w-1/2 p-2 rounded-2xl cursor-pointer hover:bg-gray-700 hover:text-white transition-all`">Đăng
                    nhập</span>
            </div>
            <div class="flex items-center justify-start w-full h-fit lg:h-[70%]">
                <form @submit="handleSubmit"
                    class="h-full w-full block lg:flex items-start justify-start bg-gray-300 rounded-[5px]">
                    <Motion :initial="{ x: '0' }" :animate="(changeForm&&!mobileSize) ? { x: '100%' } : { x: '0' }"
                        :transition="{ duration: 0.5, ease: 'easeInOut' }"
                        class="w-full lg:w-1/2 flex flex-col gap-5 p-5">
                        <div class="w-full">
                            <span>Nhập username</span>
                            <div
                                :class="`flex items-center gap-5 bg-gray-400 p-2 ${formErr.username?'border border-red-500':''}`">
                                <UserOutlined />
                                <input v-model="formState.username" type="text" class="outline-none w-full">
                            </div>
                        </div>
                        <div class="w-full">
                            <span>Nhập mật khẩu</span>
                            <div
                                :class="`flex items-center gap-5 bg-gray-400 p-2 ${formErr.password||formErr.minpassword?'border border-red-500':''}`">
                                <KeyOutlined />
                                <input v-model="formState.password" type="password" class="outline-none w-full">
                            </div>
                        </div>
                        <a-checkbox v-if="changeForm" class="w-fit" v-model:checked="formState.admin">Quản
                            trị</a-checkbox>
                        <div v-if="!changeForm" class="w-full">
                            <span>Nhập email</span>
                            <div :class="`flex items-center gap-5 bg-gray-400 p-2 ${formErr.email?'border border-red-500':''}`">
                                <MailOutlined />
                                <input v-model="formState.email" type="email" class="outline-none w-full">
                            </div>
                        </div>
                        <span v-if="formErr.minpassword" class="text-red-500">Mật khẩu ít nhất 6 ký tự !</span>
                        <span v-if="errMsg" class="text-red-500">Vui lòng điền thông tin !</span>
                        <div class="w-full flex items-center justify-center lg:justify-start gap-5">
                            <button class="bg-purple-500 p-2 rounded-[5px] cursor-pointer w-1/2 text-white uppercase">{{
                                changeForm ? 'Đăng nhập' : 'Đăng ký' }}</button>
                        </div>
                    </Motion>

                    <Motion :initial="{ x: '0' }" :animate="changeForm ? { x: '-100%' } : { x: '0' }"
                        :transition="{ duration: 0.5, ease: 'easeInOut' }"
                        class="hidden lg:flex uppercase border h-full w-1/2 bg-gray-700 rounded-2xl flex-col items-center justify-center gap-5 text-white text-[20px]">
                        <span>Bạn chưa muốn đăng {{changeForm?'nhập ?':'ký ?'}}</span>
                        <router-link to="/trangchu" class="underline text-blue-400 text-[15px]">Đến
                            website</router-link>
                    </Motion>


                </form>
            </div>
        </div>
    </div>
    <a-modal v-model:open="openModel" title="Đăng nhập thành công !" :confirm-loading="confirmLoading" @ok="handleOkAD"
        @cancel="handleCancelAD">
        <p>{{modalText}}</p>
    </a-modal>
</template>
<script setup>
import { Motion } from "@motionone/vue";
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify'
import AuthController from "../controllerApi/auth.controller.js";

const router = useRouter();

const defaultForm = {
    username: '',
    password: '',
    admin: false
};
const formState = reactive({
    username: '',
    password: '',
    admin: false
});
const changeForm = ref(false); //true = log, false = reg
const errMsg = ref(false);
const mobileSize = ref(false);
const modalText = ref('Bạn muốn vào trang quản trị ?');
const openModel = ref(false);
const confirmLoading = ref(false);

const formErr = ref({
    username: false,
    password: false,
    minpassword: false,
    email: false
});

function validForm() {
    formErr.value.username = !formState.username;
    formErr.value.password = !formState.password;
    formErr.value.minpassword = formState.password.length < 6;
    formErr.value.email = !formState.email;
    errMsg.value = (formErr.value.username || formErr.value.password || formErr.value.email)
}

async function handleSubmit(e) {
    e.preventDefault();
    validForm();
    if (!errMsg.value && !formErr.value.minpassword) {
        if (changeForm.value) { //login
            if (formState.admin) {
                try { //co phai la` admin
                    var admin = true;
                    const res = await AuthController.loginAD(formState);
                    if (res.EC == 1) {
                        sessionStorage.setItem('accessToken', res.accessToken);
                        toast.success(res.message, {
                            autoClose: 1600,
                            theme: "dark"
                        })
                        openModel.value = true;
                    } else {
                        admin = false; //neu la nhan vien
                    }
                    if (!admin) { //nhanvien
                        try {
                            const res = await AuthController.loginNV(formState);
                            if (res.EC == 1) {
                                sessionStorage.setItem('accessToken', res.accessToken);
                                toast.success(res.message, {
                                    autoClose: 1600,
                                    theme: "dark"
                                })
                                openModel.value = true;
                            } else {
                                toast.error(res.message, {
                                    autoClose: 1600,
                                    theme: "dark"
                                })
                            }
                        } catch (err) {
                            console.log(err);
                        }
                    }
                } catch (err) {
                    console.log(err);
                }
            } else { //doc gia
                try {
                    const res = await AuthController.login(formState);
                    if (res.EC == 1) {
                        sessionStorage.setItem('accessToken', res.accessToken);
                        toast.success(res.message, {
                            autoClose: 1600,
                            theme: "dark"
                        })
                        setTimeout(() => {
                            router.push('/trangchu');
                        }, 1600);
                    } else {
                        toast.error(res.message, {
                            autoClose: 1600,
                            theme: "dark"
                        })
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        } else { //register doc gia
            try {
                const res = await AuthController.register(formState);
                if (res.EC == 1) {
                    Object.assign(formState, defaultForm);
                    changeForm.value = true;
                    toast.success(res.message, {
                        autoClose: 1600,
                        theme: "dark"
                    })
                } else {
                    toast.error(res.message, {
                        autoClose: 1600,
                        theme: "dark"
                    })
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
}

const handleOkAD = () => {
    modalText.value = 'Đang chuyển hướng...';
    confirmLoading.value = true;
    setTimeout(() => {
        open.value = false;
        confirmLoading.value = false;
        router.push('/admin/all');
    }, 2000);
};
const handleCancelAD = () => {
    router.push('/trangchu');
}
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        mobileSize.value = false
    } else mobileSize.value = true
})

function getSize() {
    if (window.innerWidth > 1024) return false;
    return true;
}

onMounted(() => {
    mobileSize.value = getSize();
})
</script>