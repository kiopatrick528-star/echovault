import Link from 'next/link'
import { AudioWaveform } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="glass flex flex-col items-center justify-between gap-6 rounded-2xl px-6 py-8 sm:flex-row">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-cyan/15">
            <AudioWaveform className="h-4 w-4 text-cyan" />
          </span>
          <span className="font-mono text-base font-bold">
            Echo<span className="text-cyan">Vault</span>
          </span>
        </Link>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link href="/recognize" className="transition-colors hover:text-cyan">
            Reconnaître
          </Link>
          <Link href="/dashboard/user" className="transition-colors hover:text-cyan">
            Utilisateur
          </Link>
          <Link href="/dashboard/artist" className="transition-colors hover:text-cyan">
            Artiste
          </Link>
          <Link href="/dashboard/admin" className="transition-colors hover:text-cyan">
            Admin
          </Link>
        </nav>
        <p className="font-mono text-xs text-muted-foreground">© 2026 EchoVault</p>
      </div>
    </footer>
  )
}
