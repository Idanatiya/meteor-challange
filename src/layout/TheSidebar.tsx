import logo from '@/assets/app-logo.png';

import './TheSidebar.scoped.scss';

function TheSidebar() {
  return (
    <section className="root-container">
      <div className="logo-container">
        <img src={logo} className="app-logo" alt="placer-logo" />
      </div>
      <div className="space" />
      <div className="avatar">
        <span>IA</span>
      </div>
    </section>
  );
}

export default TheSidebar;
