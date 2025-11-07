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
                    <Badge v-if="page=='pending' || page=='all'" title="Chờ duyệt" :count="cntPend" class="bg-blue-400">
                    </Badge>
                    <Badge v-if="page=='all'" title="Hoàn thành" :count="cntDone" class="bg-green-400">
                    </Badge>
                    <Badge v-if="page=='all'" title="Trễ" :count="cntLate" class="bg-red-400">
                    </Badge>
                    <Badge v-if="page=='user'" title="Tổng số user" :count="cntUser" class="bg-white">
                    </Badge>
                    <Badge v-if="page=='nhanvien'" title="Tổng số nhân viên" :count="cntNV" class="bg-white">
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
<span v-if="page==='user'">Tên | Email | SĐT</span>
<span v-if="page==='nhanvien'">Họ tên | Địa chỉ NV | SĐT</span>
<span v-if="page==='nxb'">Mã NXB | Tên NXB | Địa chỉ</span>
<span v-if="page==='books'">Tên sách | Đơn giá | Số quyển</span>
<span v-if="page==='all' ||page=== 'pending'">Tên người dùng | Sách mượn | Ngày mượn</span>
<div v-if="!loading" class="flex flex-col gap-[5%] h-[55%] overflow-hidden">
    <a-spin v-if="loading" :indicator="indicator" />
    <BorrowItem v-if="page=='pending' || page==='all'" v-for="(item, index) in visibleTask" :id="item._id" :key="index"
        :prop1="item.userid.ten" :prop2="item.bookid.TENSACH" :prop3="item.ngaymuon" :status="item.status" :page="page"
        @details=handleDetails>
    </BorrowItem>
    <BorrowItem v-if="page==='user'" v-for="(item, index) in visibleTask" :key="index" :id="item._id" :prop1="item.ten"
        :prop2="item.address" :prop3="item.phone" :status="item.status" :page="page" @details="handleDetails"
        @delete="handleDelete">
    </BorrowItem>
    <BorrowItem v-if="page==='nhanvien'" v-for="(item, index) in visibleTask" :key="index" :id="item._id"
        :prop1="item.nameNV" :prop2="item.addressNV" :prop3="item.phoneNV" :page="page" @details="handleDetails"
        @delete="handleDelete">
    </BorrowItem>
    <BorrowItem v-if="page==='nxb'" v-for="(item, index) in visibleTask" :key="index" :id="item._id" :prop1="item.MANXB"
        :prop2="item.TENNXB" :prop3="item.DIACHI" :page="page" @details="handleDetails" @delete="handleDelete">
    </BorrowItem>
    <BorrowItem v-if="page==='books'" v-for="(item, index) in visibleTask" :key="index" :id="item._id"
        :prop1="item.TENSACH" :prop2="item.DONGIA/1000+' Nghìn'" :prop3="item.SOQUYEN" :page="page"
        @details="handleDetails" @delete="handleDelete">
    </BorrowItem>
    <h3 v-if="!visibleTask.length>0">Not Found</h3>
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
        <Button v-if="page==='nhanvien'" goto="/addnv" title="Thêm nhân viên" icon="fa-plus"
            class="bg-green-400"></Button>
        <Button v-if="page==='nxb'" goto="/addnxb" title="Thêm nhà xuất bản" icon="fa-plus"
            class="bg-green-400"></Button>
        <Button v-if="page==='books'" goto="/addbook" title="Thêm sách" icon="fa-plus" class="bg-green-400"></Button>
    </div>
</div>
</div>
<Drawer :page="page" :currentDetail="currentDetail" :show="showDetail" @closeDetail="closeDetail">
</Drawer>

<a-modal v-model:open="openModal" title="Xác nhận" :confirm-loading="confirmLoading" @ok="handleOkDel">
    <p>Bạn có chắc muốn xoá?</p>
</a-modal>
</div>
</template>
<script setup>
import { ref, onMounted, onBeforeMount, watch } from "vue"
import { toast } from 'vue3-toastify'
import { ItemPageLimit } from '../../data/data'
import NavbarAdmin from '../../components/admin/navbarAdmin.vue'
import SidebarAdmin from '../../components/admin/sidebarAdmin.vue'
import Badge from '../../components/admin/badge.vue'
import BorrowItem from '../../components/admin/borrowItem.vue'
import Button from '../../components/admin/button.vue'
import Drawer from '../../components/admin/drawer.vue'
import { Motion } from "@motionone/vue";
import { useRoute } from 'vue-router';

