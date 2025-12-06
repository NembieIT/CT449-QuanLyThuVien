<template lang="">
    <div v-if="!loading && loaded" class="relative w-full h-[100vh] flex items-start justify-center gap-5 p-2 font-text1"
        :style="{backgroundImage:`radial-gradient(125% 125% at 50% 90%, #000000 40%, #0d1a36 100%)`}">
        <Motion v-if="visible" :initial="{ x: -500 }" :animate="load ? { x: 0 } : {x: -500}"
            :transition="{ duration: 0.5 }"
            class="absolute z-10 w-[55vw] md:w-[35vw] lg:w-[15vw]  lg:static top-0 left-0 h-full">
            <SidebarAdmin :mobileSize="mobileSize" @toggleSidebar="toggleSidebar" :darkmode="darkmode" :isAdmin="isAdmin"></SidebarAdmin>
        </Motion>

        <div
            :class="`w-[95%] lg:w-[80vw] h-full flex flex-col gap-5 rounded-2xl p-5 ${darkmode?'bg-gray-900':'bg-white'}`">
            <NavbarAdmin @toggleDarkmode="darkmode=!darkmode" :mobileSize="mobileSize" @toggleSidebar="toggleSidebar">
            </NavbarAdmin>
            <div
                :class="`flex flex-col gap-5 md:flex-row items-start md:items-center justify-between px-5 ${darkmode?'bg-gray-700':'bg-backgroundItemAD'} p-3 rounded-[10px]`">
                <div class="flex gap-2 md:gap-5">
                    <Badge v-if="page=='pending'" title="Chờ duyệt" :count="cntPend" class="bg-blue-400">
                    </Badge>
                    <Badge v-if="page=='all'" title="Hoàn thành" :count="cntDone" class="bg-green-400">
                    </Badge>
                    <Badge v-if="page=='all'" title="Từ chối" :count="cntDeny" class="bg-red-400">
                    </Badge>
                    <Badge v-if="page=='all'" title="Trễ" :count="cntLate" class="bg-yellow-400">
                    </Badge>
                    <Badge v-if="page=='all'" title="Đang mượn" :count="cntLate" class="bg-gray-400">
                    </Badge>
                    <Badge v-if="page=='user'" title="Tổng số user" :count="cntUser" class="bg-white">
                    </Badge>
                    <Badge v-if="page=='nhanvien'" title="Tổng số nhân viên" :count="cntNV" class="bg-white">
                    </Badge>
                    <Badge v-if="page=='books'" title="Tổng số sách" :count="cntBooks" class="bg-white">
                    </Badge>
                    <Badge v-if="page=='nxb'" title="Tổng số nhà xuất bản" :count="cntNXB" class="bg-white">
                    </Badge>
                    <Badge v-if="page=='author'" title="Tổng số tác giả" :count="cntAuthor" class="bg-white">
                    </Badge>
                </div>
                <div class="flex items-center justify-center gap-5">
                    <div class="z-0">
                        <a-input-search class="nv-search" v-if="page=='all'||page=='pending'" v-model:value="value"
                            placeholder="Nhập tên" enter-button="Search" size="medium" @search="onSearch" />
                        <a-input-search class="nv-search" v-if="page=='books'" v-model:value="value"
                            placeholder="Nhập tên sách" enter-button="Search" size="medium" @search="onSearch" />
                        <a-input-search class="nv-search" v-if="page=='nxb'" v-model:value="value"
                            placeholder="Nhập tên hoặc mã NXB" enter-button="Search" size="medium" @search="onSearch" />
                        <a-input-search class="nv-search" v-if="page=='user'" v-model:value="value"
                            placeholder="Nhập tên người dùng" enter-button="Search" size="medium" @search="onSearch" />
                        <a-input-search class="nv-search" v-if="page=='nhanvien'" v-model:value="value"
                            placeholder="Nhập tên nhân viên" enter-button="Search" size="medium" @search="onSearch" />
                        <a-input-search class="nv-search" v-if="page=='author'" v-model:value="value"
                            placeholder="Nhập tên tác giả" enter-button="Search" size="medium" @search="onSearch" />
                    </div>
                    <a-dropdown v-if="page==='all'">
                        <template #overlay>
                            <a-menu @click="handleMenuClick">
                                <a-menu-item key="all">
                                    Tất cả
                                </a-menu-item>
                                <a-menu-item key="borrowing">
                                    Đang mượn
                                </a-menu-item>
                                <a-menu-item key="done">
                                    Đã xong
                                </a-menu-item>
                                <a-menu-item key="late">
                                    Trễ
                                </a-menu-item>
                                <a-menu-item key="deny">
                                    Từ chối
                                </a-menu-item>
                            </a-menu>
                        </template>
