import React, { useState, useContext, useEffect, useReducer } from 'react';
import {
  Button,
  Card,
  CardBody,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import { useHistory, useParams } from 'react-router-dom';
import { EntryContext } from './EntryProvider';
import { MoodContext } from '../Mood/MoodProvider';

const EntryForm = () => {
  const { addEntry, getEntry, updateEntry } = useContext(EntryContext);
  const { moods, getAllMoods } = useContext(MoodContext);

  const initialFormState = {
    id: '',
    title: { value: '', isTouched: false, isValid: false },
    date: { value: '', isTouched: false, isValid: false },
    moodId: { value: '', isTouched: false, isValid: false },
    journalEntry: { value: '', isTouched: false, isValid: false },
  };

  const formReducer = (state, action) => {
    const updatedElement = { ...state[action.field] };
    if (action.type === 'INPUT') {
      updatedElement.value = action.payload;
      return { ...state, [action.field]: updatedElement };
    } else if (action.type === 'BLUR') {
      const isNotEmpty = (value) => value.trim() !== '';
      updatedElement.isTouched = true;
      updatedElement.isValid = isNotEmpty(action.payload);
      return { ...state, [action.field]: updatedElement };
    } else if (action.type === 'EDIT') {
      return {
        id: action.payload.id,
        title: { value: action.payload.title, isTouched: false, isValid: true },
        date: { value: action.payload.date, isTouched: false, isValid: true },
        moodId: {
          value: action.payload.moodId,
          isTouched: false,
          isValid: true,
        },
        journalEntry: {
          value: action.payload.journalEntry,
          isTouched: false,
          isValid: true,
        },
      };
    } else if (action.type === 'SUBMIT') {
      return {
        ...state,
        title: { ...state.title, isTouched: true },
        date: { ...state.date, isTouched: true },
        moodId: { ...state.moodId, isTouched: true },
        journalEntry: { ...state.journalEntry, isTouched: true },
      };
    } else {
      return;
    }
  };

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

  const handleBlur = (event) => {
    dispatch({
      type: 'BLUR',
      field: event.target.name,
      payload: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    dispatch({ type: 'SUBMIT' });

    if (
      !formState.title.isValid ||
      !formState.date.isValid ||
      !formState.moodId.isValid ||
      !formState.journalEntry.isValid
    ) {
      setIsLoading(false);
      return;
    }

    const json = {
      title: formState.title.value,
      date: formState.date.value,
      moodId: parseInt(formState.moodId.value),
      journalEntry: formState.journalEntry.value,
    };

    // If entry already has an Id, then we are editing an entry
    if (entryId) {
      updateEntry({ ...json, id: formState.id }).then(() => history.push('/'));
    } else {
      addEntry(json).then(() => history.push('/'));
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
                  invalid={
                    !formState.title.isValid && formState.title.isTouched
                  }
                  id='title'
                  name='title'
                  type='text'
                  defaultValue={formState.title.value}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
                <FormFeedback>Please enter a title</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for='date'>Date</Label>
                <Input
                  invalid={!formState.date.isValid && formState.date.isTouched}
                  id='date'
                  name='date'
                  type='date'
                  defaultValue={
                    formState.date.value && formState.date.value.split('T')[0]
                  }
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
                <FormFeedback>Please enter a date</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for='moodId'>Mood</Label>
                <Input
                  invalid={
                    !formState.moodId.isValid && formState.moodId.isTouched
                  }
                  id='moodId'
                  name='moodId'
                  type='select'
                  value={formState.moodId.value}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className='form-control'
                >
                  <option value=''>Select Mood</option>
                  {moods.map((mood) => (
                    <option key={mood.id} value={mood.id}>
                      {mood.emoji} {mood.moodName}
                    </option>
                  ))}
                </Input>
                <FormFeedback>Please select a mood</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for='journalEntry'>Journal Entry</Label>
                <Input
                  invalid={
                    !formState.journalEntry.isValid &&
                    formState.journalEntry.isTouched
                  }
                  id='journalEntry'
                  name='journalEntry'
                  type='textarea'
                  defaultValue={formState.journalEntry.value}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  rows={4}
                />
                <FormFeedback>Please write an entry</FormFeedback>
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
