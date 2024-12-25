<script setup>
import {ref} from 'vue'
import axiosClient from '@/services/axiosClient'

const formData = ref({name: ''})
const addresses = ref(null)

async function fetchAddresses() {
  try {
    const response = await axiosClient.post('/newspapers/addresses/', formData.value)
    addresses.value = response.data.addresses
  } catch (error) {
    console.error('Ошибка загрузки адресов:', error)
  }
}
</script>

<template>
  <v-card>
    <v-card-title>Адреса печати газеты</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="fetchAddresses">
        <v-text-field v-model="formData.name" label="Название газеты" required/>
        <v-btn color="primary" type="submit">Получить</v-btn>
      </v-form>
      <div v-if="addresses">
        <ul>
          <li v-for="address in addresses" :key="address">{{ address }}</li>
        </ul>
      </div>
    </v-card-text>
  </v-card>
</template>
