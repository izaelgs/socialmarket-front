<template>
    <AuthLayout>
        <form @submit.prevent="submit">
            <label for="name">Name</label>
            <input type="text" v-model="name" class="w-100 mb-3 form-control">

            <label for="name">E-mail</label>
            <input type="text" v-model="email" class="w-100 mb-3 form-control">

            <label for="name">Password</label>
            <input type="text" v-model="password" class="w-100 mb-3 form-control">

            <label for="name">BirthAt</label>
            <input type="text" v-model="birthAt" class="w-100 mb-3 form-control">

            <button>Registrar</button>
        </form>
    </AuthLayout>
</template>

<script setup>

import { ref } from 'vue';
import { useAxiosStore } from '@/services/axios';
import { useRouter } from 'vue-router';

import AuthLayout from '@/layouts/AuthLayout.vue';

const axiosStore = useAxiosStore();
const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const birthAt = ref("");

const submit = async () => {
    try {
        const result = await axiosStore.post('/auth/register', {
            name        : name.value,
            email       : email.value,
            password    : password.value,
            birthAt     : new Date(),
        });

        axiosStore.setToken(result.access_token)

        router.push('complete-profile');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

</script>