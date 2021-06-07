import React, { useContext, useEffect } from 'react';
import { EntryContext } from './EntryProvider';
import Entry from './Entry';
import EntrySearch from './EntrySearch';
import Notification from '../UI/Notification';

const EntryList = () => {
  const { entries, getAllEntries, notification } = useContext(EntryContext);

  useEffect(() => {
    getAllEntries();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {notification && <Notification notification={notification} />}
      <EntrySearch />
      {entries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </>
  );
};

export default EntryList;
