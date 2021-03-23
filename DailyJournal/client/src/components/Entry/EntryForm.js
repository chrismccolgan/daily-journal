import React, { useState, useContext, useEffect } from 'react';
import {
  Form,
  FormGroup,
  Card,
  CardBody,
  Label,
  Input,
  Button,
} from 'reactstrap';
import { useHistory, useParams } from 'react-router-dom';
import { EntryContext } from './EntryProvider';
import { MoodContext } from '../Mood/MoodProvider';

const EntryForm = () => {
  const { addEntry, getEntry, updateEntry } = useContext(EntryContext);
  const { moods, getAllMoods } = useContext(MoodContext);

  const [entry, setEntry] = useState('');
  // Disables the submit button
  const [isLoading, setIsLoading] = useState(true);

  // Grabs the parameter passed on the URL
  const { entryId } = useParams();
  const history = useHistory();
  
  const handleInputChange = (event) => {
    // When changing a state object or array, always create a copy to make changes, and then set state
    const newEntry = { ...entry };
    if (event.target.name === 'moodId' || event.target.name === 'id') {
      newEntry[event.target.name] = parseInt(event.target.value);
    } else {
      newEntry[event.target.name] = event.target.value;
    }
    setEntry(newEntry);
  };
  
  const handleSubmit = () => {
    setIsLoading(true);
    // If entry already has an Id, then we are editing an entry
    if (entryId) {
      updateEntry({
        id: parseInt(entry.id),
        title: entry.title,
        date: entry.date,
        moodId: parseInt(entry.moodId),
        journalEntry: entry.journalEntry,
      }).then(() => history.push('/'));
    } else {
      addEntry(entry).then(() => history.push('/'));
    }
  };

  useEffect(() => {
    getAllMoods().then(() => {
      if (entryId) {
        getEntry(entryId).then(setEntry);
      }
    });
    setIsLoading(false);
  // eslint-disable-next-line
  }, []);

  return (
    <div className='container pt-4'>
      <div className='row justify-content-center'>
        <Card className='col-sm-12 col-lg-6'>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for='title'>Title</Label>
                <Input
                  id='title'
                  name='title'
                  type='text'
                  defaultValue={entry.title}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for='date'>Date</Label>
                <Input
                  id='date'
                  name='date'
                  type='date'
                  defaultValue={entry.date && entry.date.split('T')[0]}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for='moodId'>Mood</Label>
                <select
                  id='moodId'
                  name='moodId'
                  value={entry.moodId}
                  onChange={handleInputChange}
                  className='form-control'
                >
                  <option value=''>Select Mood</option>
                  {moods.map((mood) => (
                    <option key={mood.id} value={mood.id}>
                      {mood.emoji} {mood.moodName}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup>
                <Label for='journalEntry'>Journal Entry</Label>
                <Input
                  id='journalEntry'
                  name='journalEntry'
                  type='textarea'
                  defaultValue={entry.journalEntry}
                  onChange={handleInputChange}
                  rows={4}
                />
              </FormGroup>
            </Form>
            <Button
              color='info'
              disabled={isLoading}
              onClick={(event) => {
                event.preventDefault();
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default EntryForm;
