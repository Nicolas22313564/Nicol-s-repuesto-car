"use client";

import React, { useState } from "react";
import { CartProvider } from "@/lib/cartContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { VehicleSelectorModal } from "@/components/VehicleSelectorModal";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 selection:bg-brand-orange selection:text-white">
        <div>
          <Header onOpenVehicleSelector={() => setIsVehicleModalOpen(true)} />
          <main>{children}</main>
        </div>

        <Footer />

        {/* Componentes Globales Interactivas */}
        <CartDrawer />
        <WhatsAppFloatingButton />
        <VehicleSelectorModal
          isOpen={isVehicleModalOpen}
          onClose={() => setIsVehicleModalOpen(false)}
        />
      </div>
    </CartProvider>
  );
}
