<template>
  <div class="w-full">
    <h1>Products in Cart</h1>
    <template v-if="!order.isLoading">

      <div v-if="cart.products.length === 0" class="flex justify-center items-center h-96">
        <p>No products in cart</p>
      </div>
      <div v-else>
        <div v-for="product in cart.products" :key="product.id">
          <ProductCard :product="product" />
        </div>
      </div>
      
      <div class="flex justify-end" v-if="cart.products.length > 0">
        <Button text="Confirm Order" classes="w-40" @click="handleSubmit()" />
      </div>
    </template>
    <template v-else>
      <div class="flex justify-center items-center h-96">
        <SpinnerComponent />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '@/composables/useCart';
import { defineComponent } from 'vue';
import ProductCard from './ProductCard.vue';
import Button from '@/components/Button.vue';
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import { useOrder } from '@/composables/useOrder';

const cart = useCart();
const order = useOrder()

const handleSubmit = async () => {
  const checkoutUrl = await order.createOrder(cart.products)

  if (checkoutUrl) {
    window.location.href = checkoutUrl;
  }
}

defineComponent({
  name: 'CartComponent'
});
</script>

<style scoped>
/* ... existing styles ... */
</style>
