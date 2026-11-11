import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Check, RefreshCw, CircleHelp, Leaf } from 'lucide-react';
import {
  Answers, Result, initialAnswers, steps, options, labelMap, display, calculateDemo, saveResult,
} from '@/lib/ecopredict';

export function Calculator() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [review, setReview] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const setValue = (field: keyof Answers, value: string | number) => setAnswers((c) => ({ ...c, [field]: value }));
  const stepComplete = useMemo(() => steps[step].fields.every((field) => {
    const value = answers[field as keyof Answers];
    return value !== '' && value !== undefined && value !== null;
  }), [answers, step]);

  const submit = (event?: FormEvent) => {
    event?.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      const result: Result = { footprint: calculateDemo(answers), answers, createdAt: new Date().toISOString() };
      saveResult(result);
      setSubmitting(false);
      navigate('/results');
    }, 650);
  };

  return (
    <div className="calculator-page">
      <div className="page-intro">
        <div className="eyebrow">Your personal check in</div>
        <h1>Let's understand your<br /><em>everyday footprint.</em></h1>
        <p>A few details about your lifestyle can help us build a clearer picture of your environmental impact.</p>
      </div>

      <div className="calculator-card">
        <div className="progress-track">
          {steps.map((item, index) => (
            <div className={index <= step ? 'progress-step done' : 'progress-step'} key={item.title}>
              <span className="progress-circle">{index < step ? <Check size={13} /> : index + 1}</span>
              <label>{item.title}</label>
            </div>
          ))}
        </div>

        {review ? (
          <div className="review-section">
            <div className="review-head">
              <div><div className="eyebrow">One last look</div><h3>Does this feel right?</h3></div>
              <button className="btn-ghost small" onClick={() => setReview(false)}>Edit answers</button>
            </div>
            <div className="review-grid">
              {Object.entries(answers).map(([key, value]) => (
                <div key={key}><small>{labelMap[key]}</small><strong>{display(value || 'Not provided')}</strong></div>
              ))}
            </div>
            <div className="form-actions">
              <button className="btn-back" onClick={() => setReview(false)}><ChevronLeft size={17} /> Go back</button>
              <button className="btn-primary" onClick={submit} disabled={submitting}>
                {submitting ? <><RefreshCw className="spin" size={16} /> Preparing your results</> : <>Show my results <ArrowRight size={17} /></>}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={(event) => { event.preventDefault(); if (step < steps.length - 1) setStep(step + 1); else setReview(true); }}>
            <div className="question-grid">
              {steps[step].fields.map((field) => <Question key={field} field={field} value={answers[field as keyof Answers]} onChange={setValue} />)}
            </div>
            <div className="form-actions">
              {step > 0 ? <button type="button" className="btn-back" onClick={() => setStep(step - 1)}><ChevronLeft size={17} /> Previous</button> : <span />}
              {step < steps.length - 1
                ? <button className="btn-primary" disabled={!stepComplete}>Continue <ChevronRight size={17} /></button>
                : <button className="btn-primary" disabled={!stepComplete}>Review answers <ChevronRight size={17} /></button>}
            </div>
          </form>
        )}
      </div>

      <p className="demo-notice"><CircleHelp size={15} /> Model status: <b>Demo mode</b>. The trained model files are not present yet, so this preview is clearly separated from a real ML prediction.</p>

      <div className="calc-illustration"><Leaf size={120} strokeWidth={0.8} /></div>
    </div>
  );
}

function Question({ field, value, onChange }: { field: string; value: string | number; onChange: (field: keyof Answers, value: string | number) => void }) {
  const numericFields = ['groceries', 'vehicleKm', 'wasteCount', 'screenHours', 'clothes', 'internetHours'];
  const placeholder: Record<string, string> = { groceries: 'e.g. 250', vehicleKm: 'e.g. 400', wasteCount: 'e.g. 2', screenHours: 'hours', clothes: 'items', internetHours: 'hours' };
  const unit: Record<string, string> = { groceries: 'per month', vehicleKm: 'km / month', screenHours: 'hours / day', internetHours: 'hours / day', wasteCount: 'bags / week', clothes: 'per month' };
  return (
    <label className="question">
      <span>{labelMap[field]} <b>*</b></span>
      {numericFields.includes(field) ? (
        <div className="input-with-unit">
          <input required type="number" min="0" max={field === 'vehicleKm' ? 10000 : 1000} value={value || ''} placeholder={placeholder[field]} onChange={(e) => onChange(field as keyof Answers, Number(e.target.value))} />
          <small>{unit[field]}</small>
        </div>
      ) : (
        <select required value={value} onChange={(e) => onChange(field as keyof Answers, e.target.value)}>
          <option value="">Select one</option>
          {(options[field] ?? []).map((o) => <option key={o} value={o}>{display(o)}</option>)}
        </select>
      )}
    </label>
  );
}
