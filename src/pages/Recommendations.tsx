import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Sparkles, TrainFront, Plane, Sprout, Recycle, Shirt, Zap, Flame, Leaf, Check,
} from 'lucide-react';
import { Result, Recommendation, loadResult, generateRecommendations, loadRecProgress, saveRecProgress } from '@/lib/ecopredict';

const iconMap: Record<string, typeof TrainFront> = {
  train: TrainFront, plane: Plane, sprout: Sprout, recycle: Recycle, shirt: Shirt, zap: Zap, flame: Flame,
};

const categories = ['All', 'Transportation', 'Food and Shopping', 'Home Energy', 'Air Travel', 'Waste and Recycling'];
const statusColors: Record<string, string> = { 'To Try': 'to-try', 'Working On It': 'working', Completed: 'completed' };

export function Recommendations() {
  const [result, setResult] = useState<Result | null>(null);
  const [filter, setFilter] = useState('All');
  const [progress, setProgress] = useState<Record<string, string>>({});

  useEffect(() => { setResult(loadResult()); setProgress(loadRecProgress()); window.scrollTo(0, 0); }, []);

  const recs = useMemo(() => result ? generateRecommendations(result.answers) : [], [result]);
  const filtered = filter === 'All' ? recs : recs.filter((r) => r.category === filter);
  const completed = recs.filter((r) => progress[r.id] === 'Completed').length;

  const setStatus = (id: string, status: string) => {
    const next = { ...progress, [id]: status };
    setProgress(next);
    saveRecProgress(next);
  };

  if (!result) {
    return (
      <div className="empty-page">
        <div className="empty-icon"><Sparkles size={28} /></div>
        <h2>Your recommendations will be personal.</h2>
        <p>Complete the calculator first and we will connect suggestions to your everyday choices.</p>
        <Link to="/calculator" className="btn-primary">Start the questionnaire <ArrowRight size={16} /></Link>
      </div>
    );
  }

  return (
    <div className="rec-page">
      <div className="page-intro">
        <div className="eyebrow">Personal guidance</div>
        <h1>Small changes.<br /><em>Meaningful progress.</em></h1>
        <p>Your recommendations are based on the lifestyle information you shared. Start with the changes that make the most sense for your everyday routine.</p>
      </div>

      <div className="rec-progress-bar">
        <div className="rec-progress-info">
          <Sparkles size={16} />
          <span>Your progress: <b>{completed}</b> of {recs.length} completed</span>
        </div>
        <div className="rec-progress-track"><div style={{ width: `${recs.length ? (completed / recs.length) * 100 : 0}%` }} /></div>
      </div>

      <div className="rec-filters">
        {categories.map((cat) => (
          <button key={cat} className={filter === cat ? 'rec-filter active' : 'rec-filter'} onClick={() => setFilter(cat)}>{cat}</button>
        ))}
      </div>

      <div className="rec-grid">
        {filtered.length ? filtered.map((rec: Recommendation) => {
          const Icon = iconMap[rec.icon] || Leaf;
          const status = progress[rec.id] || 'To Try';
          return (
            <article className={statusColors[status] ? `rec-card ${statusColors[status]}` : 'rec-card'} key={rec.id}>
              <div className="rec-card-head">
                <div className="rec-icon"><Icon size={19} /></div>
                <div className="rec-category">{rec.category}<span>{rec.priority}</span></div>
              </div>
              <h3>{rec.title}</h3>
              <p>{rec.text}</p>
              <div className="rec-action"><Check size={15} /> {rec.action}</div>
              <div className="rec-status-row">
                {(['To Try', 'Working On It', 'Completed'] as const).map((s) => (
                  <button key={s} className={status === s ? `status-btn active ${statusColors[s]}` : 'status-btn'} onClick={() => setStatus(rec.id, s)}>
                    {status === s && <Check size={12} />} {s}
                  </button>
                ))}
              </div>
            </article>
          );
        }) : (
          <div className="rec-empty-filter">
            <Leaf size={24} />
            <p>No recommendations in this category for your answers.</p>
          </div>
        )}
      </div>
    </div>
  );
}