<a-button>
    Bộ lọc
</a-button>
</a-dropdown>
<a-dropdown v-if="page==='pending'">
    <template #overlay>
                            <a-menu @click="handleMenuClick">
                                <a-menu-item key="pending">
                                    Tất cả
                                </a-menu-item>
                                <a-menu-item key="today">
                                    Hôm nay
                                </a-menu-item>
                                <a-menu-item key="thisweek">
                                    Tuần này
                                </a-menu-item>
                                <a-menu-item key="thismonth">
                                    Tháng này
                                </a-menu-item>
                            </a-menu>
                        </template>
    <a-button>
        Bộ lọc
    </a-button>
</a-dropdown>
</div>
</div>
<span :class="`${darkmode?'text-white':'text-black'}`" v-if="page==='user'">Tên | Email | SĐT</span>
<span :class="`${darkmode?'text-white':'text-black'}`" v-if="page==='nhanvien'">Họ tên | Địa chỉ NV |
    SĐT</span>
<span :class="`${darkmode?'text-white':'text-black'}`" v-if="page==='nxb'">Mã NXB | Tên NXB | Địa chỉ</span>
<span :class="`${darkmode?'text-white':'text-black'}`" v-if="page==='author'">Mã tác giả | Tên tác
    giả</span>
<span :class="`${darkmode?'text-white':'text-black'}`" v-if="page==='books'">Tên sách | Đơn giá | Số
    quyển</span>
<span :class="`${darkmode?'text-white':'text-black'}`" v-if="page==='all' ||page=== 'pending'">Tên người
    dùng | Sách
    mượn | Ngày mượn | Tiền phạt</span>
<div class="h-full overflow-hidden">
    <div v-if="!visibleTask.length>0 && !loading" class="h-[85%] mb-5 flex flex-col items-center justify-center gap-5">
        <img src="../../../public/notfound.png" alt="NotFound" class="h-[80%]">
        <h3 class="text-2xl uppercase text-gray-400">Chưa có dữ liệu</h3>
    </div>
    <div v-if="!loading && visibleTask.length>0" class="flex flex-col gap-[5%] h-[85%] mb-5 overflow-hidden">
        <BorrowItem v-if="page=='pending' || page==='all'" v-for="(item, index) in visibleTask" :id="item._id"
            :key="index" :prop1="item.userid.ten||item.userid.holot" :prop2="item.bookid.TENSACH" :prop3="item.ngaymuon"
            :bookid="item.bookid._id" :status="item.status" :page="page" :prop4="item.tienphat" @details=handleDetails
            @accept="handleAccept" @deny="handleDeny" @complete="handleComplete" @delete="handleDelete"
            :darkmode="darkmode">
        </BorrowItem>
        <BorrowItem v-if="page==='user'" v-for="(item, index) in visibleTask" :key="index" :id="item._id"
            :prop1="item.ten" :prop2="item.address" :prop3="item.phone" :status="item.status" :page="page"
            @details="handleDetails" @delete="handleDelete" :darkmode="darkmode" @getid="handleGetID">
        </BorrowItem>
        <BorrowItem v-if="page==='nhanvien'" v-for="(item, index) in visibleTask" :key="index" :id="item._id"
            :prop1="item.nameNV" :prop2="item.addressNV" :prop3="item.phoneNV" :page="page" @details="handleDetails"
            @delete="handleDelete" :darkmode="darkmode">
        </BorrowItem>
        <BorrowItem v-if="page==='nxb'" v-for="(item, index) in visibleTask" :key="index" :id="item._id"
            :prop1="item.MANXB" :prop2="item.TENNXB" :prop3="item.DIACHI" :page="page" @details="handleDetails"
            @delete="handleDelete" :darkmode="darkmode">
        </BorrowItem>
        <BorrowItem v-if="page==='books'" v-for="(item, index) in visibleTask" :key="index" :id="item._id"
            :prop1="item.TENSACH" :prop2="item.DONGIA/1000+' Nghìn'" :prop3="item.SOQUYEN" :page="page"
            :img="item.IMAGEURL" @details="handleDetails" @delete="handleDelete" :darkmode="darkmode">
        </BorrowItem>
        <BorrowItem v-if="page==='author'" v-for="(item, index) in visibleTask" :key="index" :id="item._id"
            :prop1="item.MATACGIA" :prop2="item.TENTACGIA" :page="page" @details="handleDetails" @delete="handleDelete"
            :darkmode="darkmode">
        </BorrowItem>
    </div>
    <div class="h-[10%] flex items-center justify-between">
        <div :class="`${darkmode?'bg-gray-700 p-2 rounded-[5px]':''}`">
            <a-pagination v-model:current="current" :total="(totalPage*10)||0" show-less-items />
        </div>
        <div class="flex gap-5">
            <Button v-if="page==='all'" goto="/addborrow" title="Tạo đơn" icon="fa-plus" class="bg-green-400"></Button>
            <Button v-if="page==='user'" goto="/adduser" title="Thêm người dùng" icon="fa-plus"
                class="bg-green-400"></Button>
            <Button v-if="page==='nhanvien'" goto="/addnv" title="Thêm nhân viên" icon="fa-plus"
                class="bg-green-400"></Button>
            <Button v-if="page==='nxb'" goto="/addnxb" title="Thêm nhà xuất bản" icon="fa-plus"
                class="bg-green-400"></Button>
            <Button v-if="page==='books'" goto="/addbook" title="Thêm sách" icon="fa-plus"
                class="bg-green-400"></Button>
            <Button v-if="page==='author'" goto="/addauthor" title="Thêm tác giả" icon="fa-plus"
                class="bg-green-400"></Button>
        </div>
    </div>
