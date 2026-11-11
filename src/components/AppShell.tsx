import { Outlet, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard, Calculator as CalcIcon, Sparkles, BarChart3,
  Home as HomeIcon, Leaf, Menu, X, ArrowRight,
} from 'lucide-react';

const navItems = [
  { to: '/results', label: 'Overview', icon: LayoutDashboard },
  { to: '/calculator', label: 'Calculate Footprint', icon: CalcIcon },
  { to: '/recommendations', label: 'Recommendations', icon: Sparkles },
  { to: '/insights', label: 'Insights', icon: BarChart3 },
];

export function AppShell({ mobileNavOpen, setMobileNavOpen }: { mobileNavOpen: boolean; setMobileNavOpen: (open: boolean) => void }) {
  const location = useLocation();
  return (
    <div className="app-layout">
      <aside className={mobileNavOpen ? 'sidebar open' : 'sidebar'}>
        <Link to="/" className="sidebar-brand" onClick={() => setMobileNavOpen(false)}>
          <span className="brand-mark"><Leaf size={17} /></span>
          <span>Eco<span>Predict</span></span>
        </Link>
        <nav className="sidebar-nav">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={location.pathname === to ? 'sidebar-link active' : 'sidebar-link'}
              onClick={() => setMobileNavOpen(false)}
            >
              <Icon size={17} /> {label}
            </Link>
          ))}
        </nav>
        <Link to="/" className="sidebar-home">
          <HomeIcon size={15} /> Back to Home
        </Link>
      </aside>
      <div className="app-main">
        <header className="app-topbar">
          <button className="sidebar-toggle" onClick={() => setMobileNavOpen(!mobileNavOpen)} aria-label="Toggle navigation">
            {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="topbar-title">
            {navItems.find((item) => item.to === location.pathname)?.label || 'EcoPredict'}
          </div>
          <Link to="/calculator" className="topbar-cta">
            New calculation <ArrowRight size={14} />
          </Link>
        </header>
        <div className="app-content" onClick={() => mobileNavOpen && setMobileNavOpen(false)}>
          <Outlet />
        </div>
      </div>
      {mobileNavOpen && <div className="sidebar-overlay" onClick={() => setMobileNavOpen(false)} />}
    </div>
  );
}
