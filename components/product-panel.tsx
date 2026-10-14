import Image from 'next/image'
import { Minus, Plus, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { formatPrice, product, type FinishId } from '@/lib/product'

const MAX_QUANTITY = 5

export function ProductPanel({
  finish,
  onFinishChange,
  quantity,
  onQuantityChange,
  onBuyNow,
}: {
  finish: FinishId
  onFinishChange: (finish: FinishId) => void
  quantity: number
  onQuantityChange: (quantity: number) => void
  onBuyNow: () => void
}) {
  const selectedFinish = product.finishes.find((f) => f.id === finish)

  return (
    <article className="flex w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
      <div className="relative min-h-0 flex-1">
        <Image
          src={product.image}
          alt={`${product.name} headphones in ${selectedFinish?.label}`}
          fill
          priority
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover"
        />
        <span className="absolute top-4 left-4 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-[11px] text-muted-foreground backdrop-blur">
          New · Gen 2
        </span>
      </div>

      <div className="flex flex-col gap-4 border-t border-white/10 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="product-title" className="text-xl font-semibold tracking-tight">
              {product.name}
            </h2>
            <p className="text-sm text-muted-foreground">{product.tagline}</p>
          </div>
          <p className="font-mono text-xl font-medium">{formatPrice(product.price)}</p>
        </div>

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-foreground text-foreground" aria-hidden="true" />
          <span className="text-foreground">{product.rating}</span>
          <span>({product.reviews.toLocaleString()} reviews)</span>
        </p>

        <fieldset className="flex items-center justify-between gap-4">
          <legend className="sr-only">Finish</legend>
          <div className="flex items-center gap-2">
            {product.finishes.map((f) => (
              <label key={f.id} className="cursor-pointer">
                <input
                  type="radio"
                  name="finish"
                  value={f.id}
                  checked={finish === f.id}
                  onChange={() => onFinishChange(f.id)}
                  className="peer sr-only"
                />
                <span className="sr-only">{f.label}</span>
                <span
                  aria-hidden="true"
                  className="block size-6 rounded-full border border-white/20 ring-offset-2 ring-offset-background transition peer-checked:ring-2 peer-checked:ring-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring"
                  style={{ backgroundColor: f.swatch }}
                />
              </label>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">{selectedFinish?.label}</span>
        </fieldset>

        <dl className="grid grid-cols-3 gap-2">
          {product.specs.map((spec) => (
            <div key={spec.label} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
              <dt className="text-[11px] text-muted-foreground">{spec.label}</dt>
              <dd className="font-mono text-sm">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex items-center gap-2">
          <div className="flex h-11 items-center rounded-full border border-white/10 bg-white/[0.03]">
            <button
              type="button"
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="flex size-11 items-center justify-center rounded-full text-muted-foreground hover:text-foreground disabled:opacity-40"
            >
              <Minus className="size-4" aria-hidden="true" />
              <span className="sr-only">Decrease quantity</span>
            </button>
            <output aria-live="polite" aria-label="Quantity" className="w-6 text-center font-mono text-sm">
              {quantity}
            </output>
            <button
              type="button"
              onClick={() => onQuantityChange(Math.min(MAX_QUANTITY, quantity + 1))}
              disabled={quantity >= MAX_QUANTITY}
              className="flex size-11 items-center justify-center rounded-full text-muted-foreground hover:text-foreground disabled:opacity-40"
            >
              <Plus className="size-4" aria-hidden="true" />
              <span className="sr-only">Increase quantity</span>
            </button>
          </div>
          <Button
            onClick={onBuyNow}
            className={cn('h-11 flex-1 rounded-full text-sm')}
          >
            Buy Now · {formatPrice(product.price * quantity)}
          </Button>
        </div>
      </div>
    </article>
  )
}
