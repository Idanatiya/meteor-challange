import * as React from 'react';
import { toast } from 'react-toastify';

import Autocomplete from '@/components/Autocomplete';
import MeteorList from '@/components/MeteorList';
import MeteorsNotFound from '@/components/MeteorsNotFound';

import './MeteorPage.scoped.scss';
import { fetchMeteors } from '@/api';
import { Meteor } from '@/types';
import { formateDate, isNumber } from '@/utils';

function MeteorPage() {
  const [meteors, setMeteors] = React.useState<Meteor[]>([]);
  const [meteorsLanded, setMeteorsLanded] = React.useState<Meteor[]>([]);
  const [year, setYear] = React.useState('');
  const [mass, setMass] = React.useState('');

  React.useEffect(() => {
    fetchMeteors().then((meteorsData) => setMeteors(meteorsData));
  }, []);

  const meteorYearsOptions = React.useMemo(() => {
    const meteorYears: string[] = [];
    const yearsSeen: Record<string, number> = {};
    meteors.forEach((m) => {
      const currMeteorYear = formateDate(m.year);
      if (!Number.isNaN(currMeteorYear) && !yearsSeen[currMeteorYear]) {
        yearsSeen[currMeteorYear] = 1;
        meteorYears.push(`${currMeteorYear}`);
      }
    });
    return meteorYears;
  }, [meteors]);

  const filterMeteorsByMass = React.useCallback(() => {
    return meteorsLanded.filter((m) => +m.mass > +mass);
  }, [mass, meteorsLanded]);

  const meteorWithAcceptedCriteria = React.useCallback(() => {
    const foundMeteorMass = meteors.find((m) => +m.mass === +mass);
    if (!foundMeteorMass) {
      return [];
    }
    const foundMeteorYear = foundMeteorMass ? `${formateDate(foundMeteorMass?.year)}` : '';
    setYear(foundMeteorYear);
    toast.success(
      `the mass was not found, jumping to ${foundMeteorYear} where there is a mass that fits the criteria`,
      {
        toastId: 'success',
      }
    );

    return [foundMeteorMass];
  }, [mass, meteors]);

  const filteredMeteors = React.useMemo(() => {
    if (!mass) return meteorsLanded;
    const massMeteors = filterMeteorsByMass();
    if (massMeteors.length) {
      return massMeteors;
    }
    return meteorWithAcceptedCriteria();
  }, [filterMeteorsByMass, mass, meteorWithAcceptedCriteria, meteorsLanded]);

  const onHandleOptionSelect = (yearSelected: string) => {
    toast(`${yearSelected} has been selected!`);
    const landedMeteors = meteors
      .filter((meteor) => {
        const currMeteorYear = formateDate(meteor.year);
        return currMeteorYear === +yearSelected;
      })
      .sort((meteorA, meteorB) => +meteorA.mass - +meteorB.mass);

    setMeteorsLanded(landedMeteors);
  };

  const onHandleMassChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const massValue = ev.target.value.trim();
    const isValid = isNumber(massValue);
    if (!isValid && massValue) {
      toast.error('Only Numbers allowed, Try again!');
      return;
    }
    setMass(massValue);
  };

  return (
    <div className="container">
      <Autocomplete
        setValue={setYear}
        value={year}
        options={meteorYearsOptions}
        onHandleSelect={onHandleOptionSelect}
      />
      <section className="main-content">
        {meteorsLanded.length > 0 && (
          <>
            <input
              className="mass-input"
              placeholder="Search By Mass"
              value={mass}
              autoFocus
              onChange={onHandleMassChange}
            />
            <MeteorList meteors={filteredMeteors} />
            {!filteredMeteors.length && <MeteorsNotFound />}
          </>
        )}
      </section>
    </div>
  );
}

export default MeteorPage;
