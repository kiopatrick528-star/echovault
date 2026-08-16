import { SiteNav } from '@/components/site-nav'
import { AnimatedBackground } from '@/components/animated-background'
import { RecognizeExperience } from '@/components/recognize/recognize-experience'

export default function RecognizePage() {
  return (
    <>
      <AnimatedBackground />
      <SiteNav />
      <main className="min-h-screen">
        <RecognizeExperience />
      </main>
    </>
  )
}
