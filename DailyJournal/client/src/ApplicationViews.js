import React from 'react';
import { Switch, Route } from 'react-router-dom';
import EntryList from './components/EntryList';
import EntryForm from './components/EntryForm';

const ApplicationViews = () => {
  return (
    <Switch>
      <Route path='/' exact>
        <EntryList />
      </Route>

      <Route path='/entries/add'>
        <EntryForm />
      </Route>

      <Route path='/entries/:id'>{/* TODO: Entry Details Component */}</Route>
    </Switch>
  );
};

export default ApplicationViews;
