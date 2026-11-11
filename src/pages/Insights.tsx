import { useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Cell,
} from 'recharts';
import { BarChart3, TrendingDown, Cloud, Leaf } from 'lucide-react';

const modelComparison = [
  { model: 'Linear Regression', r2: 0.597019, rmse: 514 },
  { model: 'Decision Tree', r2: 0.784311, rmse: 374 },
  { model: 'Random Forest', r2: 0.909463, rmse: 306.81 },
];

const featureImportance = [
  { feature: 'Vehicle Monthly Distance', value: 0.42 },
  { feature: 'Frequency of Air Travel', value: 0.28 },
  { feature: 'Heating Energy Source', value: 0.12 },
  { feature: 'Monthly Grocery Bill', value: 0.07 },
  { feature: 'Diet', value: 0.05 },
  { feature: 'Transport', value: 0.04 },
  { feature: 'Waste Bag Count', value: 0.02 },
];

const histogramData = [
  { bin: '0-1k', count: 9 }, { bin: '1-2k', count: 18 }, { bin: '2-3k', count: 28 },
  { bin: '3-4k', count: 35 }, { bin: '4-5k', count: 30 }, { bin: '5-6k', count: 22 },
  { bin: '6-7k', count: 14 }, { bin: '7-8k', count: 8 }, { bin: '8k+', count: 5 },
];

export function Insights() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="insights-page">
      <div className="page-intro">
        <div className="eyebrow">The data science behind EcoPredict</div>
        <h1>Behind the <em>numbers.</em></h1>
        <p>Explore what our dataset reveals about everyday lifestyle patterns and carbon emissions.</p>
      </div>

      <div className="chart-placeholder-notice">
        <Cloud size={15} /> Some charts below use representative data based on the initial Colab analysis. When the full exported chart data is supplied, these will be replaced with exact values.
      </div>

      <div className="insights-grid">
        <div className="chart-card large">
          <div className="chart-head"><div><h3>Carbon emission distribution</h3><span>How the target variable is spread across the dataset</span></div><BarChart3 size={20} /></div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={histogramData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8ede5" vertical={false} />
              <XAxis dataKey="bin" tick={{ fill: '#8a988c', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8a988c', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: '#f0f4eb' }} contentStyle={{ borderRadius: 8, border: '1px solid #dfe6d8', fontSize: 12 }} />
              <Bar dataKey="count" fill="#73966f" radius={[4, 4, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
          <p className="chart-note">The distribution shows where most individuals fall in the dataset. Values represent approximate frequency from the initial analysis.</p>
        </div>

        <div className="chart-card large">
          <div className="chart-head"><div><h3>Model performance comparison</h3><span>R² and RMSE from the Colab experiment</span></div></div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={modelComparison} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8ede5" vertical={false} />
              <XAxis dataKey="model" tick={{ fill: '#4a5e51', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8a988c', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: '#f0f4eb' }} contentStyle={{ borderRadius: 8, border: '1px solid #dfe6d8', fontSize: 12 }} formatter={(value) => Number(value).toFixed(6)} />
              <Bar dataKey="r2" radius={[4, 4, 0, 0]} barSize={36}>
                {modelComparison.map((entry, i) => <Cell key={i} fill={i === 2 ? '#426e56' : '#9db992'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="chart-note">Random Forest achieved the highest R² score (0.909463) in our experiment, outperforming Linear Regression and Decision Tree models.</p>
        </div>

        <div className="chart-card large">
          <div className="chart-head"><div><h3>Random Forest feature importance</h3><span>Which features the model relied on most</span></div></div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={featureImportance} layout="vertical" margin={{ left: 30, right: 20, top: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8ede5" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#8a988c', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="feature" tick={{ fill: '#4a5e51', fontSize: 10 }} axisLine={false} tickLine={false} width={130} />
              <Tooltip cursor={{ fill: '#f0f4eb' }} contentStyle={{ borderRadius: 8, border: '1px solid #dfe6d8', fontSize: 12 }} />
              <Bar dataKey="value" fill="#668b68" radius={[0, 4, 4, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
          <p className="chart-note">Feature importance shows which inputs the model found most useful for prediction. It does not represent exact causal contributions to an individual's emissions.</p>
        </div>

        <div className="chart-card">
          <div className="chart-head"><div><h3>Transport vs emissions</h3><span>Median emission by transport type</span></div></div>
          <div className="placeholder-chart">
            <TrendingDown size={32} />
            <p>Boxplot data pending</p>
            <small>Initial analysis showed private transport with a higher median than public and walking or cycling.</small>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-head"><div><h3>Air travel vs emissions</h3><span>Median emission by frequency</span></div></div>
          <div className="placeholder-chart">
            <Cloud size={32} />
            <p>Boxplot data pending</p>
            <small>Very frequent air travel showed higher median emissions than other categories.</small>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-head"><div><h3>Diet vs emissions</h3><span>Overlapping distributions observed</span></div></div>
          <div className="placeholder-chart">
            <Leaf size={32} />
            <p>Boxplot data pending</p>
            <small>Diet groups showed overlapping distributions, so strong causal claims should be avoided.</small>
          </div>
        </div>
      </div>

      <section className="data-findings">
        <div className="eyebrow">What the data tells us</div>
        <h2>Observations from the<br /><em>initial analysis.</em></h2>
        <div className="findings-list">
          <div className="finding"><TrendingDown size={18} /><div><h3>Transport patterns</h3><p>Private transport showed a higher median emission than public transport and walking or cycling.</p></div></div>
          <div className="finding"><Cloud size={18} /><div><h3>Air travel patterns</h3><p>Very frequent air travel had a higher median emission than other air travel categories.</p></div></div>
          <div className="finding"><Leaf size={18} /><div><h3>Diet nuance</h3><p>Dietary categories showed overlapping distributions. Diet alone does not deterministically predict emissions.</p></div></div>
        </div>
        <p className="findings-disclaimer">These findings represent associations in the dataset, not proof of causation. The dataset contains 10,000 records, split into 8,000 for training and 2,000 for testing.</p>
      </section>
    </div>
  );
}
