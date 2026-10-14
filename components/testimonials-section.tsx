import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    name: 'Maya Chen',
    role: 'Product designer',
    rating: 5,
    quote:
      'I wear them through entire design sprints. The open-office chatter just disappears, and they never feel heavy.',
  },
  {
    name: 'Daniel Okafor',
    role: 'Frequent flyer',
    rating: 5,
    quote:
      'Fourteen hours to Tokyo and I still had battery to spare. The engine drone was gone the moment I put them on.',
  },
  {
    name: 'Sofia Ruiz',
    role: 'Music producer',
    rating: 4,
    quote:
      'Detailed, balanced sound with real depth in the low end. I only wish the case were a little smaller.',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      <span className="sr-only">{`Rated ${rating} out of 5`}</span>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn(
            'size-4',
            i < rating ? 'fill-foreground text-foreground' : 'text-white/20',
          )}
        />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section aria-labelledby="testimonials-title" className="flex flex-col gap-6 py-8 lg:py-12">
      <div className="flex flex-col gap-2">
        <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
          Testimonials
        </p>
        <h2
          id="testimonials-title"
          className="text-3xl font-semibold tracking-tighter text-balance lg:text-4xl"
        >
          Loved by people who need quiet
        </h2>
      </div>

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {testimonials.map((t) => (
          <li
            key={t.name}
            className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
          >
            <StarRating rating={t.rating} />
            <blockquote className="flex-1 text-sm leading-relaxed text-pretty">
              <p>{`“${t.quote}”`}</p>
            </blockquote>
            <div className="text-sm">
              <p className="font-medium">{t.name}</p>
              <p className="text-muted-foreground">{t.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
