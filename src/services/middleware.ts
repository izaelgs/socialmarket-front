// Importe a instância do Axios
import { useAxiosStore } from '@/services/axiosStore' // Substitua pelo caminho real do seu arquivo

export default {
  async auth(to: any, from: any, next: (arg0?: string) => void) {
    try {
      // Utilize a instância do Axios
      const axiosStore = useAxiosStore()
      const response: any = await axiosStore.post(
        'auth/me',
        {},
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      )

      if (!response.name) {
        next('/login')
      }

      localStorage.setItem('user', JSON.stringify(response))
      next()
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error)
      next('/login')
    }
  }
}
