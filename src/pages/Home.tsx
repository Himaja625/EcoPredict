import { Link } from 'react-router-dom';
import {
  ArrowRight, Leaf, TrainFront, UtensilsCrossed, Lightbulb, ShoppingBasket,
  Trash2, Sprout, BarChart3, Sparkles, ShieldCheck, TreePine,
} from 'lucide-react';

const earthImage = 'https://images.pexels.com/photos/30596294/pexels-photo-30596294.png?auto=compress&cs=tinysrgb&h=900&w=600';
const forestImage = 'https://images.pexels.com/photos/1310757/pexels-photo-1310757.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200';
const pathImage = 'https://images.pexels.com/photos/160636/path-andar-field-landscape-160636.jpeg?auto=compress&cs=tinysrgb&h=700&w=1000';

export function Home() {
  return (
    <div className="home-page">
      <nav className="home-nav">
        <Link to="/" className="brand"><span className="brand-mark"><Leaf size={18} /></span><span>Eco<span>Predict</span></span></Link>
        <div className="home-nav-links">
          <Link to="/calculator">Calculator</Link>
          <Link to="/insights">Insights</Link>
          <Link to="/about">About</Link>
          <Link to="/calculator" className="nav-cta">Calculate My Footprint <ArrowRight size={15} /></Link>
        </div>
        <Link to="/calculator" className="nav-cta mobile-only">Start <ArrowRight size={15} /></Link>
      </nav>

      <section className="hero-split">
        <div className="hero-left">
          <div className="eyebrow"><span className="eyebrow-dot" /> A clearer view of everyday impact</div>
          <h1>Your everyday choices<br /><em>shape a bigger picture.</em></h1>
          <p>Understand your carbon footprint, discover what contributes to it, and find practical ways to make a lighter impact.</p>
          <div className="hero-actions">
            <Link to="/calculator" className="btn-primary">Calculate My Footprint <ArrowRight size={17} /></Link>
            <Link to="/about" className="btn-ghost">Explore EcoPredict <span>↗</span></Link>
          </div>
          <div className="hero-trust"><ShieldCheck size={15} /> No account needed <span /> <Leaf size={15} /> Private by design</div>
        </div>
        <div className="hero-right">
          <div className="hero-earth-wrap">
            <img src={earthImage} alt="Earth viewed from space" className="hero-earth" />
            <div className="earth-ring ring-one" />
            <div className="earth-ring ring-two" />
            <div className="orbit-dot dot-one" />
            <div className="orbit-dot dot-two" />
          </div>
        </div>
      </section>

      <section className="understanding-section">
        <div className="section-container">
          <div className="section-intro centered">
            <div className="eyebrow">Understanding your footprint</div>
            <h2>Four parts of<br /><em>everyday life.</em></h2>
            <p>Personal carbon emissions are not one thing. They are shaped by how we move, eat, power our homes and consume.</p>
          </div>
          <div className="understanding-grid">
            {[
              { icon: TrainFront, title: 'Transportation', text: 'How you commute and travel, from daily trips to long flights.' },
              { icon: UtensilsCrossed, title: 'Food', text: 'The kinds of meals on your plate and where they come from.' },
              { icon: Lightbulb, title: 'Home energy', text: 'Heating, electricity and the efficiency of your appliances.' },
              { icon: ShoppingBasket, title: 'Consumption', text: 'New clothes, groceries and the waste your household produces.' },
            ].map(({ icon: Icon, title, text }) => (
              <article className="understanding-card" key={title}>
                <div className="understanding-icon"><Icon size={20} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="how-section">
        <div className="section-container">
          <div className="section-intro centered">
            <div className="eyebrow">How EcoPredict works</div>
            <h2>From a few answers<br /><em>to a clearer picture.</em></h2>
          </div>
          <div className="how-flow">
            {[
              { icon: Sprout, n: '01', title: 'Share your lifestyle', text: 'A short, friendly questionnaire about everyday habits.' },
              { icon: BarChart3, n: '02', title: 'Analyze your habits', text: 'Your answers map to the features used by our model.' },
              { icon: TreePine, n: '03', title: 'Understand your footprint', text: 'See an annual estimate and what shaped it.' },
              { icon: Sparkles, n: '04', title: 'Find better choices', text: 'Practical suggestions connected to your routine.' },
            ].map(({ icon: Icon, n, title, text }, i) => (
              <div className="how-step" key={n}>
                <div className="how-step-icon"><Icon size={22} /></div>
                <span className="how-step-n">{n}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                {i < 3 && <div className="how-connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section">
        <div className="editorial-image">
          <img src={pathImage} alt="A person walking along a sunlit forest path" />
        </div>
        <div className="editorial-copy">
          <div className="eyebrow">Why everyday choices matter</div>
          <h2>Small habits,<br /><em>measurable patterns.</em></h2>
          <p>No single choice defines your footprint. But together, the way we travel, eat and consume forms a pattern that can be understood and gently shifted.</p>
          <ul className="editorial-list">
            <li><TrainFront size={18} /> <span>Transport choices often account for a large share of personal emissions.</span></li>
            <li><UtensilsCrossed size={18} /> <span>Food habits interact with land use and supply chains.</span></li>
            <li><Trash2 size={18} /> <span>Waste and recycling shape what gets reused versus replaced.</span></li>
          </ul>
        </div>
      </section>

      <section className="cta-forest">
        <div className="cta-forest-inner">
          <div className="eyebrow light">A more thoughtful way forward</div>
          <h2>Understanding your impact is<br /><em>the first step to changing it.</em></h2>
          <Link to="/calculator" className="btn-cream">Calculate my footprint <ArrowRight size={17} /></Link>
        </div>
        <img src={forestImage} alt="" className="cta-bg" aria-hidden="true" />
      </section>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <Link to="/" className="brand"><span className="brand-mark"><Leaf size={16} /></span><span>Eco<span>Predict</span></span></Link>
            <p>A clearer view of the choices that shape our world.</p>
          </div>
          <div className="footer-links">
            <Link to="/calculator">Calculator</Link>
            <Link to="/results">My Results</Link>
            <Link to="/recommendations">Recommendations</Link>
            <Link to="/insights">Insights</Link>
            <Link to="/about">About</Link>
          </div>
        </div>
        <div className="footer-bottom"><span>© 2026 EcoPredict</span><span>A final year data science project</span></div>
      </footer>
    </div>
  );
}
