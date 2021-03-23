import React, { useState, useContext } from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  CardBody,
  FormGroup,
  Label,
} from 'reactstrap';
import { EntryContext } from './EntryProvider';

const EntrySearch = () => {
  const { searchEntries } = useContext(EntryContext);
  const [criterion, setCriterion] = useState('');

  return (
    <div className='container pt-4'>
      <div className='row justify-content-center'>
        <Card className='col-sm-12 col-lg-6'>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for='search'>Search</Label>
                <Input
                  id='search'
                  value={criterion}
                  onChange={(e) => setCriterion(e.target.value)}
                />
              </FormGroup>
            </Form>
            <Button color='info' onClick={() => searchEntries(criterion)}>
              Search
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default EntrySearch;
