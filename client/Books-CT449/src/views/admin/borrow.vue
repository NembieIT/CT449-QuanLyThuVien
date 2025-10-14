<template lang="">
    <div class="relative w-full h-[100vh] flex items-start justify-center gap-5 p-2 font-text1"
        :style="{backgroundImage:`radial-gradient(125% 125% at 50% 90%, #000000 40%, #0d1a36 100%)`}">
        <Motion v-if="visible" :initial="{ x: -500 }" :animate="load ? { x: 0 } : {x: -500}"
            :transition="{ duration: 0.5 }"
            class="absolute w-[55vw] md:w-[35vw] lg:w-[15vw]  lg:static top-0 left-0 h-full">
            <SidebarAdmin :mobileSize="mobileSize" @toggleSidebar="toggleSidebar"></SidebarAdmin>
        </Motion>

        <div class="w-[95%] lg:w-[80vw] h-full flex flex-col gap-5 rounded-2xl p-5 bg-white">
            <NavbarAdmin :mobileSize="mobileSize" @toggleSidebar="toggleSidebar"></NavbarAdmin>
            <div class="flex items-center justify-between px-5 bg-backgroundItemAD p-3 rounded-[10px]">
                <div class="flex gap-5">
                    <Badge v-if="page=='pending' || page=='all'" title="Chờ duyệt" :count="cntPend" class="bg-blue-600">
                    </Badge>
                    <Badge v-if="page=='all'" title="Hoàn thành" :count="cntDone" class="bg-green-600">
                    </Badge>
                    <Badge v-if="page=='all'" title="Trễ" :count="cntLate" class="bg-red-600">
                    </Badge>
                    <Badge v-if="page=='user'" title="Tổng số user" :count="cntUser" class="bg-white">
                    </Badge>
                    <Badge v-if="page=='nhanvien'" title="Tổng số nhân viên" :count="cntUser" class="bg-white">
                    </Badge>
                    <Badge v-if="page=='books'" title="Tổng số sách" :count="cntBooks" class="bg-white">
                    </Badge>
                    <Badge v-if="page=='nxb'" title="Tổng số nhà xuất bản" :count="cntNXB" class="bg-white">
                    </Badge>
                    <h2 v-if="page=='doanhthu'" class="font-bold text-[20px] md:text-2xl">Doanh thu</h2>
                </div>
                <div v-if="page==='all'||page==='pending'||page==='doanhthu'">
                    <a-dropdown>
                        <template #overlay>
                            <a-menu @click="handleMenuClick">
                                <a-menu-item key="1">
                                    Tất cả
                                </a-menu-item>
                                <a-menu-item key="2">
                                    Hôm nay
                                </a-menu-item>
                                <a-menu-item key="3">
                                    Tuần này
                                </a-menu-item>
                                <a-menu-item key="4">
                                    Tháng này
                                </a-menu-item>
                            </a-menu>
                        </template>
<a-button>
    TẤT CẢ
</a-button>
</a-dropdown>
</div>
</div>
<div class="flex flex-col gap-[5%] h-[55%] overflow-hidden">
    <BorrowItem v-if="page=='pending' || page==='all'" v-for="(item, index) in visibleTask" :key="index"
        :name="item.name" :email="item.email" :phone="item.sdt" :status="page=='user'? '': item.status" :page="page">
    </BorrowItem>
    <BorrowItem v-if="page==='user'" v-for="(item, index) in visibleTask" :key="index" :id="item._id" :name="item.ten"
        :email="item.address" :phone="item.phone" :status="page=='user'? '': item.status" :page="page"
        @details="handleDetails" @deleteUser="handleDeleteUser">
    </BorrowItem>
    <a-spin v-if="loading" :indicator="indicator" />
</div>
<div class="h-[10%] flex items-center justify-between">
    <div>
        <a-pagination v-model:current="current" :total="(totalPage*10)||0" show-less-items />
    </div>
    <div class="flex gap-5">
        <Button v-if="page==='all'||page==='pending'" goto="/addborrow" title="Tạo đơn" icon="fa-plus"
            class="bg-green-400"></Button>
        <Button v-if="page==='user'" goto="/adduser" title="Thêm người dùng" icon="fa-plus"
            class="bg-green-400"></Button>
    </div>
</div>
</div>
<a-drawer width="400" placement="right" :closable="false" :open="open" @close="onClose" class="font-text1">
    <div class="h-fit">
        <p class="text-5xl font-bold mb-10 uppercase text-emerald-400">Thông tin chi tiết</p>
        <p class="text-2xl font-text1 font-bold">Họ lót: <span class="text-red-500">{{currentUserDetail.holot}}</span>
        </p>
        <p class="text-2xl font-text1 font-bold">Tên : <span class="text-red-500">{{currentUserDetail.ten}}</span>
        </p>
        <p class="text-2xl font-text1 font-bold">Ngày sinh: <span class="text-red-500">{{new
                Date(currentUserDetail.ngaysinh).toLocaleDateString('vi-VN')}}</span></p>
        <p class="text-2xl font-text1 font-bold">Giới tính: <span class="text-red-500">{{currentUserDetail.sex}}</span>
        </p>
        <p class="text-2xl font-text1 font-bold">Địa chỉ: <span
                class="text-red-500">{{currentUserDetail.address}}</span></p>
        <p class="text-2xl font-text1 font-bold">Số điện thoại: <span
                class="text-red-500">{{currentUserDetail.phone}}</span>
        </p>
        <p class="text-2xl font-text1 font-bold">User ID: <span
                class="text-red-500">{{currentUserDetail.usernameUser}}</span>
        </p>
    </div>
    <div class="absolute bottom-[30%] left-5">
        <Button :goto="`/adduser/${currentUserDetail._id}`" title="Chỉnh sửa" icon="fa-plus" class="text-2xl"></Button>
    </div>
