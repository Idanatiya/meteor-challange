import React from 'react';
import { toast } from 'react-toastify';

import groupBy from 'lodash/groupBy';

import MeteorItem from '@/components/MeteorItem';
import MeteorsNotFound from '@/components/MeteorsNotFound';

import './MeteorList.scoped.scss';
import { METEOR_NOT_FOUND_MESSAGE, ONLY_NUMBER_ALLOWED_MESSAGE } from '@/constants';
import { Meteor } from '@/types';
import { isNumber } from '@/utils';

interface Props {
  meteors: Record<string, Meteor>;
  selectedMeteorYear: number;
  setMeteorYear: (year: number) => void;
}

function MeteorList({ meteors, selectedMeteorYear, setMeteorYear }: Props) {
  const [currMeteorMass, setMass] = React.useState('');

  const meteorsByYear: Record<string, Meteor[]> = React.useMemo(() => {
    return groupBy(meteors, 'year');
  }, [meteors]);

  const filteredMeteorsMass = React.useMemo(() => {
    if (!currMeteorMass) return meteorsByYear[selectedMeteorYear] ?? [];

    const largerMassMeteors = meteorsByYear[selectedMeteorYear].filter(
      (meteor) => meteor.mass > +currMeteorMass
    );
    if (largerMassMeteors.length > 0) {
      return largerMassMeteors;
    }
    const accpetedCriteriaMeteor = Object.values(meteors).find(
      (meteor) => meteor.mass > +currMeteorMass
    );
    if (!accpetedCriteriaMeteor) {
      return [];
    }
    toast.success(METEOR_NOT_FOUND_MESSAGE, {
      toastId: 'success',
    });
    return [accpetedCriteriaMeteor];
  }, [currMeteorMass, meteors, meteorsByYear, selectedMeteorYear]);

  React.useEffect(() => {
    if (filteredMeteorsMass.length > 0) {
      setMeteorYear(filteredMeteorsMass[0].year);
    }
  }, [filteredMeteorsMass, setMeteorYear]);

  const onHandleMassChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const inputMass = ev.target.value.trim();
    const isValid = isNumber(inputMass);
    if (!isValid && inputMass) {
      toast.error(ONLY_NUMBER_ALLOWED_MESSAGE);
      return;
    }
    setMass(ev.target.value);
  };

  return (
    <>
      <input
        className="mass-input"
        placeholder="Search By Mass"
        value={currMeteorMass}
        onChange={onHandleMassChange}
        autoFocus
      />
      <p className="meteor-amount">
        ({filteredMeteorsMass.length}) Meteors Found That matches the criteria
      </p>
      {filteredMeteorsMass.length > 0 ? (
        <ul className="meteor-grid-container">
          {filteredMeteorsMass.map((m) => (
            <MeteorItem key={m.id} meteor={m} />
          ))}
        </ul>
      ) : (
        <MeteorsNotFound />
      )}
    </>
  );
}

export default MeteorList;
