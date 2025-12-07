<template>
    <div v-if="loaded" class="relative h-screen w-screen flex items-center justify-center font-text2">
        <div class="w-0 lg:w-[15vw] h-full">
            <SidebarUser @closeSidebar="sidebar = false" @showSidebar="sidebar = true" :sidebar="sidebar">
            </SidebarUser>
        </div>

        <div class="w-full lg:w-[85vw] h-full">
            <div class="h-[10vh] w-full">
                <NavbarUser @inputSearch="handleSearchInput" @toggleSidebar="sidebar = true" :user="user" :page="page">
                </NavbarUser>
            </div>
            <div class="h-[90vh] w-full flex items-center bg-gray-500">
                <div v-if="page == '/trangchu'"
                    class="w-full md:w-[65%] lg:w-[75%] 2xl:w-[80%] h-full overflow-y-scroll overflow-x-hidden">
                    <Homepage @details="handleDetail" :dataBook="dataBook"></Homepage>
                </div>
                <div v-if="page == '/category'"
                    class="w-full md:w-[65%] lg:w-[75%] 2xl:w-[80%] h-full overflow-y-scroll overflow-x-hidden">
                    <Category @details="handleDetail" :dataBook="dataBook"></Category>
                </div>
                <div v-if="page == '/search'"
                    class="w-full md:w-[65%] lg:w-[75%] 2xl:w-[80%] h-full overflow-y-scroll overflow-x-hidden">
                    <Search @details="handleDetail" :dataBook="dataBook" :searchValue="searchValue"></Search>
                </div>
                <div v-if="page == '/borrow'"
                    :class="[(page == '/borrow' ? 'min-w-full' : ''), 'w-full md:w-[65%] lg:w-[75%] 2xl:w-[80%] h-full overflow-y-scroll overflow-x-hidden']">
                    <Borrowing @details="handleDetail" :dataBorrowing="dataBorrow" :user="user"
                        :searchValue="searchValue">
                    </Borrowing>
                </div>
                <div v-if="page == '/all/hot'"
                    class="w-full md:w-[65%] lg:w-[75%] 2xl:w-[80%] h-full overflow-y-scroll overflow-x-hidden">
                    <SeeAll @details="handleDetail" :dataBook="dataBook" :searchValue="searchValue"></SeeAll>
                </div>
                <div v-if="page == '/all/newest'"
                    class="w-full md:w-[65%] lg:w-[75%] 2xl:w-[80%] h-full overflow-y-scroll overflow-x-hidden">
                    <SeeAll @details="handleDetail" :dataBook="dataBook" :searchValue="searchValue"></SeeAll>
                </div>
                <div v-if="page == '/favorite'"
                    class="w-full md:w-[65%] lg:w-[75%] 2xl:w-[80%] h-full overflow-y-scroll overflow-x-hidden">
                    <Favorite @details="handleDetail" :dataBook="dataBook" :searchValue="searchValue" :user="user">
                    </Favorite>
                </div>

                <div
                    :class="[(page == '/borrow') ? 'w-0 border-red-500' : '', 'w-0 md:w-[35%] lg:w-[25%] 2xl:w-[20%] h-full']">
                    <DetailBook v-show="!(page == '/borrow')" :showDetailMobile="showDetailMobile"
                        @closeDetail="showDetailMobile = false" @showDetail="showDetailMobile = true" :book="detailBook"
                        @openModel="openModelDetail" :isFav="isFav" :Favlist="Favlist" @noFav="isFav = false"
                        @Faved="isFav = true" :user="formState.userid" @updateData="getData">
                    </DetailBook>
                </div>
            </div>
        </div>

        <Motion v-if="modelDetail" :initial="{ scale: 0.5 }" :animate="load ? { scale: 1 } : { scale: 0 }"
            :transition="{ duration: 0.5 }"
            class="absolute h-[65%] lg:h-fit w-[90%] lg:w-1/2 bg-gray-300 rounded-[10px] p-5 border overflow-scroll z-20">
            <div class="w-full flex items-center justify-end">
                <CloseCircleOutlined class="cursor-pointer scale-150" @click="openModelDetail" />
            </div>
            <div
                class="flex flex-col md:flex-row items-center md:items-start justify-start md:justify-center mt-5 md:mt-10 h-[80%]">
                <div class="h-fit w-[80%] md:w-1/2 p-2 flex items-center justify-center">
                    <img :src="detailBook.IMAGEURL || 'https://play.google.com/books/publisher/content/images/frontcover/j5jzEAAAQBAJ?fife=w256-h256'"
                        alt="AVTBook">
                </div>
                <form @submit="addnewBorrow"
                    class="w-full lg:w-1/2 text-center p-5 flex flex-col gap-2 md:gap-3 flex-1">
                    <h2 class="text-4xl">{{ detailBook.TENSACH }}</h2>
                    <span>Tác giả : {{ detailBook.TACGIA.TENTACGIA }}</span>
                    <span>Yêu thích : {{ detailBook.FAV }}</span>
                    <span>Số lượng còn lại: {{ detailBook.SOQUYEN }}</span>
                    <a-form-item label="Thời gian mượn" name="ngaytra">
                        <a-select v-model:value="formState.ngaytra" placeholder="Chọn thời gian trả sách">
                            <a-select-option v-for="(item, index) in dataDate" :key="index" :value="item[index]">{{ item
                                }}</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-textarea v-model:value="formState.note" required placeholder="Ghi chú" auto-size />
                    <button
                        class="bg-black text-white w-[70%] mx-auto p-3 rounded-[10px] cursor-pointer hover:bg-gray-500 hover:text-black transition-all">Đăng
                        ký
                        mượn</button>
                </form>
            </div>
        </Motion>
    </div>

