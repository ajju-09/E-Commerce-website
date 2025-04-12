import { calcDeliveryDateAndPrice } from "@/lib/actions/order.actions";
import { Cart, OrderItem } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState: Cart = {
    items: [],
    itemsPrice: 0,
    taxPrice: undefined,
    shippingPrice: undefined,
    totalPrice: 0,
    paymentMethod: undefined,
    deliveryDateIndex: undefined
}

interface CartState {
    cart: Cart
    addItem: (item: OrderItem, quantity: number) => Promise<string>
    updateItem: (item: OrderItem, quantity: number) => Promise<void>
    removeItem: (item: OrderItem) => void
}

const UseCartStore = create(
    persist<CartState>(
        (set, get) => ({
            cart: initialState,

            addItem: async(item: OrderItem, quantity: number) => {
                const { items } = get().cart;
                const existItem = items.find(
                    (x) => 
                    x.product === item.product &&
                    x.size === item.size &&
                    x.color === item.color
                )

                if (existItem) {
                    if (existItem.countInStock < quantity + existItem.quantity) {
                        throw new Error('Not enough items in stock');
                    } else {
                        if(item.countInStock < item.quantity){
                            throw new Error('Not enough items in stock');
                        }
                    }
                }

                const updatedCartItems = existItem ? items.map((x) => 
                    x.product === item.product &&
                    x.color === item.color &&
                    x.size === item.size ? { ...existItem, quantity: existItem.quantity + quantity } : x
                    ) : [...items, { ...item, quantity}]

                    set({
                        cart: {
                            ...get().cart,
                            items: updatedCartItems,
                            ...(await calcDeliveryDateAndPrice({
                                items: updatedCartItems,
                            }))
                        },
                    })
                    const match =  updatedCartItems.find(
                        (x) => 
                            x.product === item.product &&
                            x.color === item.color &&
                            x.size === item.size
                    );
    
                    if(!match) {
                        throw new Error('Matching cart item not found');
                    }

              
                return match.clientId;
            },

            updateItem: async (item: OrderItem, quantity: number) => {
                const { items } = get().cart
                const exist = items.find(
                    (x) => 
                        x.product === item.product &&
                        x.color === item.color &&
                        x.size === item.size
                )

                if (!exist) return

                const updateCartItems = items.map( (x) => 
                    x.product === item.product &&
                    x.color === item.color &&
                    x.size === item.size 
                    ? { ...exist, quantity: quantity} : x
                )

                set({
                    cart: {
                        ...get().cart,
                        items: updateCartItems,
                        ...(await calcDeliveryDateAndPrice({
                            items: updateCartItems,
                        }))
                    },
                })
            },

            removeItem: async (item: OrderItem) => {
                const {items} = get().cart
                const updateCartItems = items.filter(
                    (x) => 
                        x.product !== item.product ||
                        x.color !== item.color ||
                        x.size !== item.size
                )
                set({
                    cart: {
                        ...get().cart,
                        items: updateCartItems,
                        ...(await calcDeliveryDateAndPrice({
                            items: updateCartItems,
                        })),
                    },
                })
            },

            init: () => set({ cart: initialState }),
        }),
        {
            name: "cart-Store",
        }
    )
)

export default UseCartStore;