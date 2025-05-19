import { create } from "zustand";

// Store untuk sidebar state
export const useSidebarStore = create((set) => ({
  isOpen: true,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
  open: () => set({ isOpen: true }),
}));

// Store untuk customer management
export const useCustomerStore = create((set, get) => ({
  customers: [
    {
      id: 1,
      name: "Odis Rhinehart",
      level: "Warga",
      favoriteMenu: "Chicken & Ribs Combo",
      totalTransaction: 194700,
      orders: [
        { id: 1, productName: "Chicken & Ribs Combo", quantity: 2, price: 95000 },
        { id: 2, productName: "Fried Chicken Dinner", quantity: 1, price: 45000 },
      ],
    },
    {
      id: 2,
      name: "Kris Roher",
      level: "Warga",
      favoriteMenu: "Surf & Turf Gift Basket",
      totalTransaction: 631200,
      orders: [
        { id: 3, productName: "Surf & Turf Gift Basket", quantity: 1, price: 250000 },
        { id: 4, productName: "Special Combo", quantity: 3, price: 127000 },
      ],
    },
    {
      id: 3,
      name: "Serenity Fisher",
      level: "Juragan",
      favoriteMenu: "Fried Chicken Dinner",
      totalTransaction: 1040920,
      orders: [
        { id: 5, productName: "Fried Chicken Dinner", quantity: 5, price: 225000 },
        { id: 6, productName: "Premium Package", quantity: 2, price: 408000 },
      ],
    },
    {
      id: 4,
      name: "Brooklyn Warren",
      level: "Sultan",
      favoriteMenu: "Surf & Turf Gift Basket",
      totalTransaction: 730500,
      orders: [
        { id: 7, productName: "Surf & Turf Gift Basket", quantity: 2, price: 500000 },
        { id: 8, productName: "Chicken Special", quantity: 1, price: 89000 },
      ],
    },
    {
      id: 5,
      name: "Franco Delort",
      level: "Juragan",
      favoriteMenu: "Chicken & Ribs Combo",
      totalTransaction: 96000,
      orders: [{ id: 9, productName: "Chicken & Ribs Combo", quantity: 1, price: 95000 }],
    },
  ],

  // Actions
  addCustomer: (customer) =>
    set((state) => ({
      customers: [...state.customers, { ...customer, id: Date.now(), orders: [] }],
    })),

  getCustomerById: (id) => {
    const customers = get().customers;
    return customers.find((customer) => customer.id === parseInt(id));
  },

  updateCustomerOrder: (customerId, orderId, quantity) =>
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              orders: customer.orders.map((order) => (order.id === orderId ? { ...order, quantity } : order)),
            }
          : customer
      ),
    })),

  deleteCustomerOrder: (customerId, orderId) =>
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              orders: customer.orders.filter((order) => order.id !== orderId),
            }
          : customer
      ),
    })),
}));