</div>
<a-spin v-if="loading" :indicator="indicator" />
</div>
<Drawer :page="page" :currentDetail="currentDetail" :show="showDetail" @closeDetail="closeDetail">
</Drawer>

<a-modal v-model:open="openModalDel" title="Xác nhận" :confirm-loading="confirmLoading" @ok="handleOkDel">
    <p>Bạn có chắc muốn xoá?</p>
</a-modal>
<a-modal v-model:open="openModalAccept" title="Xác nhận" :confirm-loading="confirmLoading" @ok="handleOkAccept">
    <p>Duyệt đơn này ?</p>
</a-modal>
<a-modal v-model:open="openModalDeny" title="Xác nhận" :confirm-loading="confirmLoading" @ok="handleOkDeny">
    <p>Từ chối đơn này ?</p>
</a-modal>
<a-modal v-model:open="openModalComplete" title="Xác nhận" :confirm-loading="confirmLoading" @ok="handleOkComplete">
    <p>Hoàn tất đơn này ?</p>
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
import { jwtDecode } from "jwt-decode";
import { Motion } from "@motionone/vue";
import { useRoute } from 'vue-router';

// controller
import UserControllerApi from '../../controllerApi/user.admincontroller';
import NVControllerApi from '../../controllerApi/nhanvien.admincontroller';
import NXBControllerApi from '../../controllerApi/nxb.admincontroller';
import BookControllerApi from '../../controllerApi/books.admincontroller';
import AuthorControllerApi from '../../controllerApi/author.admincontroller';
import BorrowControllerApi from '../../controllerApi/borrow.admincontroller';

// Variable
const isAdmin = ref(false);
const currentLog = ref({});
const darkmode = ref(false);
const route = useRoute()
const load = ref(true);
const loaded = ref(false);
const visible = ref(true)
const mobileSize = ref(false);
const page = ref(''); //bien luu tru de xac dinh dang o trang nao
const current = ref(1); //pagination (trang hien tai)
const currentDetail = ref(null); //chi tiet
const deletingID = ref(null); //deleting
const borrowID = ref(''); //don muon 
const showDetail = ref(false); //drawer
const bookid = ref(''); //id book hien tai
var totalPage;
var visibleTask = ref([]);

