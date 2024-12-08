import Sidebar from './components/Sidebar';
import HeroSection from './components/HeroSection';
import Insights from './components/Insights';
import Widgets from './components/Widgets';
import Footer from './components/Footer';

export default function Launchpad() {
  return (
    <div className="launchpad-layout">
      <Sidebar />
      <main className="content">
        <HeroSection />
        <Insights />
        <Widgets />
        <Footer />
      </main>
    </div>
  );
}
