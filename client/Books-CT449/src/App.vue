<script setup>

</script>

<template>
    <div>
        <nav class="bg-gray-500/50 p-5 h-[10vh] w-full">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </nav>
        <router-view />
    </div>
</template>

<style scoped></style>
