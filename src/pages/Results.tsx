import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, RefreshCw, Pencil, Trash2, CircleHelp, TrainFront, Sprout, Zap, ShoppingBasket, Leaf,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, RadialBarChart, RadialBar, PolarAngleAxis,
} from 'recharts';
import { Result, loadResult, clearResult, display } from '@/lib/ecopredict';

export function Results() {
  const navigate = useNavigate();
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => { setResult(loadResult()); window.scrollTo(0, 0); }, []);

  if (!result) {
    return (
      <div className="empty-page">
        <div className="empty-icon"><Leaf size={28} /></div>
        <h2>Your footprint will appear here.</h2>
        <p>Complete the short questionnaire to see a personal estimate and useful next steps.</p>
        <Link to="/calculator" className="btn-primary">Calculate my footprint <ArrowRight size={16} /></Link>
      </div>
    );
  }

  const tonnes = (result.footprint / 1000).toFixed(1);
  const category = result.footprint < 3000 ? 'Lower range' : result.footprint < 6000 ? 'Middle range' : 'Higher range';
  const gaugePct = Math.min(100, Math.round(result.footprint / 90));
  const gaugeData = [{ name: 'footprint', value: gaugePct, fill: '#426e56' }];
  const a = result.answers;

  const categoryData = [
    { name: 'Transport', score: a.transport === 'private' ? 85 : a.transport === 'public' ? 45 : 20 },
    { name: 'Air travel', score: ({ never: 10, rarely: 30, occasionally: 55, frequently: 80, 'very frequently': 95 }[a.airTravel] ?? 30) },
    { name: 'Diet', score: ({ vegan: 25, vegetarian: 40, pescatarian: 55, omnivore: 70 }[a.diet] ?? 50) },
    { name: 'Energy', score: a.efficiency === 'Yes' ? 30 : a.efficiency === 'Sometimes' ? 55 : 75 },
    { name: 'Waste', score: a.recycling === '[]' ? 70 : 40 },
  ];

  const summaryCards = [
    { icon: TrainFront, label: 'Transportation', value: display(a.transport), detail: `${a.vehicleKm} km / month` },
    { icon: Sprout, label: 'Food habits', value: display(a.diet), detail: `${a.groceries} grocery spend` },
    { icon: Zap, label: 'Home energy', value: display(a.heating), detail: `Efficiency: ${display(a.efficiency)}` },
    { icon: ShoppingBasket, label: 'Consumption and waste', value: `${a.clothes} new items / month`, detail: `${a.wasteCount} waste bags / week` },
  ];

  return (
    <div className="results-page">
      <div className="results-header">
        <div>
          <div className="eyebrow">Your footprint, understood.</div>
          <h1>My <em>results.</em></h1>
          <div className="result-meta">
            <span className="status-pill"><span /> Demo model preview</span>
            <span className="result-date">Last calculated {new Date(result.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="results-header-actions">
          <Link to="/recommendations" className="btn-cream">View recommendations <ArrowRight size={16} /></Link>
          <button className="btn-outline" onClick={() => navigate('/calculator')}><RefreshCw size={15} /> Recalculate</button>
        </div>
      </div>

      <div className="results-grid">
        <div className="score-card">
          <div className="score-label">Estimated annual footprint <CircleHelp size={15} /></div>
          <div className="score-value">{result.footprint.toLocaleString()}</div>
          <div className="score-unit">kg CO₂ / year</div>
          <div className="score-tonnes"><b>{tonnes}</b> tonnes CO₂</div>
          <div className="score-category">{category}</div>
          <div className="score-gauge">
            <ResponsiveContainer width="100%" height={140}>
              <RadialBarChart innerRadius="68%" outerRadius="100%" data={gaugeData} startAngle={210} endAngle={-30}>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar background={{ fill: '#2c5946' }} dataKey="value" cornerRadius={8} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <p className="score-note">Educational preview based on your answers. Not a live Random Forest prediction until model files are connected.</p>
        </div>

        <div className="score-side">
          <div className="chart-card">
            <div className="chart-head"><h3>Lifestyle category overview</h3><span>Relative influence from your answers</span></div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={categoryData} layout="vertical" margin={{ left: 20, right: 20, top: 5, bottom: 5 }}>
                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#8a988c', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#4a5e51', fontSize: 11 }} axisLine={false} tickLine={false} width={72} />
                <Tooltip cursor={{ fill: '#f0f4eb' }} contentStyle={{ borderRadius: 8, border: '1px solid #dfe6d8', fontSize: 12 }} />
                <Bar dataKey="score" fill="#73966f" radius={[0, 5, 5, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="score-actions-row">
            <button className="btn-outline small" onClick={() => navigate('/calculator')}><Pencil size={14} /> Edit answers</button>
            <button className="btn-outline small danger" onClick={() => { clearResult(); setResult(null); }}><Trash2 size={14} /> Clear result</button>
          </div>
        </div>
      </div>

      <div className="summary-grid">
        {summaryCards.map(({ icon: Icon, label, value, detail }) => (
          <article className="summary-card" key={label}>
            <div className="summary-icon"><Icon size={18} /></div>
            <small>{label}</small>
            <strong>{value}</strong>
            <span>{detail}</span>
          </article>
        ))}
      </div>

      <div className="results-explanation">
        <div className="explanation-icon"><Sprout size={20} /></div>
        <div>
          <h3>What this means for you</h3>
          <p>Your estimated annual footprint is a starting point for understanding how your everyday choices affect the environment. The categories above reflect associations in the project data, not exact causal contributions to your individual result.</p>
        </div>
      </div>
    </div>
  );
}
