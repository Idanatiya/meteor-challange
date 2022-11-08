import { Meteor } from '@/types/index';

import './MeteorItem.scoped.scss';
import { formateDate } from '@/utils';

interface Props {
  meteor: Meteor;
}

function MeteorItem({ meteor }: Props) {
  const { id, name, mass, geolocation, year } = meteor;
  const [xCoordinate, yCoordinate] = geolocation.coordinates;
  const fallenYear = formateDate(year);
  return (
    <div className="meteor-item">
      <p className="meteor-name">
        #{id} - {name}
      </p>
      <p>Fallen in {fallenYear}</p>
      <p>
        Mass: <span className="meteor-mass">{mass || 'No Mass'}</span>
      </p>
      <p>
        Coordinates: {xCoordinate.toFixed(4)},{yCoordinate.toFixed(4)}{' '}
      </p>
    </div>
  );
}

export default MeteorItem;
