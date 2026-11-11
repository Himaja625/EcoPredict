export type Answers = {
  bodyType: string; sex: string; diet: string; shower: string; heating: string; transport: string;
  vehicle: string; social: string; groceries: number; airTravel: string; vehicleKm: number;
  wasteSize: string; wasteCount: number; screenHours: number; clothes: number; internetHours: number;
  efficiency: string; recycling: string; cooking: string;
};

export type Result = { footprint: number; answers: Answers; createdAt: string };

export type Recommendation = {
  id: string; category: string; title: string; text: string; action: string; priority: string; icon: string;
};

export const initialAnswers: Answers = {
  bodyType: '', sex: '', diet: '', shower: '', heating: '', transport: '', vehicle: '', social: '', groceries: 0,
  airTravel: '', vehicleKm: 0, wasteSize: '', wasteCount: 0, screenHours: 0, clothes: 0, internetHours: 0,
  efficiency: '', recycling: '', cooking: '',
};

export const steps = [
  { title: 'About you', fields: ['bodyType', 'sex', 'diet', 'social'] },
  { title: 'Getting around', fields: ['transport', 'vehicle', 'vehicleKm', 'airTravel'] },
  { title: 'Home and habits', fields: ['shower', 'heating', 'efficiency', 'cooking', 'screenHours', 'internetHours'] },
  { title: 'Everyday choices', fields: ['groceries', 'wasteSize', 'wasteCount', 'clothes', 'recycling'] },
];

export const options: Record<string, string[]> = {
  bodyType: ['underweight', 'normal', 'overweight', 'obese'], sex: ['male', 'female'],
  diet: ['vegan', 'vegetarian', 'pescatarian', 'omnivore'], social: ['never', 'sometimes', 'often', 'very often'],
  transport: ['public', 'private', 'walk/bicycle'], vehicle: ['none', 'petrol', 'diesel', 'hybrid', 'electric', 'lpg'],
  airTravel: ['never', 'rarely', 'occasionally', 'frequently', 'very frequently'],
  shower: ['daily', 'less frequently', 'more frequently', 'twice a day'],
  heating: ['natural gas', 'electricity', 'wood', 'coal', 'none'], wasteSize: ['small', 'medium', 'large', 'extra large'],
  efficiency: ['No', 'Sometimes', 'Yes'],
  recycling: ['[]', "['Paper']", "['Plastic']", "['Glass']", "['Metal']", "['Paper', 'Plastic', 'Glass', 'Metal']"],
  cooking: ['Stove', 'Oven', 'Microwave', 'Grill', 'Airfryer'],
};

export const labelMap: Record<string, string> = {
  bodyType: 'Body type', sex: 'Sex', diet: 'How do you eat?', social: 'Social activity', transport: 'Main transport', vehicle: 'Vehicle type',
  vehicleKm: 'Vehicle distance each month', airTravel: 'Air travel frequency', shower: 'How often do you shower?', heating: 'Heating energy source',
  efficiency: 'Energy efficient appliances', cooking: 'Cooking_With', screenHours: 'TV and computer hours each day', internetHours: 'Internet hours each day',
  groceries: 'Monthly grocery spend', wasteSize: 'Weekly waste bag size', wasteCount: 'Waste bags each week', clothes: 'New clothes each month', recycling: 'What do you recycle?',
};

export function display(value: string | number) { return String(value).replace(/\b\w/g, (letter) => letter.toUpperCase()); }

export function calculateDemo(answers: Answers) {
  let score = 2850;
  if (answers.transport === 'private') score += 900;
  if (answers.transport === 'public') score -= 360;
  if (answers.transport === 'walk/bicycle') score -= 520;
  score += answers.vehicleKm * 1.35;
  score += ({ never: 0, rarely: 180, occasionally: 480, frequently: 950, 'very frequently': 1500 }[answers.airTravel] ?? 0);
  score += answers.groceries * 2.2 + answers.clothes * 38 + answers.wasteCount * 95;
  if (answers.diet === 'vegan') score -= 420;
  if (answers.diet === 'vegetarian') score -= 240;
  if (answers.efficiency === 'Yes') score -= 240;
  if (answers.recycling.includes('Paper') || answers.recycling.includes('Plastic')) score -= 180;
  return Math.max(950, Math.round(score));
}

export function generateRecommendations(answers: Answers): Recommendation[] {
  const recs: Recommendation[] = [];
  if (answers.transport === 'private' || answers.vehicleKm > 600)
    recs.push({ id: 'transport-trips', category: 'Transportation', title: 'Make a few trips lighter', text: 'Private transport and longer monthly distances stand out in your answers.', action: 'Try combining errands, carpooling, or public transport for one regular journey.', priority: 'High priority', icon: 'train' });
  if (['frequently', 'very frequently'].includes(answers.airTravel))
    recs.push({ id: 'air-travel', category: 'Air Travel', title: 'Keep shorter journeys on the ground', text: 'Frequent flying can be a meaningful part of a personal footprint.', action: 'For shorter routes, compare rail or shared ground travel before booking.', priority: 'High priority', icon: 'plane' });
  if (answers.diet === 'omnivore')
    recs.push({ id: 'diet', category: 'Food and Shopping', title: 'Add one plant based meal', text: 'You do not have to change everything at once to explore a different rhythm.', action: 'Choose one familiar meal to make plant based this week.', priority: 'A gentle start', icon: 'sprout' });
  if (answers.recycling === '[]')
    recs.push({ id: 'waste', category: 'Waste and Recycling', title: 'Make sorting easier', text: 'Your answers suggest recycling is not part of your routine right now.', action: 'Start with one separate container for paper, plastic or glass.', priority: 'Easy win', icon: 'recycle' });
  if (answers.clothes > 4)
    recs.push({ id: 'shopping', category: 'Food and Shopping', title: 'Give clothes a longer life', text: 'Frequent new purchases are one place where a small pause can help.', action: 'Try repairing, rewearing or buying second hand for your next item.', priority: 'Worth trying', icon: 'shirt' });
  if (answers.efficiency !== 'Yes')
    recs.push({ id: 'energy', category: 'Home Energy', title: 'Look for efficient upgrades', text: 'Your appliances may not be running as efficiently as they could.', action: 'Consider LED bulbs and energy rated devices when it is time to replace one.', priority: 'Worth trying', icon: 'zap' });
  if (answers.heating === 'coal')
    recs.push({ id: 'heating', category: 'Home Energy', title: 'Rethink your heating source', text: 'Coal based heating tends to be among the more carbon intensive options.', action: 'Explore whether a cleaner energy tariff or electric heating is practical for you.', priority: 'High priority', icon: 'flame' });
  return recs;
}

export function loadResult(): Result | null {
  const saved = localStorage.getItem('ecopredict-latest');
  if (saved) { try { return JSON.parse(saved) as Result; } catch { return null; } }
  return null;
}

export function saveResult(result: Result) { localStorage.setItem('ecopredict-latest', JSON.stringify(result)); }
export function clearResult() { localStorage.removeItem('ecopredict-latest'); }

export function loadRecProgress(): Record<string, string> {
  const saved = localStorage.getItem('ecopredict-rec-progress');
  if (saved) { try { return JSON.parse(saved) as Record<string, string>; } catch { return {}; } }
  return {};
}
export function saveRecProgress(progress: Record<string, string>) { localStorage.setItem('ecopredict-rec-progress', JSON.stringify(progress)); }