</template>
<script setup>
import NavbarUser from '../../components/client/navbarUser.vue';
import SidebarUser from '../../components/client/sidebarUser.vue';
import Homepage from '../../components/client/homepage.vue';
import Category from '../../components/client/category.vue';
import Search from '../../components/client/search.vue';
import SeeAll from '../../components/client/seeall.vue';
import DetailBook from '../../components/client/detailBook.vue';
import Borrowing from '../../components/client/borrowing.vue';
import Favorite from '../../components/client/favorite.vue';
import UserClientControllerApi from '../../controllerApi/userclient.controller';
import { toast } from 'vue3-toastify'
import { jwtDecode } from "jwt-decode";
import { Motion } from '@motionone/vue';
import { ref, onMounted, reactive, watch } from 'vue';
import { dataDate } from '../../data/data';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const user = ref({});
const loaded = ref(false);
const modelDetail = ref(false);
const sidebar = ref(false);
const load = ref(false);
const dataBook = ref([]);
const dataBorrow = ref([]);
const detailBook = ref(null);
const showDetailMobile = ref(false);
const page = ref('');
const isFav = ref(false);
const Favlist = ref([]);
const searchValue = ref('');

const formState = reactive({
    userid: undefined,
    bookid: undefined,
    ngaymuon: new Date(),
    ngaytra: undefined,
    status: 'pending',
    note: undefined
})

function handleSearchInput(searchData) {
    searchValue.value = searchData;
}

async function addnewBorrow(e) {
    e.preventDefault();
    formState.bookid = detailBook.value._id;
    const payload = { ...formState };
    const res = await UserClientControllerApi.addBorrow(payload);
    if (res.EC == 1) {
        toast.success('Yêu cầu mượn thành công ! Đang chờ duyệt', {
            autoClose: 1500
        })
        setTimeout(() => {
            window.location.reload();
        }, 1500)
    } else {
        toast.error(res.message, {
            autoClose: 1500
        })
    }
}

function handleDetail(item) {
    detailBook.value = item;
    showDetailMobile.value = true;
    isFav.value = false;
    Favlist.value?.forEach(fav => {
        if (item._id === fav) isFav.value = true;
    })
}

const openModelDetail = () => {
    if (modelDetail.value) {
        load.value = false;
        setTimeout(() => {
            modelDetail.value = false;
        }, 500);
    } else {
        load.value = true;
        modelDetail.value = true;
    }
}

async function CheckAuth(path) {
    if (path.includes('borrow')) {
        await UserClientControllerApi.AuthenticateBorrowPage();
    } else if (path.includes('favorite')) {
        await UserClientControllerApi.AuthenticateFavPage();
    }
}

watch(() => route.fullPath, async (newVal, oldVal) => {
    page.value = newVal;
    sidebar.value = false;
    showDetailMobile.value = false;
    CheckAuth(newVal);
    getData();
})

async function getData() {
    page.value = route.fullPath;
    const token = sessionStorage.getItem('accessToken');
    if (token) {
        const userInfo = jwtDecode(token);
        user.value = userInfo;
        formState.userid = (await UserClientControllerApi.getTTUser(userInfo.id)).data[0];
        Favlist.value = formState.userid.favorite;
        dataBorrow.value = (await UserClientControllerApi.getBorrowByIDUser(formState.userid._id)).data;
    }
    dataBook.value = (await UserClientControllerApi.getAllBook()).data;
    loaded.value = true;
}

onMounted(async () => {
    const path = route.fullPath;
    CheckAuth(path);
    getData();
})
</script>