// Data
var dataBorrow = ref([]);
var dataUser = ref([]);
var dataNV = ref([]);
var dataBooks = ref([]);
var dataNXB = ref([]);
var dataAuthor = ref([]);

// Hàm xoá dấu tiếng việt
function removeVietnameseTones(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'd')
        .toLowerCase()
        .replace(/\s+/g, '')
        .trim()
}

// Filter Data
var dataPending, dataLate, dataDone, dataBorrowing, dataDeny, cntDone, cntLate, cntPend, cntBorrowing, cntDeny;
const cntUser = ref(0);
const cntNV = ref(0);
const cntBooks = ref(0);
const cntNXB = ref(0);
const cntAuthor = ref(0);
function FilterDataAll() {
    if (dataBorrow) {
        dataPending = dataBorrow.filter(item => item.status.includes('pending'));
        dataLate = dataBorrow.filter(item => item.status.includes('late'));
        dataDone = dataBorrow.filter(item => item.status.includes('done'));
        dataBorrowing = dataBorrow.filter(item => item.status.includes('borrowing'));
        dataDeny = dataBorrow.filter(item => item.status.includes('deny'));
        cntDeny = dataDeny.length || 0;
        cntBorrowing = dataBorrowing.length || 0;
        cntDone = dataDone.length || 0;
        cntLate = dataLate.length || 0;
        cntPend = dataPending.length || 0;
    }
}

// Search
const value = ref('');
const onSearch = searchValue => {
    const search = removeVietnameseTones(searchValue);
    if (page.value == 'all') {
        visibleTask.value = dataBorrow.filter(item => (((removeVietnameseTones(item.userid.ten)).includes(search)) || ((removeVietnameseTones(item.userid.holot)).includes(search))));
    } else if (page.value == 'pending') {
        visibleTask.value = dataPending.filter(item => (((removeVietnameseTones(item.userid.ten)).includes(search)) || ((removeVietnameseTones(item.userid.holot)).includes(search))));
    } else if (page.value == 'books') {
        visibleTask.value = dataBooks.filter(item => (((removeVietnameseTones(item.TENSACH)).includes(search))));
    } else if (page.value == 'nxb') {
        visibleTask.value = dataNXB.filter(item => (((removeVietnameseTones(item.TENNXB)).includes(search)) || ((removeVietnameseTones(item.MANXB).includes(search)))));
    } else if (page.value == 'user') {
        visibleTask.value = dataUser.filter(item => (((removeVietnameseTones(item.ten)).includes(search)) || ((removeVietnameseTones(item.holot)).includes(search))));
    } else if (page.value == 'nhanvien') {
        visibleTask.value = dataNV.filter(item => (((removeVietnameseTones(item.nameNV)).includes(search))));
    } else if (page.value == 'author') {
        visibleTask.value = dataAuthor.filter(item => (((removeVietnameseTones(item.TENTACGIA)).includes(search)) || ((removeVietnameseTones(item.MATACGIA).includes(search)))));
    }
};

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

// Hoan tat don
const openModalComplete = ref(false);
const showModalComplete = () => {
    openModalComplete.value = true;
};
async function handleComplete(data) {
    borrowID.value = data.idborrow;
    bookid.value = data.bookid;
    const borrow = dataBorrow.find(item => item._id == data.idborrow);
    showModalComplete();
}
const handleOkComplete = async () => {
    confirmLoading.value = true;
    if (borrowID.value) {
        try {
            const res = BorrowControllerApi.updateBorrow(borrowID.value, { status: 'done', idborrow: borrowID.value, bookid: bookid.value })
                .then(res => {
                    if (res.EC == 1) {
                        setTimeout(() => {
                            openModalComplete.value = false;
                            confirmLoading.value = false;
                            toast.success("Đã hoàn thành đơn !", {
                                autoClose: 1600,
                                theme: "dark"
                            })
                        }, 500);
                        getAllData();
                    }
                })
        } catch (err) {
            console.log(err);
        }
    }
}

