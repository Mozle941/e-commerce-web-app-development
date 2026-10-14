const layerBase =
  'pointer-events-none absolute inset-0 [transform:translateZ(0)] will-change-transform'

export function AuraBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh overflow-hidden">
      <div
        aria-hidden="true"
        className={`${layerBase} mix-blend-screen blur-[175px] md:blur-[252px]`}
        style={{
          background:
            'radial-gradient(circle at 20% 30%, rgba(148,163,184,0.5) 0%, transparent 45%)',
        }}
      />
      <div
        aria-hidden="true"
        className={`${layerBase} mix-blend-screen blur-[200px] md:blur-[260px]`}
        style={{
          background:
            'radial-gradient(circle at 80% 25%, rgba(203,213,225,0.4) 0%, transparent 40%)',
        }}
      />
      <div
        aria-hidden="true"
        className={`${layerBase} mix-blend-soft-light blur-[200px] md:blur-[260px]`}
        style={{
          background:
            'radial-gradient(circle at 50% 75%, rgba(100,116,139,0.35) 0%, transparent 50%)',
        }}
      />
      <div
        aria-hidden="true"
        className={`${layerBase} mix-blend-overlay blur-[125px] md:blur-[180px]`}
        style={{
          background:
            'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.15) 0%, transparent 30%)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
