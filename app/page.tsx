
import HeroSection from '../components/HeroSection2';
import FeaturesSection from '..//components/FeaturesSection2';
import AboutSection from '../components/AboutSection2'; // New component
import TokenomicsSection from '@/components/TokenomicsSection'; // New component
import RoadmapSection from '../components/RoadmapSection'; // New component
import FAQsSection from '../components/FAQsSection'; // New component
import CallToActionSection from '../components/CallToActionSection'; // New section

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <TokenomicsSection />
      <CallToActionSection /> {/* New section for token purchase CTA */}
      <RoadmapSection />
      <FAQsSection />
    </div>
  );
}

