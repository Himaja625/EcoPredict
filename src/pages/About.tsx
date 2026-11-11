import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Leaf, Sprout, BarChart3, Sparkles, Database, Cpu, GitBranch, Code2,
} from 'lucide-react';

export function About() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const methodology = [
    { icon: Sprout, title: 'Lifestyle Information', text: 'A short questionnaire captures everyday habits across transport, food, energy and consumption.' },
    { icon: Database, title: 'Data Preprocessing', text: 'Categorical features are encoded and numeric features are scaled using the same pipeline as training.' },
    { icon: Cpu, title: 'Random Forest Regression', text: 'The trained model takes processed inputs and produces an annual carbon emission estimate.' },
    { icon: BarChart3, title: 'Carbon Footprint Prediction', text: 'The output is an annual estimate in kg CO₂, presented with context and visual breakdown.' },
    { icon: Sparkles, title: 'Personalized Recommendations', text: 'A rule based engine evaluates the answers and suggests practical next steps.' },
  ];

  return (
    <div className="about-page">
      <div className="page-intro">
        <div className="eyebrow">About EcoPredict</div>
        <h1>Numbers are more useful<br />when they lead to <em>action.</em></h1>
        <p>EcoPredict is a final year data science project that makes personal carbon data feel more human, understandable and actionable.</p>
      </div>

      <div className="about-grid">
        <div className="about-block">
          <div className="about-block-icon"><Leaf size={20} /></div>
          <h3>The problem</h3>
          <p>Individual carbon emissions are shaped by everyday choices, but most people never see a clear picture of their own footprint. Without that picture, change is hard to prioritise.</p>
        </div>
        <div className="about-block">
          <div className="about-block-icon"><Sprout size={20} /></div>
          <h3>Why it matters</h3>
          <p>Understanding which lifestyle areas contribute most to emissions helps people make informed, realistic adjustments rather than guessing where to start.</p>
        </div>
        <div className="about-block">
          <div className="about-block-icon"><Sparkles size={20} /></div>
          <h3>Our purpose</h3>
          <p>EcoPredict brings together a trained machine learning model, real dataset analysis and a supportive recommendation layer into one approachable tool.</p>
        </div>
      </div>

      <section className="methodology-section">
        <div className="eyebrow centered">How it works</div>
        <h2 className="centered">From lifestyle inputs to<br /><em>personal suggestions.</em></h2>
        <div className="method-flow">
          {methodology.map(({ icon: Icon, title, text }, i) => (
            <div className="method-step" key={title}>
              <div className="method-step-icon"><Icon size={22} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
              {i < methodology.length - 1 && <div className="method-arrow"><ArrowRight size={18} /></div>}
            </div>
          ))}
        </div>
      </section>

      <section className="about-tech">
        <div className="eyebrow centered">Technologies used</div>
        <h2 className="centered">Built with familiar, <em>open tools.</em></h2>
        <div className="tech-grid">
          {[
            { icon: Database, name: 'Carbon Emission dataset', desc: '10,000 lifestyle records used for training and evaluation' },
            { icon: Cpu, name: 'Random Forest', desc: 'Best performing model with R² of 0.9095' },
            { icon: Code2, name: 'React and Vite', desc: 'Frontend application with TypeScript' },
            { icon: GitBranch, name: 'Python and Flask', desc: 'Backend API for model serving (pending connection)' },
          ].map(({ icon: Icon, name, desc }) => (
            <div className="tech-card" key={name}>
              <Icon size={20} />
              <h3>{name}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-cta">
        <h2>Ready to see your footprint?</h2>
        <Link to="/calculator" className="btn-primary">Calculate my footprint <ArrowRight size={16} /></Link>
      </section>
    </div>
  );
}
