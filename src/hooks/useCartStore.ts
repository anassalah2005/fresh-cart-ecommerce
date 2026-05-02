import { create } from 'zustand'
import { getCart, addToCart, removeFromCart, updateQuantity } from '@/services/cart'
import { toast } from 'sonner'

interface CartState {
  cartId: string | null
  cartItems: any[]
  numOfCartItems: number
  totalCartPrice: number
  isLoading: boolean
  fetchCart: (token: string) => Promise<void>
  addItem: (productId: string, token: string) => Promise<void>
  removeItem: (productId: string, token: string) => Promise<void>
  updateItemCount: (productId: string, count: number, token: string) => Promise<void>
  clearLocalCart: () => void
}

export const useCartStore = create<CartState>((set, get) => ({
  cartId: null,
  cartItems: [],
  numOfCartItems: 0,
  totalCartPrice: 0,
  isLoading: false,

  fetchCart: async (token) => {
    if (!token) return;
    set({ isLoading: true });
    const data = await getCart(token);
    if (data?.status === 'success') {
      set({
        cartId: data.data._id,
        cartItems: data.data.products,
        numOfCartItems: data.numOfCartItems,
        totalCartPrice: data.data.totalCartPrice,
      });
    }
    set({ isLoading: false });
  },

  addItem: async (productId, token) => {
    if (!token) {
      toast.error('Please login first');
      return;
    }
    set({ isLoading: true });
    const data = await addToCart(productId, token);
    if (data?.status === 'success') {
      toast.success(data.message);
      set({
        cartId: data.data._id,
        cartItems: data.data.products,
        numOfCartItems: data.numOfCartItems,
        totalCartPrice: data.data.totalCartPrice,
      });
    } else {
      toast.error(data?.message || 'Failed to add item');
    }
    set({ isLoading: false });
  },

  removeItem: async (productId, token) => {
    set({ isLoading: true });
    const data = await removeFromCart(productId, token);
    if (data?.status === 'success') {
      toast.success('Item removed');
      set({
        cartId: data.data._id,
        cartItems: data.data.products,
        numOfCartItems: data.numOfCartItems,
        totalCartPrice: data.data.totalCartPrice,
      });
    }
    set({ isLoading: false });
  },

  updateItemCount: async (productId, count, token) => {
    if (count < 1) return;
    set({ isLoading: true });
    const data = await updateQuantity(productId, count, token);
    if (data?.status === 'success') {
      set({
        cartId: data.data._id,
        cartItems: data.data.products,
        numOfCartItems: data.numOfCartItems,
        totalCartPrice: data.data.totalCartPrice,
      });
    }
    set({ isLoading: false });
  },

  clearLocalCart: () => {
    set({
      cartId: null,
      cartItems: [],
      numOfCartItems: 0,
      totalCartPrice: 0,
    });
  }
}))
