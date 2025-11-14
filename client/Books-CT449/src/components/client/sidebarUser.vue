<template lang="">
    <div class="flex flex-col items-center h-full w-full bg-white">
        <div class="h-[20%] w-full">
            <img class="h-full w-full object-contain"
                src="../../../public/Red_and_Blue_Modern_School_Logo-removebg-preview.png" alt="Logo">
        </div>
        <div class="flex flex-col gap-5 w-full h-[60%] p-5">
            <router-link to=""
                class="border w-full p-3 flex items-center justify-start gap-5 cursor-pointer hover:bg-white/50 rounded-[10px]">
                <HomeOutlined />
                <span>Trang chủ</span>
            </router-link>
            <router-link
                class="border w-full p-3 flex items-center justify-start gap-5 cursor-pointer hover:bg-white/50 rounded-[10px]">
                <HomeOutlined />
                <span>Phân loại</span>
            </router-link>
            <router-link
                class="border w-full p-3 flex items-center justify-start gap-5 cursor-pointer hover:bg-white/50 rounded-[10px]">
                <HomeOutlined />
                <span>Sách đang mượn</span>
            </router-link>
            <router-link
                class="border w-full p-3 flex items-center justify-start gap-5 cursor-pointer hover:bg-white/50 rounded-[10px]">
                <HomeOutlined />
                <span>Sách yêu thích</span>
            </router-link>
        </div>

        <div class="flex flex-col gap-5 w-full h-[20%] p-5">
            <router-link to=""
                class="border w-full p-3 flex items-center justify-start gap-5 cursor-pointer hover:bg-white/50 rounded-[10px]">
                <LogoutOutlined />
                <span>Đăng xuất</span>
            </router-link>
            <router-link to=""
                class="border w-full p-3 flex items-center justify-start gap-5 cursor-pointer hover:bg-white/50 rounded-[10px]">
                <LogoutOutlined />
                <span>Đăng xuất</span>
            </router-link>
        </div>
    </div>
</template>
<script>

</script>