// Duyet don
const openModalAccept = ref(false);
const showModalAccept = () => {
    openModalAccept.value = true;
};
async function handleAccept(id) {
    borrowID.value = id;
    showModalAccept();
}
const handleOkAccept = async () => {
    confirmLoading.value = true;
    if (borrowID.value) {
        try {
            const res = BorrowControllerApi.updateBorrow(borrowID.value, { status: 'borrowing', idborrow: borrowID.value })
                .then(res => {
                    if (res.EC == 1) {
                        setTimeout(() => {
                            openModalAccept.value = false;
                            confirmLoading.value = false;
                            toast.success("Duyệt thành công !", {
                                autoClose: 1600,
                                theme: "dark"
                            })
                        }, 500);
                        getAllData();
                    }
                })
        } catch (err) {
            console.log(err);
        }
    }
};


// Tu choi don
const openModalDeny = ref(false);
const showModalDeny = () => {
    openModalDeny.value = true;
};
async function handleDeny(data) {
    borrowID.value = data.idborrow;
    bookid.value = data.bookid;
    showModalDeny();
}
const handleOkDeny = async () => {
    confirmLoading.value = true;
    if (borrowID.value) {
        try {
            const res = BorrowControllerApi.updateBorrow(borrowID.value, { status: 'deny', bookid: bookid.value })
                .then(res => {
                    if (res.EC == 1) {
                        setTimeout(() => {
                            openModalDeny.value = false;
                            confirmLoading.value = false;
                            toast.success("Từ chối thành công !", {
                                autoClose: 1600,
                                theme: "dark"
                            })
                        }, 500);
                        getAllData();
                    }
                })
        } catch (err) {
            console.log(err);
        }
    }
};

// Xem chi tiet
function closeDetail() {
    showDetail.value = false;
}

// handle Detail
async function handleDetails(id) {
    var detail
    if (page.value == 'user') {
        var detailUser = await dataUser.find(item => item._id == id);
        detail = {
            ...detailUser
        }
        detail.borrowing = detailUser.borrowing.map(item => item.bookid?.TENSACH);
        // detailUser.borrowing._id
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
    } else if (page.value == 'author') {
        detail = await dataAuthor.find(item => item._id === id);
    }
    currentDetail.value = detail;
    showDetail.value = true;
}

// handle GetID User
function handleGetID(id) {
    navigator.clipboard.writeText(id)
        .then(() => toast.success("Copy thành công !", {
            autoClose: 1200
        }))
        .catch(err => console.error("Error copying", err));
}

// handle Delete
const openModalDel = ref(false);
const confirmLoading = ref(false);
function handleDelete(id) {
    deletingID.value = id;
    showModalDel();
}
const showModalDel = () => {
    openModalDel.value = true;
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
                                openModalDel.value = false;
                                confirmLoading.value = false;
                                toast.success("Xoá thành công !", {
                                    autoClose: 1600,
                                    theme: "dark"
                                })
                            }, 500);
                            getAllData();
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
                                openModalDel.value = false;
                                confirmLoading.value = false;
                                toast.success("Xoá thành công !", {
                                    autoClose: 1600,
                                    theme: "dark"
                                })
                            }, 500);
                            getAllData();
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
                                openModalDel.value = false;
                                confirmLoading.value = false;
                                toast.success("Xoá thành công !", {
                                    autoClose: 1600,
                                    theme: "dark"
                                })
                            }, 500);
                            getAllData();
                        }
                    })
            } catch (err) {
                console.log(err);
            }
        } else if (page.value == 'books') {
            try {
                await BookControllerApi.deleteBook(deletingID.value)
                    .then(res => {
                        dataBooks = BookControllerApi.getBook();
                        if (res.EC == 1) {
                            setTimeout(() => {
                                openModalDel.value = false;
                                confirmLoading.value = false;
                                toast.success("Xoá thành công !", {
                                    autoClose: 1600,
                                    theme: "dark"
                                })
                            }, 500);
                            getAllData();
                        }
                    })
            } catch (err) {
                console.log(err);
            }
        } else if (page.value == 'all') {
            try {
                await BorrowControllerApi.deleteBorrow(deletingID.value)
                    .then(res => {
                        console.log(res);
                        if (res.EC == 1) {
                            setTimeout(() => {
                                openModalDel.value = false;
                                confirmLoading.value = false;
                                toast.success("Xoá thành công !", {
                                    autoClose: 1600,
                                    theme: "dark"
                                })
                            }, 500);
                            getAllData();
                        }
                    })
            } catch (err) {
                console.log(err);
            }
        } else if (page.value == 'author') {
            try {
                await AuthorControllerApi.deleteAuthor(deletingID.value)
                    .then(res => {
                        dataAuthor = AuthorControllerApi.getAuthor();
                        if (res.EC == 1) {
                            setTimeout(() => {
                                openModalDel.value = false;
                                confirmLoading.value = false;
                                toast.success("Xoá thành công !", {
                                    autoClose: 1600,
                                    theme: "dark"
                                })
                            }, 500);
                            getAllData();
                        }
                    })
            } catch (err) {
                console.log(err);
            }
        }
    }
};

