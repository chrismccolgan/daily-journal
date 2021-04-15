import React, { useContext } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { EntryContext } from './EntryProvider';

const Entry = ({ entry }) => {
  const history = useHistory();
  const { deleteEntry } = useContext(EntryContext);
  const handleDelete = () => {
    deleteEntry(entry.id).then(() => {
      history.push('/');
    });
  };

  return (
    <div className='container pt-4'>
      <div className='row justify-content-center'>
        <Card className='col-sm-12 col-lg-6'>
          <CardBody>
            <CardTitle className='h4'>{entry.title}</CardTitle>
            <CardSubtitle className='text-muted'>
              {new Intl.DateTimeFormat('en-US').format(new Date(entry.date))}
            </CardSubtitle>
            <CardText className='text-muted'>
              {entry.mood.emoji} {entry.mood.moodName}
            </CardText>
            <CardText>{entry.journalEntry}</CardText>
            <Button
              color='warning'
              onClick={() => {
                history.push(`/entries/edit/${entry.id}`);
              }}
            >
              Edit
            </Button>{' '}
            <Button color='danger' onClick={handleDelete}>
              Delete
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Entry;
