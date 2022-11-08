import meteor from '@/assets/meteor.png';

import './MeteorsNotFound.scoped.scss';

function MeteorsNotFound() {
  return (
    <div className="container">
      <img src={meteor} alt="meteor-logo" />
      There are no no meteors found!, Try different query
    </div>
  );
}

export default MeteorsNotFound;
