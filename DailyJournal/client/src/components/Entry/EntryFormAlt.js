import React, { useContext, useEffect, useReducer } from 'react';
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import { useHistory, useParams } from 'react-router-dom';
import { EntryContext } from './EntryProvider';
import { MoodContext } from '../Mood/MoodProvider';

const initState = {
  title: '',
  date: '',
  moodId: '',
  journalEntry: '',
  isLoading: false,
};

const reducer = (prevState, action) => {
  return {
    ...prevState,
    ...action,
  };
};

const EntryForm = () => {
  const { addEntry, getEntry, updateEntry } = useContext(EntryContext);
  const { moods, getAllMoods } = useContext(MoodContext);

  const [entry, dispatch] = useReducer(reducer, initState);

  // Grabs the parameter passed on the URL
  const { entryId } = useParams();
  const history = useHistory();

  const handleInputChange = (event) => {
    dispatch({
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ isLoading: true });
    // If entry already has an Id, then we are editing an entry
    if (entryId) {
      updateEntry(entry).then(() => history.push('/'));
    } else {
      addEntry(entry).then(() => history.push('/'));
    }
    dispatch({ isLoading: false });
  };

  useEffect(() => {
    getAllMoods().then(() => {
      if (entryId) {
        getEntry(entryId).then((data) => dispatch(data));
      }
    });
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
              disabled={entry.isLoading}
              onClick={handleSubmit}
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
