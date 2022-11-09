import { Meteor } from '@/types/index';

import './MeteorItem.scoped.scss';

interface Props {
  meteor: Meteor;
}

function MeteorItem({ meteor }: Props) {
  const { id, name, mass, year } = meteor;
  return (
    <div className="meteor-item">
      <p className="meteor-name">
        #{id} - {name}
      </p>
      <p>Fallen in {year}</p>
      <p>
        Mass: <span className="meteor-mass">{mass}</span>
      </p>
      <div>
        Coordinates:
        {meteor?.geolocation?.coordinates ? (
          meteor.geolocation.coordinates.map((coordinate) => (
            <span className="coordinate" key={coordinate}>
              {coordinate}
            </span>
          ))
        ) : (
          <p>No Coordinates</p>
        )}
      </div>
    </div>
  );
}

export default MeteorItem;
