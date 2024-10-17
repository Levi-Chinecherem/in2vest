import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import AboutSection from '../components/AboutSection'; // New component
import TokenomicsSection from '/components/TokenomicsSection'; // New component
import RoadmapSection from '../components/RoadmapSection'; // New component
import FAQsSection from '../components/FAQsSection'; // New component
import CallToActionSection from '../components/CallToActionSection'; // New section

const HomePage: React.FC = () => {
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
};

export default HomePage;
