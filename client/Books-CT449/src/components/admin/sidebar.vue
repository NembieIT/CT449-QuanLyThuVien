<template lang="">
    <div>
        <div class="absolute md:static rounded-2xl top-0 left-0 w-[55vw] md:w-[20vw] h-[98vh] bg-white md:border md:border-white border flex flex-col gap-5 items-center justify-start">
            <div class="p-5 h-[20%] flex items-center justify-center">
                <img src="../../../public/Colorful_Book_Store_Education_Free_Logo-removebg-preview.png" alt="">
            </div>
            <h1 class="font-bold">CT449 - ADMIN PENDING</h1>
            <div class="w-full px-5 flex flex-col gap-5">
                <SidebarItem title="Homepage" goto="/admin/" icon="fa-solid fa-house"></SidebarItem>
                <SidebarItem title="Pending" goto="/admin/" icon="fa-solid fa-hourglass-half"></SidebarItem>
                <SidebarItem title="Doanh thu" goto="/admin/" icon="fa-solid fa-money-bill-trend-up"></SidebarItem>
                <SidebarItem title="Nhân viên" goto="/admin/" icon="fa-solid fa-user"></SidebarItem>
                <SidebarItem title="Độc giả" goto="/admin/" icon="fa-solid fa-user"></SidebarItem>
            </div>
            <div class="flex gap-5 items-center justify-center p-5">
                <i class="fa-solid fa-copyright"></i>
                <h2>Bản quyền thuộc về B2303803</h2>
            </div>
            <i @click="$emit('close')" v-if="width < 768" class="fa-solid fa-xmark absolute top-10 right-5 text-2xl cursor-pointer hover:scale-120 transition-all"></i>
        </div>
    </div>
</template>
<script setup>
    import SidebarItem from './sidebarItem.vue';
    import { ref, onMounted } from 'vue';

    const width = ref(window.innerWidth);
    function updateWidth(){
        width.value=window.innerWidth;
    }
    onMounted(()=>{
        window.addEventListener('resize', updateWidth);
    })
</script>