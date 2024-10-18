import { useAxiosStore } from '@/services/axiosStore';
import type { Product } from '@/stores/ProductsStore';
import { defineStore } from 'pinia'
import { ref } from 'vue';

type Order = {
  id: number;
  totalAmount: number;
  status: string;
}

type CheckoutIdResponse = {
  checkoutUrl: string;
}

export const useOrder = defineStore('order', () => {
  const axios = useAxiosStore();

  const isLoading = ref(false);

  const createOrder = async (products: Product[]) => {
    try {
      isLoading.value = true;

      const productIds = products.map(product => product.id);
      const totalAmount = products.reduce((acc, product) => acc + Number(product.price), 0);
      const status = 'pending';

      const response = await axios.post<Order>('orders', {
        productIds, totalAmount, status
      })

      const checkoutId = await getCheckoutIdByOrderId(response.id);

      isLoading.value = false;

      return checkoutId;
    } catch (error) {
      console.error(error);
      isLoading.value = false;
    }
  }

  const getCheckoutIdByOrderId = async (orderId: number) => {

    const { checkoutUrl } = await axios.get<CheckoutIdResponse>(`orders/${orderId}/checkout`);

    return checkoutUrl;
  }

  return {
    createOrder,
    isLoading,
  }
})
