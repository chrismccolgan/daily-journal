import React, { useContext, useEffect } from 'react';
import { EntryContext } from './EntryProvider';
import Entry from './Entry';
import EntrySearch from './EntrySearch';
import Notification from '../UI/Notification';
import LoadingSpinner from '../UI/LoadingSpinner';

const EntryList = () => {
  const { getAllEntries, entryState } = useContext(EntryContext);

  useEffect(() => {
    getAllEntries();
    // eslint-disable-next-line
  }, []);

  if (!entryState.status || entryState.status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  console.log(entryState);
  return (
    <>
      {entryState.error && <Notification error={entryState.error} />}
      <EntrySearch />
      {entryState.data &&
        entryState.data.map((entry) => <Entry key={entry.id} entry={entry} />)}
    </>
  );
};

export default EntryList;
