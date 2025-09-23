<template lang="">
    <div className="min-h-screen w-full relative font-text">
        <div class="absolute inset-0 z-0"
            :style="{ background: 'radial-gradient(125% 125% at 50% 100%, #000000 40%,#010133 100%)',}"></div>

        <div class="relative z-10 p-[1vh] w-full h-[100vh] flex items-start justify-center gap-5">

            <Motion v-if="load && width < 768" :initial="{ x: -100 }" :animate="{ x: 0 }" :exit="{ x: -100 }"
                :transition="{ duration: 0.5 }" class="absolute top-0 left-0">
                <SidebarAdmin @close="load = false"></SidebarAdmin>
            </Motion>

            <Motion v-else-if="width > 768">
                <SidebarAdmin></SidebarAdmin>
            </Motion>

            <div class="w-[95%] md:w-[80vw] h-[98vh] bg-white rounded-2xl p-5 flex flex-col gap-5">
                <NavbarAdmin @open-sidebar="load = true"></NavbarAdmin>
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
    </div>
</template>
<script setup>
    import { ref, onMounted } from "vue"
    import NavbarAdmin from '../../components/admin/navbarAdmin.vue'
    import SidebarAdmin from '../../components/admin/sidebar.vue'
    import Badge from '../../components/admin/badge.vue'
    import BorrowItem from '../../components/admin/borrowItem.vue'
    import { Motion } from "@motionone/vue";

    const load = ref(false)
    const cntPend = ref(1);
    const cntDone = ref(2);
    const cntLate = ref(3);
    const width = ref(window.innerWidth);
    function updateWidth() {
        width.value = window.innerWidth
    }
    onMounted(() => {
        window.addEventListener('resize', updateWidth);
    })
</script>