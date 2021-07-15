import React, { useContext, useEffect } from 'react';
import { EntryContext } from './EntryProvider';
import Entry from './Entry';
import EntrySearch from './EntrySearch';
import Notification from '../UI/Notification';
import LoadingSpinner from '../UI/LoadingSpinner';
import useHttp from '../../hooks/useHttp';

const EntryList = () => {
  // const { getAllEntries, entryState } = useContext(EntryContext);
  const { getAllEntries, data, error, status } = useHttp(true);

  useEffect(() => {
    getAllEntries();
    // eslint-disable-next-line
  }, []);

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      {error && <Notification error={error} />}
      <EntrySearch />
      {data && data.map((entry) => <Entry key={entry.id} entry={entry} />)}
    </>
  );
};

export default EntryList;
