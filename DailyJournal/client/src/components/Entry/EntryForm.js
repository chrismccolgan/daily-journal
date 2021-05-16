import React, { useState, useContext, useEffect, useReducer } from 'react';
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

const initialFormState = {
  title: '',
  date: '',
  moodId: '',
  journalEntry: '',
};

const formReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return {
      ...state,
      [action.field]:
        action.field === 'moodId' ? parseInt(action.payload) : action.payload,
    };
  }
  if (action.type === 'EDIT') {
    return { ...action.payload };
  }
  return state;
};

const EntryForm = () => {
  const { addEntry, getEntry, updateEntry } = useContext(EntryContext);
  const { moods, getAllMoods } = useContext(MoodContext);

  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  // Disables the submit button
  const [isLoading, setIsLoading] = useState(false);

  // Grabs the parameter passed on the URL
  const { entryId } = useParams();
  const history = useHistory();

  const handleInputChange = (event) => {
    dispatch({
      type: 'INPUT',
      field: event.target.name,
      payload: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    // If entry already has an Id, then we are editing an entry
    if (entryId) {
      updateEntry(formState).then(() => history.push('/'));
    } else {
      addEntry(formState).then(() => history.push('/'));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getAllMoods().then(() => {
      if (entryId) {
        getEntry(entryId).then((data) =>
          dispatch({ type: 'EDIT', payload: data })
        );
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
                  defaultValue={formState.title}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for='date'>Date</Label>
                <Input
                  id='date'
                  name='date'
                  type='date'
                  defaultValue={formState.date && formState.date.split('T')[0]}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for='moodId'>Mood</Label>
                <select
                  id='moodId'
                  name='moodId'
                  value={formState.moodId}
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
                  defaultValue={formState.journalEntry}
                  onChange={handleInputChange}
                  rows={4}
                />
              </FormGroup>
            </Form>
            <Button color='info' disabled={isLoading} onClick={handleSubmit}>
              Submit
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default EntryForm;
