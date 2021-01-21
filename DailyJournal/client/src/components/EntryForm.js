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
import { useHistory } from 'react-router-dom';
import { EntryContext } from '../providers/EntryProvider';
import { MoodContext } from '../providers/MoodProvider';

const EntryForm = () => {
  const { addEntry } = useContext(EntryContext);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [moodId, setMood] = useState('');
  const [journalEntry, setJournalEntry] = useState('');

  const history = useHistory();

  const { moods, getAllMoods } = useContext(MoodContext);

  useEffect(() => {
    getAllMoods(); // eslint-disable-next-line
  }, []);

  const submit = (e) => {
    const entry = {
      title,
      date,
      moodId,
      journalEntry,
    };

    addEntry(entry).then((p) => {
      history.push('/');
    });
  };

  return (
    <div className='container pt-4'>
      <div className='row justify-content-center'>
        <Card className='col-sm-12 col-lg-6'>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for='title'>Title</Label>
                <Input id='title' onChange={(e) => setTitle(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for='date'>Date</Label>
                <Input
                  id='date'
                  type='date'
                  onChange={(e) => setDate(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for='mood'>Mood</Label>
                <select 
                  id='mood'
                  className='form-control'
                  onChange={(e) => setMood(e.target.value)}
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
                  onChange={(e) => setJournalEntry(e.target.value)}
                  type='textarea'
                />
              </FormGroup>
            </Form>
            <Button color='info' onClick={submit}>
              Submit
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default EntryForm;
