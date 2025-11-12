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
                                :class="`flex items-center gap-5 bg-gray-400 p-2 ${formErr.password?'border border-red-500':''}`">
                                <KeyOutlined />
                                <input v-model="formState.password" type="password" class="outline-none w-full">
                            </div>
                        </div>
                        <a-checkbox v-if="changeForm" class="w-fit" v-model:checked="formState.admin">Quản
                            trị</a-checkbox>
                        <div v-if="!changeForm" class="w-full">
                            <span>Nhập email</span>
                            <div class="flex items-center gap-5 bg-gray-400 p-2">
                                <MailOutlined />
                                <input v-model="formState.email" type="email" class="outline-none w-full">
                            </div>
                        </div>
                        <span v-if="errMsg" class="text-red-500">Vui lòng điền thông tin !</span>
                        <div class="w-full flex items-center justify-center lg:justify-start gap-5">
                            <button class="bg-purple-500 p-2 rounded-[5px] cursor-pointer w-1/2 text-white uppercase">{{
                                changeForm ? 'Đăng nhập' : 'Đăng ký' }}</button>
                        </div>
                    </Motion>

                    <Motion :initial="{ x: '0' }" :animate="changeForm ? { x: '-100%' } : { x: '0' }"
                        :transition="{ duration: 0.5, ease: 'easeInOut' }"
                        class="hidden lg:flex uppercase border h-full w-1/2 bg-gray-700 rounded-2xl flex-col items-center justify-center gap-5 text-white text-2xl">
                        <span>Đăng {{changeForm?'nhập':'ký'}} với </span>
                        <div class="flex items-center gap-5 p-5 text-3xl text-black">
                            <MailOutlined class="cursor-pointer bg-white rounded-full p-2" />
                            <FacebookOutlined class="cursor-pointer bg-white rounded-full p-2" />
                            <TwitterOutlined class="cursor-pointer bg-white rounded-full p-2" />
                        </div>
                    </Motion>

                    <div
                        class="flex lg:hidden uppercase w-full rounded-2xl flex-col items-center justify-center gap-2 text-2xl p-5">
                        <span>Đăng {{changeForm?'nhập':'ký'}} với </span>
                        <div class="flex items-center gap-5 p-5 text-3xl">
                            <MailOutlined class="cursor-pointer bg-white rounded-full p-2" />
                            <FacebookOutlined class="cursor-pointer bg-white rounded-full p-2" />
                            <TwitterOutlined class="cursor-pointer bg-white rounded-full p-2" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { Motion } from "@motionone/vue";
    import { reactive, ref, onMounted } from 'vue';
    import { toast } from 'vue3-toastify'
    import AuthController from "../controllerApi/auth.controller.js";

    const formState = reactive({
        username: '',
        password: '',
        admin: false
    });
    const changeForm = ref(false); //true = log, false = reg
    const errMsg = ref(false);
    const mobileSize = ref(false);

    const formErr = ref({
        username: false,
        password: false,
        email: false
    });

    function validForm() {
        formErr.value.username = !formState.username;
        formErr.value.password = !formState.password;
        formErr.value.email = !formState.email;
        errMsg.value = (formErr.value.username || formErr.value.password)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        validForm();
        if (!formErr.value.username && !formErr.value.password) {
            if (changeForm.value) { //login
                if (formState.admin) {
                    try {
                        var admin = true;
                        const res = await AuthController.loginAD(formState);
                        if (res.EC == 1) {
                            toast.success("Đăng nhập thành công !", {
                                autoClose: 1600,
                                theme: "dark"
                            })
                        } else {
                            admin = false;
                        }
                        if (!admin) {
                            try {
                                const res = await AuthController.loginNV(formState);
                                if (res.EC == 1) {
                                    toast.success("Đăng nhập thành công !", {
                                        autoClose: 1600,
                                        theme: "dark"
                                    })
                                } else {
                                    toast.error("Sai tài khoản hoặc mật khẩu !", {
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
                }
            } else {
                console.log('reg');
            }
        }
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