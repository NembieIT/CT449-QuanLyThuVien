<template lang="">
    <div class="h-[100vh] w-[100vw] flex items-center justify-center">
        <a-spin v-if="!isLoaded" :indicator="indicator" />
        <div v-if="isLoaded"
            class="relative w-[95%] md:w-[75%] lg:w-1/2 h-fit border-3 p-5 flex items-center justify-center shadow-2xl bg-gray-200/95 rounded-2xl">
            <div class="md:w-[15%] md:h-[15%] md:block hidden object-fit absolute md:top-10 md:right-10 blur-[2px]">
                <img src="../../../public/Red_and_Blue_Modern_School_Logo-removebg-preview.png" alt="Logo">
            </div>
            <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
                autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed"
                class="w-full flex flex-col gap-4 justify-center items-center">
                <a-spin v-if="loading" class="absolute" :indicator="indicator" />
                <h1 class="text-4xl font-bold font-text1">
                    {{ BookEdit ? 'CHỈNH SỬA SÁCH' : 'THÊM SÁCH MỚI' }}
                </h1>
                <h2 class="text-[15px] font-bold font-text1">Quay lại trang admin : <router-link
                        to="/admin/all">Back</router-link>
                </h2>
                <div class="w-full">
                    <div class="flex items-center justify-center gap-5">
                        <a-form-item label="Tên sách" name="tensach" class="w-[40%]"
                            :rules="!BookEdit?[{ required: true, message: 'Hãy điền tên sách!' }]:[]">
                            <a-input v-model:value="formState.tensach" :placeholder="BookEdit?.TENSACH" />
                        </a-form-item>
                        <a-form-item label="Giá" name="dongia"
                            :rules="!BookEdit?[{ required: true, message: 'Hãy điền giá sách!' }]:[]" class="w-[40%]">
                            <a-input v-model:value="formState.dongia" :placeholder="BookEdit?.DONGIA" type="Number" />
                        </a-form-item>
                    </div>

                    <div class="flex items-center justify-center gap-5">
                        <a-form-item label="Số quyển" name="soquyen"
                            :rules="!BookEdit?[{ required: true, message: 'Hãy điền số quyển sách!' }]:[]"
                            class="w-[40%]">
                            <a-input v-model:value="formState.soquyen" :placeholder="BookEdit?.SOQUYEN" type="Number" />
                        </a-form-item>
                        <a-form-item label="Năm xuất bản" name="namxuatban"
                            :rules="!BookEdit?[{ required: true, message: 'Hãy điền năm xuất bản!' }]:[]"
                            class="w-[40%]">
                            <a-input v-model:value="formState.namxuatban" :placeholder="BookEdit?.NAMXUATBAN"
                                type="Number" />
                        </a-form-item>
                    </div>

                    <div class="flex items-center justify-center gap-5">
                        <a-form-item label="Nhà xuất bản" name="manxb"
                            :rules="!BookEdit?[{ required: true, message: 'Hãy chọn nhà xuất bản!' }]:[]"
                            class="w-[40%]">
                            <a-select @select="handleOtherNXB" v-model:value="formState.manxb">
                                <a-select-option value="other">Nhà xuất bản khác</a-select-option>
                                <a-select-option v-for="(item,index) in dataNXB" :key="index"
                                    :value="item._id">{{item.TENNXB}}</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="Tác giả" name="tacgia"
                            :rules="!BookEdit?[{ required: true, message: 'Hãy chọn tác giả!' }]:[]"
                            class="w-[40%]">
                            <a-select @select="handleOtherAuthor" v-model:value="formState.tacgia">
                                <a-select-option value="other">Tác giả khác</a-select-option>
                                <a-select-option v-for="(item,index) in dataAuthor" :key="index"
                                    :value="item._id">{{item.TENTACGIA}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>

                    <div class="flex items-center justify-center gap-5">
                        <a-form-item v-if="otherNXB" label="Mã NXB" name="manxbnew"
                            :rules="!BookEdit?[{ required: true, message: 'Hãy điền mã nxb!' }]:[]" class="w-[40%]">
                            <a-input v-model:value="formState.manxbnew" />
                        </a-form-item>
                        <a-form-item v-if="otherNXB" label="Tên NXB" name="tennxbnew"
                            :rules="!BookEdit?[{ required: true, message: 'Hãy điền tên nxb!' }]:[]" class="w-[40%]">
                            <a-input v-model:value="formState.tennxbnew" />
                        </a-form-item>
                    </div>
                    <div class="flex items-center justify-center gap-5">
                        <a-form-item v-if="otherAuthor" label="Mã tác giả" name="matacgianew"
                            :rules="!BookEdit?[{ required: true, message: 'Hãy điền mã tác giả!' }]:[]" class="w-[40%]">
                            <a-input v-model:value="formState.matacgianew" />
                        </a-form-item>
                        <a-form-item v-if="otherAuthor" label="Tên tác giả" name="tentacgianew"
                            :rules="!BookEdit?[{ required: true, message: 'Hãy điền tên tác giả!' }]:[]" class="w-[40%]">
                            <a-input v-model:value="formState.tentacgianew" />
                        </a-form-item>
                    </div>

                    <div class="flex items-center justify-center gap-5">
                        <a-form-item v-if="otherNXB" label="Địa chỉ" name="diachinxbnew"
                            :rules="!BookEdit?[{ required: true, message: 'Hãy điền địa chỉ nxb!' }]:[]"
                            class="w-[40%]">
                            <a-input v-model:value="formState.diachinxbnew" />
                        </a-form-item>
                        <a-form-item v-if="otherNXB" label="Địa chỉ" class="w-[40%] invisible">
                            <a-input />
                        </a-form-item>
                    </div>

                    <div class="flex items-center justify-center w-[80%] p-5 bg-white/50 rounded-[5px] mx-auto">
                        <div>
                            <a-upload v-model:file-list="fileList" name="avatar" list-type="picture-card"
                                class="avatar-uploader w-[40%]" :show-upload-list="false" action=""
                                :custom-request="customRequest" :before-upload="beforeUpload">
                                <img v-if="formState.imageUrl" :src="formState.imageUrl" alt="avatar" />
                                <div v-else>
                                    <loading-outlined v-if="loadingIMG"></loading-outlined>
                                    <plus-outlined v-else></plus-outlined>
                                    <div class="ant-upload-text">Upload</div>
                                </div>
                            </a-upload>
                        </div>
                    </div>

                    <div class="flex flex-col items-start justify-center w-[80%] p-5 mx-auto">
                        <span>Mô tả sách</span>
                        <a-textarea v-model:value="formState.desc" placeholder="Mô tả sách" auto-size />
                    </div>

                    <a-form-item class="flex items-center justify-center">
                        <a-button type="primary" html-type="submit">Submit</a-button>
                    </a-form-item>
                </div>
            </a-form>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref, defineProps, onBeforeMount, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import NXBControllerApi from "../../controllerApi/nxb.admincontroller.js"
import BookControllerApi from "../../controllerApi/books.admincontroller.js"
import AuthorControllerApi from '../../controllerApi/author.admincontroller.js';

import { LoadingOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';
const indicator = h(LoadingOutlined, {
    style: {
        fontSize: '24px',
    },
    spin: true,
});

var dataNXB = ref([]);
var dataAuthor = ref([]);
const otherNXB = ref(false);
const otherAuthor = ref(false);
const route = useRoute();
const id = ref('');
const BookEdit = ref(null);
const loading = ref(false);
const isLoaded = ref(false);
const fileList = ref([]);
const loadingIMG = ref(false);

const formState = reactive({
    tensach: '',
    dongia: '',
    soquyen: '',
    namxuatban: '',
    manxb: '',
    tacgia: '',
    manxbnew: '',
    tennxbnew: '',
    matacgianew: '',
    tentacgianew: '',
    diachinxbnew: '',
    imageUrl: '',
    desc: ''
});

//IMGBB upload
async function uploadToImgbb(file) {
    const apiKey = "2982cefeb01c53e95a3f3ae2348ea33a";
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
    });

    const data = await res.json();
    if (data.success) {
        return data.data.url;
    } else {
        throw new Error("Upload failed");
    }
}

