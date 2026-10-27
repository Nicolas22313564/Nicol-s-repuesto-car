"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "./productsData";
import { SITE_CONFIG } from "./config";
import { COLOMBIAN_DEPARTMENTS, ColombianCity } from "./colombiaLocations";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ActiveVehicle {
  makeId: string;
  makeName: string;
  modelId: string;
  modelName: string;
  year: number;
  engine: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => { success: boolean; message: string };
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotalCOP: number;
  shippingCOP: number;
  isFreeShipping: boolean;
  totalCOP: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  
  // Ubicación de envío seleccionada
  selectedDepartmentId: string;
  selectedCityId: string;
  setShippingLocation: (departmentId: string, cityId: string) => void;
  selectedCityData: ColombianCity | null;

  // Vehículo activo seleccionado para compatibilidad
  activeVehicle: ActiveVehicle | null;
  setActiveVehicle: (vehicle: ActiveVehicle | null) => void;
  clearActiveVehicle: () => void;

  // Favoritos (Wishlist)
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>("bogota");
  const [selectedCityId, setSelectedCityId] = useState<string>("bogota-dc");
  const [activeVehicle, setActiveVehicle] = useState<ActiveVehicle | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carga inicial desde localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("repuestos_col_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedVehicle = localStorage.getItem("repuestos_col_vehicle");
      if (savedVehicle) {
        setActiveVehicle(JSON.parse(savedVehicle));
      }
      const savedWishlist = localStorage.getItem("repuestos_col_wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (e) {
      console.warn("Error cargando estado local:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Persistencia en localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("repuestos_col_cart", JSON.stringify(cart));
    } catch (e) {
      console.warn("Error guardando carrito:", e);
    }
  }, [cart, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (activeVehicle) {
        localStorage.setItem("repuestos_col_vehicle", JSON.stringify(activeVehicle));
      } else {
        localStorage.removeItem("repuestos_col_vehicle");
      }
    } catch (e) {
      console.warn("Error guardando vehículo:", e);
    }
  }, [activeVehicle, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("repuestos_col_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.warn("Error guardando favoritos:", e);
    }
  }, [wishlist, isLoaded]);

  // Búsqueda de tarifa según ciudad colombiana seleccionada
  const department = COLOMBIAN_DEPARTMENTS.find((d) => d.id === selectedDepartmentId);
  const selectedCityData = department?.cities.find((c) => c.id === selectedCityId) || null;

  const setShippingLocation = (departmentId: string, cityId: string) => {
    setSelectedDepartmentId(departmentId);
    setSelectedCityId(cityId);
  };

  const clearActiveVehicle = () => {
    setActiveVehicle(null);
  };

  const addToCart = (product: Product, quantity = 1): { success: boolean; message: string } => {
    // Validar disponibilidad de inventario
    if (product.stock <= 0) {
      return {
        success: false,
        message: `El repuesto "${product.name}" se encuentra temporalmente agotado.`,
      };
    }

    let success = true;
    let message = `¡"${product.name}" agregado a tu carrito!`;

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        const newQty = existing.quantity + quantity;
        if (newQty > product.stock) {
          success = false;
          message = `No es posible agregar más unidades. Inventario máximo disponible: ${product.stock} unidades.`;
          return prev;
        }
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      } else {
        if (quantity > product.stock) {
          success = false;
          message = `Solo hay ${product.stock} unidades disponibles en inventario.`;
          return prev;
        }
        return [...prev, { product, quantity }];
      }
    });

    if (success) {
      setIsCartDrawerOpen(true);
    }
    return { success, message };
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const validQty = Math.min(quantity, item.product.stock);
          return { ...item, quantity: validQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotalCOP = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const isFreeShipping = subtotalCOP >= SITE_CONFIG.shipping.freeShippingThreshold && subtotalCOP > 0;
  const baseShippingCost = selectedCityData ? selectedCityData.shippingCost : SITE_CONFIG.shipping.standardBogota;
  const shippingCOP = totalItems === 0 ? 0 : isFreeShipping ? 0 : baseShippingCost;
  const totalCOP = subtotalCOP + shippingCOP;

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotalCOP,
        shippingCOP,
        isFreeShipping,
        totalCOP,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        selectedDepartmentId,
        selectedCityId,
        setShippingLocation,
        selectedCityData,
        activeVehicle,
        setActiveVehicle,
        clearActiveVehicle,
        wishlist,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
}