// controller
import UserControllerApi from '../../controllerApi/user.admincontroller';
import NVControllerApi from '../../controllerApi/nhanvien.admincontroller';
import NXBControllerApi from '../../controllerApi/nxb.admincontroller';
import BookControllerApi from '../../controllerApi/books.admincontroller';
import BorrowControllerApi from '../../controllerApi/borrow.admincontroller';

// Variable
const route = useRoute()
const load = ref(true)
const visible = ref(true)
const mobileSize = ref(false);
const page = ref(''); //bien luu tru de xac dinh dang o trang nao
const current = ref(1); //pagination (trang hien tai)
const currentDetail = ref(null); //chi tiet
const deletingID = ref(null); //deleting
const showDetail = ref(false); //drawer
var totalPage;
var visibleTask = [];

// Data
var dataBorrow = ref([]);
var dataUser = ref([]);
var dataNV = ref([]);
var dataBooks = ref([]);
var dataNXB = ref([]);

// Filter Data
var dataPending, dataLate, dataDone, cntDone, cntLate, cntPend;
const cntUser = ref(0);
const cntNV = ref(0);
const cntBooks = ref(0);
const cntNXB = ref(0);
function FilterDataAll() {
    if (dataBorrow) {
        dataPending = dataBorrow.filter(item => item.status.includes('pending'));
        dataLate = dataBorrow.filter(item => item.status.includes('late'));
        dataDone = dataBorrow.filter(item => item.status.includes('done'));
        cntDone = dataDone.length || 0;
        cntLate = dataLate.length || 0;
        cntPend = dataPending.length || 0;
    }
}

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
function closeDetail() {
    showDetail.value = false;
}

// handle Detail
async function handleDetails(id) {
    var detail
    if (page.value == 'user') {
        detail = dataUser.find(item => item._id === id);
    } else if (page.value == 'nhanvien') {
        detail = await dataNV.find(item => item._id === id);
    } else if (page.value == 'nxb') {
        detail = await dataNXB.find(item => item._id === id);
    } else if (page.value == 'books') {
        detail = await dataBooks.find(item => item._id === id);
    } else if (page.value == 'all') {
        var detailBorrow = await dataBorrow.find(item => item._id == id);
        detail = {
            ...detailBorrow
        }
        detail.userid = detailBorrow.userid.ten
        detail.bookid = detailBorrow.bookid.TENSACH
    } else if (page.value == 'pending') {
        var detailPending = await dataBorrow.find(item => item._id == id);
        detail = {
            ...detailPending
        }
        detail.userid = detailPending.userid.ten
        detail.bookid = detailPending.bookid.TENSACH
        console.log(detail);
    }
    currentDetail.value = detail;
    showDetail.value = true;
}

// handle Delete
function handleDelete(id) {
    deletingID.value = id;
    showModal();
}

//Show modal Delete
const openModal = ref(false);
const confirmLoading = ref(false);
const showModal = () => {
    openModal.value = true;
};
const handleOkDel = async () => {
    confirmLoading.value = true;
    if (deletingID.value) {
        if (page.value == "user") {
            try {
                const res = UserControllerApi.deleteUser(deletingID.value)
                    .then(res => {
                        if (res.EC == 1) {
                            setTimeout(() => {
                                openModal.value = false;
                                confirmLoading.value = false;
                                toast.success("Xoá thành công !", {
                                    autoClose: 1600
                                })
                            }, 500);
                            setTimeout(() => {
                                window.location.reload();
                            }, 1600)
                        }
                    })
            } catch (err) {
                console.log(err);
            }
        } else if (page.value == "nhanvien") {
            try {
                const res = NVControllerApi.deleteNV(deletingID.value)
                    .then(res => {
                        dataNV = NVControllerApi.getNV();
                        if (res.EC == 1) {
                            setTimeout(() => {
                                openModal.value = false;
                                confirmLoading.value = false;
                                toast.success("Xoá thành công !", {
                                    autoClose: 1600
                                })
                            }, 500);
                            setTimeout(() => {
                                window.location.reload();
                            }, 1600)
                        }
                    })
            } catch (err) {
                console.log(err);
            }
        } else if (page.value == "nxb") {
            try {
                const res = NXBControllerApi.deleteNXB(deletingID.value)
                    .then(res => {
                        dataNXB = NXBControllerApi.getNXB();
                        if (res.EC == 1) {
                            setTimeout(() => {
                                openModal.value = false;
                                confirmLoading.value = false;
                                toast.success("Xoá thành công !", {
                                    autoClose: 1600
                                })
                            }, 500);
                            setTimeout(() => {
                                window.location.reload();
                            }, 1600)
                        }
                    })
            } catch (err) {
                console.log(err);
            }
        } else if (page.value == 'books') {
            try {
                const res = BookControllerApi.deleteBook(deletingID.value)
                    .then(res => {
                        dataBooks = BookControllerApi.getBook();
                        if (res.EC == 1) {
                            setTimeout(() => {
                                openModal.value = false;
                                confirmLoading.value = false;
                                toast.success("Xoá thành công !", {
                                    autoClose: 1600
                                })
                            }, 500);
                            setTimeout(() => {
                                window.location.reload();
                            }, 1600)
                        }
                    })
            } catch (err) {
                console.log(err);
            }
        }
    }
};

