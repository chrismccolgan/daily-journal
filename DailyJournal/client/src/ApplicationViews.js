import React from 'react';
import { Switch, Route } from 'react-router-dom';
import EntryForm from './components/Entry/EntryForm';
// import EntryForm from './components/Entry/EntryFormOld';
// import EntryForm from './components/Entry/EntryFormAlt';
import EntryList from './components/Entry/EntryList';

const ApplicationViews = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <EntryList />
      </Route>

      <Route exact path='/entries/add'>
        <EntryForm />
      </Route>

      <Route exact path='/entries/edit/:entryId(\d+)'>
        <EntryForm />
      </Route>
    </Switch>
  );
};

export default ApplicationViews;
