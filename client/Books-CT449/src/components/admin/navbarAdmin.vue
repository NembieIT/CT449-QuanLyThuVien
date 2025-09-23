<template lang="">
    <div>
        <nav class="bg-gray-500/50 p-5 h-[10vh] w-full flex items-center justify-between rounded-2xl">
            <div class="flex items-center justify-center gap-5">
                <button @click="$emit('open-sidebar')" class="md:hidden hover:text-white rounded-full transition-all"><i class="fa-solid fa-bars"></i></button>
                <h1 class="md:text-2xl">Xin chào Tiến Dũng !</h1>
            </div>

            <div class="flex items-center justify-center gap-5 text-2xl md:text-3xl text-white">
                <i class="fa-solid fa-moon"></i>
                <i class="fa-solid fa-bell"></i>
                <img class="cursor-pointer" src="../../assets/vue.svg" alt="Avt">
            </div>
        </nav>
    </div>
</template>
<script setup>
</script>