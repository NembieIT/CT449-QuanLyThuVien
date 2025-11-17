<template>
    <div class="h-screen w-screen flex items-center font-text2">
        <div class="w-[15vw] h-full">
            <SidebarUser :page="page"></SidebarUser>
        </div>

        <div class="w-[85vw] h-full">
            <div class="h-[10vh] w-full">
                <NavbarUser></NavbarUser>
            </div>
            <div class="h-[90vh] w-full flex items-center bg-gray-500">
                <div class="w-[80%] h-full overflow-y-scroll overflow-x-hidden">
                    <Homepage></Homepage>
                </div>

                <div class="w-[20%] h-full">
                    <DetailBook></DetailBook>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import NavbarUser from '../../components/client/navbarUser.vue';
import SidebarUser from '../../components/client/sidebarUser.vue';
import Homepage from '../../components/client/homepage.vue';
import DetailBook from '../../components/client/detailBook.vue';
import { ref, onMounted } from 'vue';

</script>