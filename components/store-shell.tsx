'use client'

import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import type { FinishId } from '@/lib/product'
import { SiteHeader } from '@/components/site-header'
import { HeroPanel } from '@/components/hero-panel'
import { ProductPanel } from '@/components/product-panel'
import { CheckoutPanel } from '@/components/checkout-panel'

export type View = 'home' | 'product' | 'checkout'

export function StoreShell() {
  const [view, setView] = useState<View>('home')
  const [finish, setFinish] = useState<FinishId>('lunar')
  const [quantity, setQuantity] = useState(1)
  const [checkoutActive, setCheckoutActive] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)

  function handleBuyNow() {
    setView('checkout')
    setCheckoutActive(true)
    requestAnimationFrame(() => emailRef.current?.focus())
  }

  const panelClass = (panel: View) =>
    cn('min-h-0 lg:flex', view === panel ? 'flex' : 'hidden')

  return (
    <div className="mx-auto flex h-full max-w-[1440px] flex-col px-4 lg:px-6">
      <SiteHeader view={view} onNavigate={setView} quantity={checkoutActive ? quantity : 0} />

      <main className="grid min-h-0 flex-1 grid-cols-1 gap-4 pb-4 lg:grid-cols-[1.15fr_1fr_0.95fr] lg:pb-6">
        <section aria-labelledby="hero-title" className={panelClass('home')}>
          <HeroPanel onShop={() => setView('product')} onBuy={handleBuyNow} />
        </section>

        <section aria-labelledby="product-title" className={panelClass('product')}>
          <ProductPanel
            finish={finish}
            onFinishChange={setFinish}
            quantity={quantity}
            onQuantityChange={setQuantity}
            onBuyNow={handleBuyNow}
          />
        </section>

        <section aria-labelledby="checkout-title" className={panelClass('checkout')}>
          <CheckoutPanel
            ref={emailRef}
            finish={finish}
            quantity={quantity}
            highlighted={checkoutActive}
          />
        </section>
      </main>
    </div>
  )
}