// const handleMenuClick = e => { //filter day, time (not done)
//     if (e.key.includes('2')) {
//         const now = new Date();
//         const todayList = visibleTask.filter(item => item.date === 'today');
//     }
// };

const getPageData = (path) => {
    if (path.includes('pending')) {
        totalPage = Math.ceil(dataPending?.length / ItemPageLimit) || 0
        page.value = 'pending'
        return dataPending
    } else if (path.includes('user')) {
        totalPage = Math.ceil(dataUser?.length / ItemPageLimit) || 0
        page.value = 'user'
        return dataUser
    } else if (path.includes('nhanvien')) {
        totalPage = Math.ceil(dataNV?.length / ItemPageLimit) || 0
        page.value = 'nhanvien'
        return dataNV
    } else if (path.includes('books')) {
        totalPage = Math.ceil(dataBooks?.length / ItemPageLimit) || 0
        page.value = 'books'
        return dataBooks
    } else if (path.includes('nxb')) {
        totalPage = Math.ceil(dataNXB?.length / ItemPageLimit) || 0
        page.value = 'nxb'
        return dataNXB
    } else if (path.includes('doanhthu')) {
        page.value = 'doanhthu'
        return []
    } else {
        totalPage = Math.ceil(dataBorrow?.length / ItemPageLimit) || 0
        page.value = 'all'
        return dataBorrow
    }
}

const getDataRoute = () => {
    const path = route.fullPath;
    const data = getPageData(path);
    if (Array.isArray(data)) {
        visibleTask = data?.slice(
            (current.value - 1) * ItemPageLimit,
            current.value * ItemPageLimit
        )
    } else {
        visibleTask = [];
    }
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

onMounted(async () => {
    mobileSize.value = getSize();

    // GetDataBorrow
    await BorrowControllerApi.getBorrow()
        .then(res => {
            dataBorrow = res.result
        })
    if (dataBorrow) {
        dataBorrow = dataBorrow.map(item => ({
            ...item,
            ngaymuon: item.ngaymuon
                ? new Date(item.ngaymuon).toLocaleDateString('vi-VN')
                : null,
        }));
        dataBorrow.forEach(item => {
            if (item.status == 'borrowing') {
                const today = new Date().toLocaleDateString('vi-VN');
                const ngaytra = new Date(item.ngaytra).toLocaleDateString('vi-VN');
                if (ngaytra < today) {
                    item.status = 'late'
                    console.log(item);
                }
            }
        })
        FilterDataAll();
    }

    // GetDataUser
    dataUser = await UserControllerApi.getUser();
    cntUser.value = dataUser?.length || 0;

    // GetDataNV
    dataNV = await NVControllerApi.getNV();
    cntNV.value = dataNV?.length || 0;

    // getDataNXB
    await NXBControllerApi.getNXB()
        .then(res => {
            dataNXB = res;
        })
    cntNXB.value = dataNXB?.length || 0;

    // getDataBooks
    dataBooks = await BookControllerApi.getBook()
    cntBooks.value = dataBooks?.length || 0;

    loading.value = false;
    getDataRoute();
})

// Side function
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
</script>