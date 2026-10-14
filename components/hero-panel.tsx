import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const stats = [
  { value: '-42dB', label: 'Adaptive ANC' },
  { value: '60h', label: 'Battery life' },
  { value: '4.9', label: 'Avg. rating' },
]

export function HeroPanel({
  onShop,
  onBuy,
}: {
  onShop: () => void
  onBuy: () => void
}) {
  return (
    <div className="neon-ring relative isolate flex w-full flex-col justify-between gap-6 overflow-hidden rounded-3xl bg-black p-6 text-white lg:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(34,211,238,0.28),transparent_45%),radial-gradient(circle_at_90%_85%,rgba(217,70,239,0.3),transparent_50%),linear-gradient(160deg,rgba(0,0,0,0)_30%,rgba(0,0,0,0.85))]"
      />
      <div className="flex flex-col gap-5">
        <p className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] tracking-wider text-muted-foreground uppercase backdrop-blur">
          <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          Now shipping worldwide
        </p>
        <h1
          id="hero-title"
          className="neon-text text-4xl leading-[1.02] font-semibold tracking-tighter text-balance sm:text-5xl xl:text-6xl"
        >
          Welcome to My Store
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-pretty text-white/80 lg:text-base">
          Lune One reads your surroundings 48,000 times a second and cancels
          the noise before you notice it. Nothing between you and the work.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="lg" className="h-10 rounded-full px-5" onClick={onBuy}>
            Pre-order now
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="h-10 rounded-full px-5 lg:hidden"
            onClick={onShop}
          >
            View details
          </Button>
        </div>
      </div>

      <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1 bg-background/70 p-4 backdrop-blur">
            <dt className="order-2 text-xs text-muted-foreground">{stat.label}</dt>
            <dd className="order-1 font-mono text-xl font-medium tracking-tight lg:text-2xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
