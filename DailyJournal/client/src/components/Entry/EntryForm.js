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
import Notification from '../UI/Notification';
import { entryFormReducer, initialState } from './entryFormReducer';

const EntryForm = () => {
  const { addEntry, getEntry, updateEntry, notification } =
    useContext(EntryContext);
  const { moods, getAllMoods } = useContext(MoodContext);

  const [formState, dispatch] = useReducer(entryFormReducer, initialState);

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
      updateEntry({ ...json, id: formState.id });
    } else {
      addEntry(json);
    }

    setIsLoading(false);

    if (notification) {
      return;
    }

    history.push('/');
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
    <>
      {notification && <Notification notification={notification} />}
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
                    invalid={
                      !formState.date.isValid && formState.date.isTouched
                    }
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
    </>
  );
};

export default EntryForm;
