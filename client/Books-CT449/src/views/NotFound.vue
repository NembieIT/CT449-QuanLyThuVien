<template lang="">
    <div class="h-screen w-screen flex items-center justify-center bg-green-300">
        <div class="h-[70%] w-[60%]">
            <img class="h-[80%] w-full object-contain" src="../../public/404.png" alt="404">
            <div class="w-full h-[20%] flex flex-col items-center justify-center">
                <h1 class="font-bold text-4xl uppercase">Đi nhầm rùi bạn ơi</h1>
                <router-link to='/trangchu' class="underline text-blue-500">Quay lại trang chủ</router-link>
            </div>
        </div>
    </div>
</template>
<script setup>

</script>