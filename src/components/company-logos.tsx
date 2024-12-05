export function CompanyLogos() {
  return (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex h-12 items-center justify-center grayscale transition-all hover:grayscale-0 hover:scale-110"
        >
          <div className="h-6 w-24 rounded-lg bg-gradient-to-r from-primary/20 to-primary-foreground/20 shadow-sm" />
        </div>
      ))}
    </div>
  )
}

