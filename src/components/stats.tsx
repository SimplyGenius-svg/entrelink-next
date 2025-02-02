export function Stats() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="rounded-lg border bg-background p-8 text-center shadow-lg transition-transform hover:scale-105">
        <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-black">500K+</div>
        <div className="mt-2 text-sm text-muted-foreground">Active Investors</div>
      </div>
      <div className="rounded-lg border bg-background p-8 text-center shadow-lg transition-transform hover:scale-105">
        <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-black">$50B+</div>
        <div className="mt-2 text-sm text-muted-foreground">Capital Available</div>
      </div>
      <div className="rounded-lg border bg-background p-8 text-center shadow-lg transition-transform hover:scale-105">
        <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-black">10K+</div>
        <div className="mt-2 text-sm text-muted-foreground">Successful Matches</div>
      </div>
    </div>
  )
}

