'use client'

import { useState, type Ref } from 'react'
import Image from 'next/image'
import { CheckCircle2, CreditCard, Lock, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  SHIPPING,
  TAX_RATE,
  formatPrice,
  product,
  type FinishId,
} from '@/lib/product'

type Status = 'idle' | 'processing' | 'success'

const inputClass =
  'h-10 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm placeholder:text-muted-foreground/60 outline-none transition focus:border-white/30 focus:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-ring/50 aria-invalid:border-destructive/60'

function formatCardNumber(value: string) {
  return value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ')
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  return digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits
}

export function CheckoutPanel({
  ref,
  finish,
  quantity,
  highlighted,
}: {
  ref: Ref<HTMLInputElement>
  finish: FinishId
  quantity: number
  highlighted: boolean
}) {
  const [status, setStatus] = useState<Status>('idle')
  const [card, setCard] = useState('')
  const [expiry, setExpiry] = useState('')
  const [error, setError] = useState<string | null>(null)

  const finishLabel = product.finishes.find((f) => f.id === finish)?.label
  const subtotal = product.price * quantity
  const tax = subtotal * TAX_RATE
  const total = subtotal + tax + SHIPPING

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    if (card.replace(/\s/g, '').length !== 16) {
      setError('Enter a valid 16-digit card number.')
      return
    }
    const [mm] = expiry.split(' / ')
    if (expiry.length !== 7 || Number(mm) < 1 || Number(mm) > 12) {
      setError('Enter a valid expiry date (MM / YY).')
      return
    }
    setError(null)
    setStatus('processing')
    setTimeout(() => setStatus('success'), 1400)
  }

  if (status === 'success') {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-xl">
        <CheckCircle2 className="size-10 text-emerald-400" aria-hidden="true" />
        <h2 id="checkout-title" className="text-xl font-semibold tracking-tight">
          Order confirmed
        </h2>
        <p className="max-w-xs text-sm text-muted-foreground" role="status">
          {quantity} × {product.name} in {finishLabel} — {formatPrice(total)}.
          A receipt is on its way to your inbox.
        </p>
        <Button
          variant="outline"
          className="rounded-full"
          onClick={() => {
            setStatus('idle')
            setCard('')
            setExpiry('')
          }}
        >
          Place another order
        </Button>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex w-full flex-col gap-4 rounded-3xl border bg-white/[0.03] p-5 backdrop-blur-xl transition-colors',
        highlighted ? 'border-white/25' : 'border-white/10',
      )}
    >
      <div className="flex items-center justify-between">
        <h2 id="checkout-title" className="text-xl font-semibold tracking-tight">
          Checkout
        </h2>
        <p className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
          <Lock className="size-3" aria-hidden="true" />
          256-bit secured
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-2.5">
        <div className="relative size-12 shrink-0 overflow-hidden rounded-xl">
          <Image src={product.image} alt="" fill sizes="48px" className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{product.name}</p>
          <p className="text-xs text-muted-foreground">
            {finishLabel} · Qty {quantity}
          </p>
        </div>
        <p className="font-mono text-sm">{formatPrice(subtotal)}</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex min-h-0 flex-1 flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs text-muted-foreground">
            Email
          </label>
          <input
            ref={ref}
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="card-number" className="text-xs text-muted-foreground">
            Card number
          </label>
          <div className="relative">
            <input
              id="card-number"
              name="card-number"
              inputMode="numeric"
              autoComplete="cc-number"
              required
              placeholder="4242 4242 4242 4242"
              value={card}
              onChange={(e) => setCard(formatCardNumber(e.target.value))}
              className={cn(inputClass, 'pr-10 font-mono')}
            />
            <CreditCard
              className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="expiry" className="text-xs text-muted-foreground">
              Expiry
            </label>
            <input
              id="expiry"
              name="expiry"
              inputMode="numeric"
              autoComplete="cc-exp"
              required
              placeholder="MM / YY"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              className={cn(inputClass, 'font-mono')}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="cvc" className="text-xs text-muted-foreground">
              CVC
            </label>
            <input
              id="cvc"
              name="cvc"
              inputMode="numeric"
              autoComplete="cc-csc"
              required
              pattern="\d{3,4}"
              maxLength={4}
              placeholder="123"
              className={cn(inputClass, 'font-mono')}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="cardholder" className="text-xs text-muted-foreground">
            Name on card
          </label>
          <input
            id="cardholder"
            name="cardholder"
            required
            autoComplete="cc-name"
            placeholder="Ada Lovelace"
            className={inputClass}
          />
        </div>

        {error && (
          <p role="alert" className="text-xs text-destructive">
            {error}
          </p>
        )}

        <dl className="mt-auto flex flex-col gap-1.5 border-t border-white/10 pt-3 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <dt>Shipping</dt>
            <dd className="font-mono">{SHIPPING === 0 ? 'Free' : formatPrice(SHIPPING)}</dd>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <dt>Tax</dt>
            <dd className="font-mono">{formatPrice(tax)}</dd>
          </div>
          <div className="flex justify-between font-medium">
            <dt>Total</dt>
            <dd className="font-mono">{formatPrice(total)}</dd>
          </div>
        </dl>

        <Button
          type="submit"
          disabled={status === 'processing'}
          className="h-11 rounded-full text-sm"
        >
          {status === 'processing' ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              Processing…
            </>
          ) : (
            `Pay ${formatPrice(total)}`
          )}
        </Button>
      </form>
    </div>
  )
}
