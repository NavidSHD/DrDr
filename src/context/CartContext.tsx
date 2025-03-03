import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
    useMemo,
} from "react";
import toast from "react-hot-toast";

interface Drug {
    id: number;
    name: string;
    price: number;
    image?: string;
}

interface CartItem extends Drug {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (drug: Drug) => void;
    updateQuantity: (drugId: number, quantity: number) => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (drug: Drug) => {
        setCart((prev) => {
            const existing = prev.find((item) => item?.id === drug?.id);
            if (existing) {
                toast.dismiss();
                toast.success(`تعداد ${drug?.name} افزایش یافت`);
                return prev?.map((item) =>
                    item?.id === drug?.id
                        ? { ...item, quantity: item?.quantity + 1 }
                        : item
                );
            } else {
                toast.dismiss();
                toast.success(`${drug?.name} به سبد خرید اضافه شد`);
                return [...prev, { ...drug, quantity: 1 }];
            }
        });
    };

    const updateQuantity = (drugId: number, quantity: number) => {
        setCart((prev) => {
            const item = prev.find((i) => i.id === drugId);
            if (!item) return prev;

            if (quantity <= 0) {
                toast.dismiss();
                toast.error(`${item?.name} از سبد خرید حذف شد`);
                return prev.filter((i) => i.id !== drugId);
            }

            toast.dismiss();
            toast.success(`تعداد ${item?.name} به ${quantity} تغییر یافت`);
            return prev.map((i) => (i.id === drugId ? { ...i, quantity } : i));
        });
    };

    const totalItems = useMemo(
        () => cart.reduce((acc, item) => acc + item.quantity, 0),
        [cart]
    );
    const totalPrice = useMemo(
        () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
        [cart]
    );

    return (
        <CartContext.Provider
            value={{ cart, addToCart, updateQuantity, totalItems, totalPrice }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
