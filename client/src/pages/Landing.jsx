import { Link } from 'react-router-dom';
import { Code2, Users, Paintbrush, ArrowRight, Globe, MessageSquare, Heart, Terminal, Sparkles, Coffee } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuthStore } from '../stores/authStore';

export default function Landing() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col bg-paper paper-texture">
      
      {/* 1. Top Navigation */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2 text-3xl font-heading text-pencil">
          <Terminal className="w-8 h-8 stroke-[2.5]" />
          <span className="relative">
            DevConnect
            <svg className="absolute -bottom-2 left-0 w-full h-2 text-marker" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0,5 Q50,10 100,5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </div>
        <nav className="hidden md:flex gap-6 items-center font-heading text-xl">
          <a href="#features" className="hover:text-pen transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-pen transition-colors">How it Works</a>
          <a href="#community" className="hover:text-pen transition-colors">Community</a>
        </nav>
        <div className="flex gap-4">
          {isAuthenticated ? (
            <Link to="/feed">
              <Button className="text-lg shadow-hard-sm">Go to Feed</Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-lg">Log In</Button>
              </Link>
              <Link to="/register" className="hidden sm:block">
                <Button className="text-lg shadow-hard-sm">Join</Button>
              </Link>
            </>
          )}
        </div>
      </header>

      <main className="flex-1 w-full flex flex-col items-center relative z-10">
        
        {/* Decorative Scribbles (Global) */}
        <div className="absolute top-40 -left-20 w-64 h-64 border-[3px] border-dashed border-pencil/10 rounded-full animate-jiggle -z-10" />
        <div className="absolute top-96 right-10 w-32 h-32 border-[3px] border-pencil/5 wobbly-md rotate-12 -z-10" />
        <div className="absolute top-20 right-40 text-marker/20 -z-10 animate-pulse"><Sparkles className="w-16 h-16" /></div>

        {/* 2. Enhanced Hero Section */}
        <section className="max-w-5xl mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center relative w-full">
          
          <div className="absolute top-10 left-10 md:-left-10 w-24 h-24 bg-postit wobbly-sm -rotate-6 shadow-hard-subtle p-2 items-center justify-center text-center -z-10 animate-jiggle hidden md:flex">
             <span className="font-heading text-xl text-pencil/80">"Hello World!"</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading text-pencil leading-[1.1] mb-8 relative z-10">
            Where Devs <br />
            <span className="relative inline-block mt-4 md:mt-0">
              <span className="relative z-10">Connect & Build</span>
              <svg className="absolute w-[110%] h-8 -bottom-3 -left-[5%] text-marker -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,10 Q25,25 50,10 T100,10" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          
          <p className="text-xl md:text-3xl text-pencil/80 mb-12 max-w-2xl mx-auto font-body leading-relaxed">
            A messy, beautiful sketchbook of ideas. Share your snippets, sketch out logic, and find your engineering squad.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
            {isAuthenticated ? (
              <Link to="/feed">
                <Button size="lg" className="w-full sm:w-auto text-2xl px-12 py-6 shadow-hard-lg hover:translate-y-1 hover:shadow-hard transition-all">
                  Go to Feed 🚀
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto text-2xl px-12 py-6 shadow-hard-lg hover:translate-y-1 hover:shadow-hard transition-all">
                    Start Sketching 🚀
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto text-2xl px-8 border-[3px] border-pencil wobbly shadow-hard hover:bg-pencil hover:text-paper transition-all">
                    Log In ✏️
                  </Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Hand drawn arrow pointing at CTA */}
          <div className="hidden md:block absolute right-20 bottom-10 w-32 text-pen animate-jiggle">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10,90 Q50,90 90,40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 6" />
              <path d="M65,35 L93,38 L85,65" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <text x="50" y="80" fontFamily="Patrick Hand" fontSize="16" fill="currentColor" transform="rotate(-15 50 80)">Click it!</text>
            </svg>
          </div>
        </section>

        {/* 3. Features Grid */}
        <section id="features" className="w-full max-w-6xl mx-auto px-6 py-24 relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-heading text-pencil inline-block relative">
              What's Inside?
              <svg className="absolute w-full h-3 -bottom-2 left-0 text-pen" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,5 Q50,0 100,8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 w-full">
            <FeatureCard 
              icon={<Code2 className="w-10 h-10 mb-4 text-pen" />}
              title="Share Code Snippets" 
              desc="Post syntax-highlighted snippets directly in your feed. Markdown supported, wobbly borders included."
              rotation="-rotate-2"
              color="bg-postit"
              tapePos="left"
            />
            <FeatureCard 
              icon={<Users className="w-10 h-10 mb-4 text-marker" />}
              title="Build Your Network" 
              desc="Follow other devs, comment on their sketches, and build a community that doesn't feel like LinkedIn."
              rotation="rotate-3"
              color="bg-white"
              tapePos="center"
            />
            <FeatureCard 
              icon={<Paintbrush className="w-10 h-10 mb-4 text-pencil" />}
              title="Authentic Vibe" 
              desc="No corporate polish here. Just a messy, beautiful sketchbook of ideas with hand-drawn primitives."
              rotation="-rotate-1"
              color="bg-muted"
              tapePos="right"
            />
          </div>
        </section>

        {/* 4. How It Works Section */}
        <section id="how-it-works" className="w-full max-w-4xl mx-auto px-6 py-24 border-y-[3px] border-dashed border-pencil/20 relative">
           <h2 className="text-5xl md:text-6xl font-heading text-pencil text-center mb-20 relative">
             How It Works
             <div className="absolute right-1/4 top-0 text-marker animate-jiggle"><ArrowRight className="w-12 h-12 rotate-45" /></div>
           </h2>

           <div className="flex flex-col md:flex-row justify-between items-center gap-12 relative w-full">
             
             {/* Step 1 */}
             <div className="relative w-full md:w-1/3 flex flex-col items-center text-center">
               <div className="w-32 h-32 bg-white border-[3px] border-pencil wobbly shadow-hard flex items-center justify-center mb-6 rotate-2 z-10 hover:scale-105 transition-transform">
                 <span className="font-heading text-6xl text-pen">1</span>
               </div>
               <h3 className="font-heading text-3xl mb-2 text-pencil">Sketch an Idea</h3>
               <p className="text-xl text-pencil/80">Got a 3 AM thought about database schema? Jot it down.</p>
               
               {/* Arrow to Step 2 */}
               <div className="hidden md:block absolute top-16 -right-16 w-32 h-8 text-pencil">
                 <svg viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0,10 Q50,0 100,10" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="5 5" />
                    <polygon points="95,5 100,10 95,15" fill="currentColor" />
                 </svg>
               </div>
             </div>

             {/* Step 2 */}
             <div className="relative w-full md:w-1/3 flex flex-col items-center text-center">
               <div className="w-32 h-32 bg-postit border-[3px] border-pencil wobbly-sm shadow-hard flex items-center justify-center mb-6 -rotate-3 z-10 hover:scale-105 transition-transform">
                 <span className="font-heading text-6xl text-marker">2</span>
               </div>
               <h3 className="font-heading text-3xl mb-2 text-pencil">Share the Code</h3>
               <p className="text-xl text-pencil/80">Drop in your code snippets with full Markdown support.</p>
               
               {/* Arrow to Step 3 */}
               <div className="hidden md:block absolute top-16 -right-16 w-32 h-8 text-pencil">
                 <svg viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0,10 Q50,20 100,10" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="5 5" />
                    <polygon points="95,5 100,10 95,15" fill="currentColor" />
                 </svg>
               </div>
             </div>

             {/* Step 3 */}
             <div className="relative w-full md:w-1/3 flex flex-col items-center text-center">
               <div className="w-32 h-32 bg-pencil border-[3px] border-pencil wobbly-md shadow-hard flex items-center justify-center mb-6 rotate-1 z-10 hover:scale-105 transition-transform text-paper">
                 <span className="font-heading text-6xl">3</span>
               </div>
               <h3 className="font-heading text-3xl mb-2 text-pencil">Connect & Grow</h3>
               <p className="text-xl text-pencil/80">Get feedback, like posts, and build your developer squad.</p>
             </div>

           </div>
        </section>

        {/* 5. Community / Testimonial Section */}
        <section id="community" className="w-full max-w-6xl mx-auto px-6 py-24 relative overflow-hidden">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-heading text-pencil">Wall of Fame</h2>
            <p className="text-2xl font-body text-pencil/70 mt-4">Don't just take our word for it.</p>
          </div>

          {/* Corkboard background effect */}
          <div className="relative w-full min-h-[400px] p-8 bg-[#d8c3a5]/20 border-[4px] border-pencil wobbly-md rounded-xl shadow-inner">
            {/* Post-it 1 */}
            <div className="absolute top-10 left-[10%] md:left-[20%] w-64 bg-postit p-6 shadow-hard wobbly-sm -rotate-6 hover:rotate-0 hover:z-20 transition-all cursor-default group">
               <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-marker rounded-full shadow-sm"></div>
               <p className="font-body text-xl leading-snug mb-4">"Finally a place to post my messy code snippets without feeling judged by recruiters."</p>
               <div className="flex items-center gap-3 font-heading text-lg">
                 <div className="w-8 h-8 rounded-full border-2 border-pencil bg-white flex items-center justify-center">🧑‍💻</div>
                 <span>@frontend_junkie</span>
               </div>
            </div>

            {/* Post-it 2 */}
            <div className="absolute top-32 right-[5%] md:right-[20%] w-72 bg-[#a8e6cf] p-6 shadow-hard wobbly rotate-3 hover:rotate-0 hover:z-20 transition-all cursor-default group">
               <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-pen rounded-full shadow-sm"></div>
               <p className="font-body text-xl leading-snug mb-4">"The hand-drawn aesthetic makes my bugs feel like happy little accidents."</p>
               <div className="flex items-center gap-3 font-heading text-lg">
                 <div className="w-8 h-8 rounded-full border-2 border-pencil bg-white flex items-center justify-center">🎨</div>
                 <span>@bob_ross_dev</span>
               </div>
            </div>

            {/* Post-it 3 */}
            <div className="absolute bottom-10 left-[20%] md:left-[40%] w-64 bg-[#ffb7b2] p-6 shadow-hard wobbly-md rotate-6 hover:rotate-0 hover:z-20 transition-all cursor-default group">
               <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-pencil rounded-full shadow-sm"></div>
               <p className="font-body text-xl leading-snug mb-4">"Love the real-time sockets. I get notified immediately when someone roasts my algorithms."</p>
               <div className="flex items-center gap-3 font-heading text-lg">
                 <div className="w-8 h-8 rounded-full border-2 border-pencil bg-white flex items-center justify-center">⚡</div>
                 <span>@speedrunner</span>
               </div>
            </div>
            
            <div className="h-[400px] w-full"></div> {/* Spacer for absolute positioning */}
          </div>
        </section>

      </main>

      {/* 6. Footer */}
      <footer className="w-full bg-pencil text-paper py-12 border-t-8 border-marker mt-12 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-3xl font-heading mb-4">
              <Terminal className="w-8 h-8 stroke-[2.5]" />
              DevConnect
            </div>
            <p className="font-body text-paper/80 text-lg max-w-xs">
              A place for developers to be developers. Sketch, code, connect.
            </p>
          </div>
          
          <div className="flex flex-col gap-2 font-heading text-xl">
             <h4 className="text-2xl text-marker mb-2">Links</h4>
             <Link to="/login" className="hover:text-postit transition-colors w-max">Log In</Link>
             <Link to="/register" className="hover:text-postit transition-colors w-max">Register</Link>
             <a href="#features" className="hover:text-postit transition-colors w-max">Features</a>
          </div>

          <div className="flex flex-col gap-2 font-heading text-xl">
            <h4 className="text-2xl text-pen mb-2">Socials</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 border-2 border-paper wobbly-sm hover:bg-paper hover:text-pencil transition-colors">
                <Globe className="w-6 h-6" />
              </a>
              <a href="#" className="p-2 border-2 border-paper wobbly hover:bg-paper hover:text-pencil transition-colors">
                <Globe className="w-6 h-6" />
              </a>
              <a href="#" className="p-2 border-2 border-paper wobbly-md hover:bg-paper hover:text-pencil transition-colors">
                <Coffee className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12 font-body text-paper/60 text-lg flex items-center justify-center gap-2">
          Made with <Heart className="w-5 h-5 text-marker fill-marker" /> and lots of bugs. © 2026
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc, rotation, color, tapePos }) {
  const getTapePos = () => {
    switch(tapePos) {
      case 'left': return '-top-3 left-6 -rotate-6';
      case 'right': return '-top-3 right-6 rotate-6';
      default: return '-top-3 left-1/2 -translate-x-1/2 rotate-2';
    }
  };

  return (
    <div className={`${color} p-8 border-[3px] border-pencil wobbly shadow-hard ${rotation} relative hover:rotate-0 hover:-translate-y-2 hover:shadow-hard-lg transition-all duration-300`}>
      {/* Tape decoration */}
      <div className={`absolute ${getTapePos()} w-16 h-6 bg-pencil/15`} />
      
      {icon}
      <h3 className="text-3xl font-heading mb-4 text-pencil">{title}</h3>
      <p className="text-xl text-pencil/80 leading-relaxed font-body">{desc}</p>
    </div>
  );
}
