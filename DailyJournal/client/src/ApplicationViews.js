import React from 'react';
import { Switch, Route } from 'react-router-dom';
import EntryList from './components/Entry/EntryList';
import EntryForm from './components/Entry/EntryForm';

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
