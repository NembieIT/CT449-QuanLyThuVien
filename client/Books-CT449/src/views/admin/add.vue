<template lang="">
    <div class="h-[100vh] w-[100vw] flex items-center justify-center">
        <div class="w-1/2 p-5 flex items-center justify-center shadow-2xl bg-gray-400/40 rounded-2xl">
            <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
                autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed"
                class="w-fit flex flex-col gap-5 justify-center items-start">
                <h1>Quay lại trang admin : <router-link to="/admin/all">Back</router-link></h1>
                <a-form-item label="Người mượn" name="username"
                    :rules="[{ required: true, message: 'Hãy điền tên người mượn!' }]">
                    <a-input v-model:value="formState.username" />
                </a-form-item>

                <a-form-item label="Password" name="password"
                    :rules="[{ required: true, message: 'Please input your password!' }]">
                    <a-input-password v-model:value="formState.password" />
                </a-form-item>

                <a-form-item name="remember" :wrapper-col="{ offset: 0, span: 0 }">
                    <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
                </a-form-item>

                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <a-button type="primary" html-type="submit">Submit</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script setup>
    import { reactive } from 'vue';
    const formState = reactive({
        username: '',
        password: '',
        remember: true,
    });
    const onFinish = values => {
        console.log('Success:', values);
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
</script>