</a-drawer>

<a-modal v-model:open="openModal" title="Xác nhận" :confirm-loading="confirmLoading" @ok="handleOkDel">
    <p>Bạn có chắc muốn xoá?</p>
</a-modal>
</div>
</template>
<script setup>
import { ref, onMounted, onBeforeMount, watch } from "vue"
import { toast } from 'vue3-toastify'
import NavbarAdmin from '../../components/admin/navbarAdmin.vue'
import SidebarAdmin from '../../components/admin/sidebarAdmin.vue'
import Badge from '../../components/admin/badge.vue'
import BorrowItem from '../../components/admin/borrowItem.vue'
import Button from '../../components/admin/button.vue'
import { Motion } from "@motionone/vue";
import { useRoute } from 'vue-router';
import UserService from "../../services/admin/user.service"

// Variable
const route = useRoute()
const load = ref(true)
const visible = ref(true)
const mobileSize = ref(false);
const page = ref('');
const current = ref(1);
const currentUserDetail = ref(null);
const deletingUser = ref(null);
var totalPage;
var visibleTask = [];

// Data
var dataAll = []
var dataUser = []
var dataNV = []
var dataBooks = []
var dataNXB = []


// Icon loading
const loading = ref(true);
import { LoadingOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';
const indicator = h(LoadingOutlined, {
    style: {
        fontSize: '24px',
    },
    spin: true,
});

// Xem chi tiet
const open = ref(false);
const showDrawer = () => {
    open.value = true;
};
const onClose = () => {
    open.value = false;
};

//Show modal Delete
const openModal = ref(false);
const confirmLoading = ref(false);
const showModal = () => {
    openModal.value = true;
};
const handleOkDel = async () => {
    confirmLoading.value = true;
    if (deletingUser.value) {
        try {
            const res = await UserService.delete(deletingUser.value);
            if (res.EC == 1) {
                setTimeout(() => {
                    openModal.value = false;
                    confirmLoading.value = false;
                    getUser();
                }, 1600);
                setTimeout(() => {
                    toast.success("Xoá thành công !", {
                        autoClose: 1600
                    })
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
};

// Filter Data
const dataPending = dataAll.filter(item => item.status === 'pending');
const dataLate = dataAll.filter(item => item.status.includes('late'));
const dataDone = dataAll.filter(item => item.status === 'done');
const cntDone = dataDone.length;
const cntLate = dataLate.length;
const cntPend = dataPending.length;
const cntUser = ref(0);
const cntNV = dataNV.length;
const cntBooks = dataBooks.length;
const cntNXB = dataNXB.length;

const ItemPageLimit = 4;

function handleDetails(id) {
    const detail = dataUser.find(item => item._id === id);
    currentUserDetail.value = detail;
    showDrawer();
}
function handleDeleteUser(id) {
    deletingUser.value = id;
    showModal();
}

// Get Data
async function getUser() {
    dataUser = (await UserService.getAll()).data;
    cntUser.value = dataUser.length;
    loading.value = false;
    getDataRoute();
}

const handleMenuClick = e => { //filter day, time
    if (e.key.includes('2')) {
        const now = new Date();
        const todayList = visibleTask.filter(item => item.date === 'today');
    }
};

window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        mobileSize.value = false
        visible.value = true
        load.value = true
    } else mobileSize.value = true
})

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

const getPageData = (path) => {
    if (path.includes('pending')) {
        totalPage = Math.ceil(dataPending.length / ItemPageLimit)
        page.value = 'pending'
        return dataPending
    } else if (path.includes('user')) {
        totalPage = Math.ceil(dataUser.length / ItemPageLimit)
        page.value = 'user'
        return dataUser
    } else if (path.includes('nhanvien')) {
        totalPage = Math.ceil(dataNV.length / ItemPageLimit)
        page.value = 'nhanvien'
        return dataNV
    } else if (path.includes('books')) {
        totalPage = Math.ceil(dataBooks.length / ItemPageLimit)
        page.value = 'books'
        return dataBooks
    } else if (path.includes('nxb')) {
        totalPage = Math.ceil(dataNXB.length / ItemPageLimit)
        page.value = 'nxb'
        return dataNXB
    } else if (path.includes('doanhthu')) {
        page.value = 'doanhthu'
        return []
    } else {
        totalPage = Math.ceil(dataAll.length / ItemPageLimit)
        page.value = 'all'
        return dataAll
    }
}

const getDataRoute = () => {
    const path = route.fullPath;
    const data = getPageData(path);
    visibleTask = data.slice(
        (current.value - 1) * ItemPageLimit,
        current.value * ItemPageLimit
    )
}

watch(
    () => route.fullPath, () => {
        if (mobileSize.value) {
            if (visible.value) {
                load.value = false;
                setTimeout(() => {
                    visible.value = false;
                }, 500);
            }
        }
        current.value = 1;
        getDataRoute();
    }
)

watch(
    () => current.value, () => {
        getDataRoute();
    }
)

onBeforeMount(async () => {
    await getUser();
    getDataRoute();
})

onMounted(async () => {
    mobileSize.value = getSize();
})
</script>