<template lang="">
    <div class="relative w-full h-[100vh] flex items-start justify-center gap-5 p-2"
        :style="{backgroundImage:`radial-gradient(125% 125% at 50% 90%, #000000 40%, #0d1a36 100%)`}">
        <Motion v-if="visible" :initial="{ x: -500 }" :animate="load ? { x: 0 } : {x: -500}"
            :transition="{ duration: 0.5 }" class="absolute w-[55vw] md:w-[30vw]  md:static top-0 left-0 h-full">
            <SidebarAdmin></SidebarAdmin>
        </Motion>

        <div class="w-[95%] md:w-[70vw] h-full flex flex-col gap-5 rounded-2xl p-5 bg-[rgba(59,59,59)]">
            <NavbarAdmin></NavbarAdmin>
            <div class="flex gap-5">
                <Badge title="Chờ duyệt" :pending="cntPend" class="bg-blue-400"></Badge>
                <Badge title="Hoàn thành" :pending="cntDone" class="bg-green-400"></Badge>
                <Badge title="Trễ" :pending="cntLate" class="bg-red-400"></Badge>
            </div>
            <div>
                <BorrowItem></BorrowItem>
            </div>
        </div>

    </div>
    <button v-if="mobileSize" @click="toggleSidebar">Click</button>
</template>
<script setup>
    import { ref, onMounted } from "vue"
    import NavbarAdmin from '../../components/admin/navbarAdmin.vue'
    import SidebarAdmin from '../../components/admin/sidebarAdmin.vue'
    import Badge from '../../components/admin/badge.vue'
    import BorrowItem from '../../components/admin/borrowItem.vue'
    import { Motion } from "@motionone/vue";

    const load = ref(true)
    const visible = ref(true)
    const mobileSize = ref(false);

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            mobileSize.value = false
            visible.value = true
            load.value = true
        } else mobileSize.value = true
    })

    function getSize() {
        return window.innerWidth;
    }
    function toggleSidebar() {
        if (visible.value) {
            load.value = false;
            setTimeout(() => {
                visible.value = false;
            }, 500);
        } else {
            load.value = true;
            visible.value = true;
        }
    }
    onMounted(() => {
        mobileSize.value = getSize();
    })
</script>