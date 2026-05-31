import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function Landing() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Decorative scribbles in background */}
      <div className="absolute top-20 -left-10 w-40 h-40 border-4 border-dashed border-pencil/10 rounded-full animate-jiggle" />
      <div className="absolute bottom-40 right-10 w-24 h-24 bg-postit/30 wobbly-md rotate-6" />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 md:py-24 flex flex-col items-center">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mb-16 relative">
          <h1 className="text-6xl md:text-8xl font-heading text-pencil leading-tight mb-6">
            Where Devs <br className="md:hidden" />
            <span className="relative inline-block">
              Connect
              <svg className="absolute w-full h-4 -bottom-1 left-0 text-marker" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,10 Q25,20 50,10 T100,10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-pencil/80 mb-10 max-w-xl mx-auto">
            A social platform for developers to sketch out ideas, share snippets, and build their network.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto text-xl px-10">
                Join the Sketchpad 🚀
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" size="lg" className="w-full sm:w-auto text-xl">
                Log In ✏️
              </Button>
            </Link>
          </div>
          
          {/* Hand drawn arrow pointing at CTA */}
          <div className="hidden md:block absolute -right-12 bottom-0 w-24 text-pencil animate-jiggle">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10,80 Q40,90 80,40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 4" />
              <path d="M60,35 L82,38 L75,60" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl mt-12">
          <FeatureCard 
            title="Share Code 💻" 
            desc="Post syntax-highlighted snippets directly in your feed. Wobbly borders included."
            rotation="-rotate-2"
          />
          <FeatureCard 
            title="Build Network 👥" 
            desc="Follow other devs, comment on their sketches, and build your community."
            rotation="rotate-1"
          />
          <FeatureCard 
            title="Authentic Vibe 🎨" 
            desc="No corporate polish here. Just a messy, beautiful sketchbook of ideas."
            rotation="-rotate-1"
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ title, desc, rotation }) {
  return (
    <div className={`bg-postit p-6 border-[3px] border-pencil wobbly shadow-hard ${rotation} relative hover:rotate-0 transition-transform`}>
      {/* Tape decoration */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-pencil/10 rotate-2" />
      
      <h3 className="text-2xl font-heading mb-3">{title}</h3>
      <p className="text-lg text-pencil/80 leading-relaxed">{desc}</p>
    </div>
  );
}
