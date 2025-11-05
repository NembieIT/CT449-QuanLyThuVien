<template lang="">
    <div class="h-[100vh] w-[100vw] flex items-center justify-center">
        <a-spin v-if="!isLoaded" :indicator="indicator" />
        <div v-if="isLoaded" class="w-[95%] md:w-[75%] lg:w-1/2 h-fit md:h-[70%] border p-5 flex items-center justify-center shadow-2xl bg-gray-400/40 rounded-2xl">
            <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
                autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed"
                class="w-full flex flex-col gap-4 justify-center items-center">
                <h1 class="text-2xl font-bold font-text1">
                    {{ BorrowEdit ? 'CHỈNH SỬA SÁCH' : 'THÊM SÁCH MỚI' }}
                </h1>
                <h2 class="text-[15px] font-bold font-text1">Quay lại trang admin : <router-link
                        to="/admin/all">Back</router-link>
                </h2>
                <div class="w-[80%]">
                    <a-form-item label="ID người mượn" name="userid"
                        :rules="[{ required: true, message: 'Hãy điền ID người mượn!' }]">
                        <a-input v-model:value="formState.userid" />
                    </a-form-item>

                    <a-form-item label="Tên sách" name="bookid"
                        :rules="[{ required: true, message: 'Hãy chọn ID sách!' }]">
                        <a-select @select="handleOther" v-model:value="formState.bookid"
                            placeholder="please select your bookID">
                            <a-select-option value="other">Tuỳ chọn khác</a-select-option>
                            <a-select-option v-for="(item,index) in dataBook" :key="index"
                                :value="item._id">{{item.TENSACH}}</a-select-option>
                        </a-select>
                    </a-form-item>

                    <a-form-item v-if="otherBook" label="ID Sách khác" name="bookid">
                        <a-input v-model:value="formState.bookid" />
                    </a-form-item>

                    <a-form-item label="Ngày mượn sách" required name="ngaymuon"
                        :rules="[{ required: true, message: 'Vui lòng chọn ngày mượn sách!' },{ validator: validateBirthday }]">
                        <a-date-picker v-model:value="formState.ngaymuon" show-time type="date"
                            placeholder="Vui lòng chọn ngày mượn" style="width: 100%" />
                    </a-form-item>

                    <a-form-item label="Ngày trả sách" required name="ngaytra"
                        :rules="[{ required: true, message: 'Vui lòng chọn thời gian trả sách!' }]">
                        <a-select v-model:value="formState.ngaytra" placeholder="Chọn thời gian trả sách">
                            <a-select-option v-for="(item,index) in dataDate" :key="index"
                                :value="item">{{item}}</a-select-option>
                        </a-select>
                    </a-form-item>

                    <a-form-item label="Trạng thái đơn" required name="status"
                        :rules="[{ required: true, message: 'Vui lòng chọn trạng thái đơn!' }]">
                        <a-select v-model:value="formState.status" placeholder="Chọn trạng thái đơn">
                            <a-select-option v-for="(item,index) in dataStatus" :key="index"
                                :value="index">{{item}}</a-select-option>
                        </a-select>
                    </a-form-item>

                    <a-form-item class="flex items-center justify-center">
                        <a-button type="primary" html-type="submit">Submit</a-button>
                    </a-form-item>
                </div>
            </a-form>
        </div>
    </div>
</template>
<script setup>
import BorrowControllerApi from '../../controllerApi/borrow.admincontroller';
import BookControllerApi from '../../controllerApi/books.admincontroller';
import { onMounted, reactive, ref } from 'vue';
import { toast } from 'vue3-toastify'
import { useRoute } from 'vue-router'
import { dataDate, dataStatus } from '../../data/data'
import { LoadingOutlined } from '@ant-design/icons-vue'
import dayjs from 'dayjs'
import { h } from 'vue';
const indicator = h(LoadingOutlined, {
    style: {
        fontSize: '24px',
    },
    spin: true,
});

const route = useRoute();
const id = ref('');
const BorrowEdit = ref(null);
const isLoaded = ref(false);
var dataBook = ref([]);

const formState = reactive({
    userid: '',
    bookid: '',
    ngaymuon: '',
    ngaytra: '',
    status: ''
});

const validateBirthday = async (_rule, value) => {
    if (dayjs(value).isAfter(dayjs(), 'month')) {
        return Promise.reject('Tháng mượn không được lớn hơn tháng hiện tại!')
    }
    return Promise.resolve()
}

const handleOther = (e) => {
    if (e.includes('other')) {
        otherBook.value = true;
    } else {
        otherBook.value = false;
    }
}

const onFinish = async values => {
    console.log(values);
    const res = await BorrowControllerApi.addBorrow(values);
    console.log(res);
    if (res.EC == 1) {
        toast.success("Tạo đơn thành công !", {
            autoClose: 1600,
            theme: "dark"
        })
        setTimeout(() => {
            window.location.reload();
        }, 1600);
    } else {
        toast.error(res.message, {
            autoClose: 1600,
            theme: "dark"
        })
    }
};
const onFinishFailed = errorInfo => {
    toast.error("Tạo đơn không thành công !", {
        autoClose: 1600,
        theme: "dark"
    })
    console.log("Error : ", errorInfo);
};

onMounted(async () => {
    id.value = route.params.id;
    BorrowEdit.value = (await BorrowControllerApi.getID(id.value));
    console.log(BorrowEdit.value);
    isLoaded.value = true;
})
</script>