// Filter
const handleMenuClick = e => {
    const data = getPageData(e.key);
    if (Array.isArray(data)) {
        visibleTask.value = data?.slice(
            (current.value - 1) * ItemPageLimit,
            current.value * ItemPageLimit
        )
    } else {
        visibleTask.value = [];
    }
};

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
    } else if (path.includes('author')) {
        totalPage = Math.ceil(dataAuthor?.length / ItemPageLimit) || 0
        page.value = 'author'
        return dataAuthor
    } else if (path.includes('borrowing')) {
        totalPage = Math.ceil(dataBorrowing?.length / ItemPageLimit) || 0
        return dataBorrowing
    } else if (path.includes('done')) {
        totalPage = Math.ceil(dataDone?.length / ItemPageLimit) || 0
        return dataDone
    } else if (path.includes('late')) {
        totalPage = Math.ceil(dataLate?.length / ItemPageLimit) || 0
        return dataLate
    } else if (path.includes('deny')) {
        totalPage = Math.ceil(dataDeny?.length / ItemPageLimit) || 0
        return dataDeny
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
        visibleTask.value = data?.slice(
            (current.value - 1) * ItemPageLimit,
            current.value * ItemPageLimit
        )
    } else {
        visibleTask.value = [];
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

async function getAllData() {
    mobileSize.value = getSize();

    // GetDataBorrow
    await BorrowControllerApi.getBorrow()
        .then(res => {
            dataBorrow = res.data
        })
    if (dataBorrow) {
        dataBorrow = dataBorrow.map(item => ({
            ...item,
            ngaymuon: new Date(item.ngaymuon).toLocaleDateString('vi-VN')
        }));
        dataBorrow.forEach(async item => {
            if (item.status == 'borrowing') {
                const today = new Date().toLocaleDateString('vi-VN');
                const [dayborrow, monthborrow] = item.ngaytra.split('/').map(Number);
                const [daynow, monthnow] = today.split('/').map(Number);
                if (monthborrow < monthnow) {
                    item.status = 'late'
                    await BorrowControllerApi.updateBorrow(item._id, { status: 'late' });
                } else if (dayborrow < daynow) {
                    item.status = 'late'
                    await BorrowControllerApi.updateBorrow(item._id, { status: 'late' });
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

    // getDataAuthor
    dataAuthor = await AuthorControllerApi.getAuthor()
    cntAuthor.value = dataAuthor?.length || 0;

    loading.value = false;
    getDataRoute();
}

onMounted(async () => {
    await getAllData();
    const token = sessionStorage.getItem('accessToken');
    if (token) {
        const userInfo = jwtDecode(token);
        currentLog.value = userInfo;
        if (currentLog.value.role == 'AD') {
            isAdmin.value = true;
        }
    }
    loaded.value = true;
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

<style scoped>
/* màu chữ & placeholder */
:deep(.nv-search .ant-input) {
    color: #111827;
}

:deep(.nv-search .ant-input::placeholder) {
    color: #9ca3af;
}

/* viền input */
:deep(.nv-search .ant-input),
:deep(.nv-search .ant-input-affix-wrapper) {
    border-color: #ffffff !important;
}

:deep(.nv-search .ant-input:focus),
:deep(.nv-search .ant-input-affix-wrapper-focused) {
    border-color: #7b8c8f !important;
    box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.2);
}

/* màu nút Search khi có enter-button */
:deep(.nv-search .ant-input-search-button) {
    background: #252b29 !important;
    /* xanh ngọc */
    border-color: #000000 !important;
    color: #fff !important;
}

:deep(.nv-search .ant-input-search-button:hover) {
    background: #059669 !important;
    border-color: #000000 !important;
}
</style>