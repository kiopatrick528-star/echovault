import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { AnimatedBackground } from '@/components/animated-background'
import { HeroSection } from '@/components/home/hero-section'
import { FeaturesSection } from '@/components/home/features-section'
import { HowItWorks } from '@/components/home/how-it-works'

export default function HomePage() {
  return (
    <>
      <AnimatedBackground />
      <SiteNav />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
      </main>
      <SiteFooter />
    </>
  )
}
