import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, Product } from '../types';

// Define the state structure
interface CartState {
  items: CartItem[];
  isCartModalOpen: boolean;
  isConfirmationModalOpen: boolean;
  confirmedOrder: CartItem[] | null; // This holds our snapshot
  actions: {
    addItem: (product: Product, quantity: number) => void;
    removeItem: (slug: string) => void;
    updateQuantity: (slug: string, newQuantity: number) => void;
    clearCart: () => void;
    toggleCartModal: () => void;
    toggleConfirmationModal: () => void;
    snapshotCart: () => void;
    clearConfirmedOrder: () => void; // <-- 1. ADD THIS NEW ACTION
    getCartTotal: () => number;
    getTotalItems: () => number;
  };
}

// Helper to get the correct image path from db.json
const getImagePath = (path: string) => path.replace('./assets', '/assets');

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartModalOpen: false,
      isConfirmationModalOpen: false,
      confirmedOrder: null, 
      actions: {
        // ... (addItem, removeItem, updateQuantity, clearCart remain the same) ...
        addItem: (product, quantity) => {
          const { items } = get();
          const existingItem = items.find((item) => item.slug === product.slug);

          const newItem: CartItem = {
            slug: product.slug,
            name: product.name
              .replace(' Headphones', '')
              .replace(' Speaker', '')
              .replace(' Earphones', '')
              .replace('Mark II', 'MK II')
              .replace('Mark I', 'MK I'),
            price: product.price,
            image: getImagePath(product.image.mobile),
            quantity: quantity,
          };

          if (existingItem) {
            set((state) => ({
              items: state.items.map((item) =>
                item.slug === product.slug
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }));
          } else {
            set((state) => ({
              items: [...state.items, newItem],
            }));
          }
        },
        removeItem: (slug) => {
          set((state) => ({
            items: state.items.filter((item) => item.slug !== slug),
          }));
        },
        updateQuantity: (slug, newQuantity) => {
          if (newQuantity < 1) {
            get().actions.removeItem(slug);
          } else {
            set((state) => ({
              items: state.items.map((item) =>
                item.slug === slug ? { ...item, quantity: newQuantity } : item
              ),
            }));
          }
        },
        clearCart: () => {
          set({ items: [] });
        },
        toggleCartModal: () => {
          set((state) => ({ isCartModalOpen: !state.isCartModalOpen }));
        },
        toggleConfirmationModal: () => {
          set((state) => ({ 
            isConfirmationModalOpen: !state.isConfirmationModalOpen,
            isCartModalOpen: false 
          }));
        },
        snapshotCart: () => {
          const { items } = get();
          set({ confirmedOrder: items });
        },
        // --- 2. DEFINE THE NEW ACTION ---
        clearConfirmedOrder: () => {
          set({ items: [], confirmedOrder: null });
        },
        // ---------------------------------
        getCartTotal: () => {
          const { items } = get();
          return items.reduce((total, item) => total + item.price * item.quantity, 0);
        },
        getTotalItems: () => {
          const { items } = get();
          return items.reduce((total, item) => total + item.quantity, 0);
        }
      },
    }),
    {
      name: 'audiophile-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }), 
    }
  )
);