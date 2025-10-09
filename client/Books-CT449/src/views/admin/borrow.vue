<template lang="">
    <div class="relative w-full h-[100vh] flex items-start justify-center gap-5 p-2 font-text1"
        :style="{backgroundImage:`radial-gradient(125% 125% at 50% 90%, #000000 40%, #0d1a36 100%)`}">
        <Motion v-if="visible" :initial="{ x: -500 }" :animate="load ? { x: 0 } : {x: -500}"
            :transition="{ duration: 0.5 }" class="absolute w-[55vw] md:w-[15vw]  md:static top-0 left-0 h-full">
            <SidebarAdmin :mobileSize="mobileSize" @toggleSidebar="toggleSidebar"></SidebarAdmin>
        </Motion>

        <div class="w-[95%] md:w-[80vw] h-full flex flex-col gap-5 rounded-2xl p-5 bg-white">
            <NavbarAdmin :mobileSize="mobileSize" @toggleSidebar="toggleSidebar"></NavbarAdmin>
            <div class="flex items-center justify-between px-5 bg-backgroundItemAD p-3 rounded-[10px]">
                <div class="flex gap-5">
                    <Badge title="Chờ duyệt" :count="cntPend" class="bg-blue-600"></Badge>
                    <Badge title="Hoàn thành" :count="cntDone" class="bg-green-600"></Badge>
                    <Badge title="Trễ" :count="cntLate" class="bg-red-600"></Badge>
                </div>
                <div>
                    <a-dropdown>
                        <template #overlay>
                            <a-menu @click="handleMenuClick">
                                <a-menu-item key="1">
                                    1st menu item
                                </a-menu-item>
                                <a-menu-item key="2">
                                    2nd menu item
                                </a-menu-item>
                                <a-menu-item key="3">
                                    3rd item
                                </a-menu-item>
                            </a-menu>
                        </template>
                        <a-button>
                            Bộ lọc
                        </a-button>
                    </a-dropdown>
                </div>
            </div>
            <div class="flex flex-col gap-[5%] h-[55%] overflow-hidden">
                <BorrowItem v-for="(item, index) in data" :key="index" :name="item.name" :email="item.email"
                    :phone="item.sdt" :status="item.status"></BorrowItem>
            </div>
            <div class="h-[10%] flex items-center justify-between">
                <div>
                    <a-pagination v-model:current="current" :total="50" show-less-items />
                </div>
                <div class="flex gap-5">
                    <Button goto="/reset" title="Làm mới" icon="fa-arrow-rotate-right" class="bg-blue-400"></Button>
                    <Button goto="/add" title="Tạo đơn" icon="fa-plus" class="bg-green-400"></Button>
                </div>
                <h3 v-if="isPending">Pending</h3>
            </div>
        </div>

    </div>
</template>
<script setup>
    import { ref, onMounted, watch } from "vue"
    import NavbarAdmin from '../../components/admin/navbarAdmin.vue'
    import SidebarAdmin from '../../components/admin/sidebarAdmin.vue'
    import Badge from '../../components/admin/badge.vue'
    import BorrowItem from '../../components/admin/borrowItem.vue'
    import Button from '../../components/admin/button.vue'
    import { Motion } from "@motionone/vue";
    import { useRoute } from 'vue-router';

    const route = useRoute()

    const load = ref(true)
    const visible = ref(true)
    const mobileSize = ref(false);
    const isPending = ref(true);
    const data = [
        {
            name: "kk",
            email: "email",
            sdt: "0215",
            status: "done"
        },
        {
            name: "kk1",
            email: "email",
            sdt: "02155",
            status: "pending"
        },
        {
            name: "kk2",
            email: "email",
            sdt: "021525",
            status: "late 2 days"
        },
        {
            name: "kk3",
            email: "email",
            sdt: "021588",
            status: "done"
        },
        {
            name: "kk4",
            email: "email",
            sdt: "02151232",
            status: "done"
        },
    ]

    const cntDone = ref(5);
    const cntLate = ref(10);
    const cntPend = ref(6);
    const current = ref(5);

    const handleMenuClick = e => {
        console.log('click', e);
    };

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            mobileSize.value = false
            visible.value = true
            load.value = true
        } else mobileSize.value = true
    })

    function getParams() {
        if (route.fullPath.includes('pending')) {
            return true
        }
        return false
    }
    function getSize() {
        if (window.innerWidth > 1024) return false;
        return true;
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

    watch(
        () => route.fullPath,
        (newPath, oldPath) => {
            if (newPath.includes('pending')) {
                isPending.value = true;
            } else {
                isPending.value = false;
            }
        }
    )
    onMounted(() => {
        mobileSize.value = getSize();
        isPending.value = getParams();
    })
</script>