// IMG Upload
const customRequest = async (options) => {
    const { file, onSuccess, onError } = options;
    loadingIMG.value = true;
    try {
        const url = await uploadToImgbb(file);
        formState.imageUrl = url;
        loadingIMG.value = false;
        onSuccess("ok");
    } catch (err) {
        loadingIMG.value = false;
        toast.error("Lỗi khi tải ảnh lên!", { autoClose: 1200 });
        onError(err);
    }
};
const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        toast.error('Bạn chỉ có thể up ảnh định dạng JPEG!', { autoClose: 1200 });
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        toast.error('Ảnh phải ít hơn 2MB !', { autoClose: 1200 });
    }
    return isJpgOrPng && isLt2M;
};

const handleOtherNXB = (e) => {
    if (e.includes('other')) {
        otherNXB.value = true;
    } else {
        otherNXB.value = false;
    }
}
const handleOtherAuthor = (e) => {
    if (e.includes('other')) {
        otherAuthor.value = true;
    } else {
        otherAuthor.value = false;
    }
}

async function onFinish(values) {
    values = formState;
    loading.value = true;
    if (BookEdit.value) {
        const dataUpdate = {};
        for (const key in values) {
            if (values[key] !== '' && values[key] !== null && values[key] !== undefined) {
                dataUpdate[key] = values[key];
            }
        }
        if (Object.keys(dataUpdate).length > 0) {
            try {
                const res = await BookControllerApi.updateBook(id.value, dataUpdate);
                if (res.EC == 1) {
                    loading.value = false
                    toast.success("Thành công !", {
                        autoClose: 1600
                    })
                    setTimeout(() => {
                        window.location.reload();
                    }, 1600);
                } else {
                    loading.value = false
                    toast.error(res.message, {
                        autoClose: 1600,
                        theme: "dark"
                    })
                }
            } catch (err) {
                loading.value = false
                toast.error("Loi server", {
                    autoClose: 1600,
                    theme: "dark"
                })
                console.log(err);
            }
        } else {
            loading.value = false;
            toast.error("Vui lòng điền thông tin cần sửa !", {
                autoClose: 1600
            })
        }
    } else {
        try {
            console.log(otherAuthor.value, otherNXB.value)
            var next = ref(false);
            const { manxbnew, tennxbnew, diachinxbnew, matacgianew, tentacgianew, ...payload } = values;
            if (otherNXB.value) {
                const res = await NXBControllerApi.addNXB({ manxbnew, tennxbnew, diachinxbnew });
                if (res.EC === 1) {
                    next.value = true;
                    payload.manxb = res.data._id;
                } else {
                    toast.error(res.message, {
                        autoClose: 1600
                    })
                }
            }
            if (otherAuthor.value) {
                const res = await AuthorControllerApi.addAuthor({ matacgianew, tentacgianew });
                if (res.EC === 1) {
                    next.value = true;
                    payload.tacgia = res.data._id;
                } else {
                    toast.error(res.message, {
                        autoClose: 1600
                    })
                }
            }
            next.value = true;
            if (next.value) {
                const res = await BookControllerApi.addBook(payload);
                if (res.EC === 1) {
                    loading.value = false;
                    toast.success("Thêm thành công !", {
                        autoClose: 1600
                    })
                    setTimeout(() => {
                        window.location.reload();
                    }, 1600);
                } else {
                    loading.value = false
                    toast.error(res.message, {
                        autoClose: 1600,
                        theme: "dark"
                    })
                }
            }
        } catch (err) {
            loading.value = false;
            toast.error("Loi server", {
                autoClose: 1600,
                theme: "dark"
            })
            console.log(err);
        }
    }
};
const onFinishFailed = errorInfo => {
    loading.value = false;
    toast.error("Tạo không thành công !", {
        autoClose: 1600,
        theme: "dark"
    })
    console.log("Error : ", errorInfo);
};

onMounted(async () => {
    id.value = route.params.id;
    dataNXB = (await NXBControllerApi.getNXB());
    dataAuthor = (await AuthorControllerApi.getAuthor());
    if (id.value) BookEdit.value = (await BookControllerApi.getID(id.value))?.book;
    isLoaded.value = true;
})
</script>