import React, { useContext, useEffect } from 'react';
import { EntryContext } from './EntryProvider';
import Entry from './Entry';
import EntrySearch from './EntrySearch';

const EntryList = () => {
  const { entries, getAllEntries } = useContext(EntryContext);

  useEffect(() => {
    getAllEntries();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <EntrySearch />
      {entries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </>
  );
};

export default EntryList;
