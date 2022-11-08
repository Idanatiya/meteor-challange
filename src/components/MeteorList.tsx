import MeteorItem from '@/components/MeteorItem';

import './MeteorList.scoped.scss';
import { Meteor } from '@/types';

interface Props {
  meteors: Meteor[];
}

function MeteorList({ meteors }: Props) {
  return (
    <>
      <p className="meteor-amount">({meteors.length}) Meteors Found That matches the criteria</p>
      <ul className="meteor-grid-container">
        {meteors.map((meteor) => (
          <MeteorItem key={meteor.id} meteor={meteor} />
        ))}
      </ul>
    </>
  );
}

export default MeteorList;
