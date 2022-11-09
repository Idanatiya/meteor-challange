import * as React from 'react';
import { toast } from 'react-toastify';

import Autocomplete from '@/components/Autocomplete';
import MeteorList from '@/components/MeteorList';

import './MeteorPage.scoped.scss';
import { fetchMeteors } from '@/api';
import { Meteor, Option } from '@/types';

function MeteorPage() {
  const [meteors, setMeteors] = React.useState<Record<string, Meteor>>({});
  const [selectedMeteorYear, setMeteorYear] = React.useState<number | null>(null);

  React.useEffect(() => {
    fetchMeteors()
      .then(setMeteors)
      .catch(() => toast.error('Error fetching meteors'));
  }, []);

  const meteorYearsOptions = React.useMemo(() => {
    const yearsSet = new Set();
    const years = Object.entries(meteors).reduce((collection, currMeteor) => {
      const [meteorId, meteor] = currMeteor;
      const { year } = meteor;
      if (!yearsSet.has(year)) {
        collection.push({ key: meteorId, value: year });
        yearsSet.add(year);
      }
      return collection;
    }, [] as Option[]);

    return years.sort((optionA, optionB) => optionB.value - optionA.value);
  }, [meteors]);

  return (
    <div className="container">
      <Autocomplete
        options={meteorYearsOptions}
        onHandleSelect={setMeteorYear}
        selectedYear={selectedMeteorYear}
      />
      {!!selectedMeteorYear && (
        <MeteorList
          setMeteorYear={setMeteorYear}
          selectedMeteorYear={selectedMeteorYear}
          meteors={meteors}
        />
      )}
    </div>
  );
}

export default MeteorPage;
