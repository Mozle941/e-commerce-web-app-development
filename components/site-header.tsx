import { ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { View } from '@/components/store-shell'

const navItems: { id: View; label: string }[] = [
  { id: 'home', label: 'Overview' },
  { id: 'product', label: 'Product' },
  { id: 'checkout', label: 'Checkout' },
]

export function SiteHeader({
  view,
  onNavigate,
  quantity,
}: {
  view: View
  onNavigate: (view: View) => void
  quantity: number
}) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 lg:h-16">
      <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
        <span
          aria-hidden="true"
          className="size-5 rounded-full bg-gradient-to-br from-white to-slate-500 shadow-[inset_-3px_-2px_0_rgba(0,0,0,0.35)]"
        />
        lune
      </a>

      <nav aria-label="Sections" className="lg:hidden">
        <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-xs backdrop-blur">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={view === item.id ? 'page' : undefined}
                className={cn(
                  'rounded-full px-3 py-1.5 transition-colors',
                  view === item.id
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="hidden items-center gap-8 text-sm text-muted-foreground lg:flex">
        <span>Engineering</span>
        <span>Sound Lab</span>
        <span>Support</span>
      </div>

      <button
        type="button"
        onClick={() => onNavigate('checkout')}
        className="relative flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur transition-colors hover:bg-white/10"
      >
        <ShoppingBag className="size-4" aria-hidden="true" />
        <span className="sr-only">Bag, {quantity} items</span>
        {quantity > 0 && (
          <span
            aria-hidden="true"
            className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-foreground font-mono text-[10px] text-background"
          >
            {quantity}
          </span>
        )}
      </button>
    </header>
  )
}
