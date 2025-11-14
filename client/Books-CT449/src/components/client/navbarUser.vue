<template lang="">
    <div class="w-full h-full flex items-center bg-white">
        <div class="w-[80%] h-full flex items-center justify-start p-5">
            <div class="bg-gray-500/40 p-2 w-[50%] rounded-[10px] flex items-center gap-5">
                <SearchOutlined class="cursor-pointer p-2 rounded-[10px] hover:bg-white/50" />
                <input class="outline-none" type="text" placeholder="Tìm tên sách theo ý">
            </div>
        </div>
        <div class="w-[20%] h-full flex items-center justify-end gap-5 p-5">
            <BellOutlined class="cursor-pointer scale-150" />
            <div class="flex items-center gap-5">
                <img src="../../../public/vite.svg" alt="Avt">
                <a-dropdown>
                    <div class="ant-dropdown-link flex items-center gap-3" @click.prevent>
                        <span>USER</span>
                        <DownOutlined />
                    </div>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item>
                                <a href="javascript:;">Thông tin cá nhân</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a href="javascript:;">Đăng xuất</a>
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </div>
        </div>
    </div>
</template>
<script>

</script>