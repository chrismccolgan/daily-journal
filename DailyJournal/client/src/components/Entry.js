import React from 'react';
import { Card, CardBody, CardSubtitle, CardTitle, CardText, Button } from 'reactstrap';

const Entry = ({ entry }) => {
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
            <Button color='warning'>Edit</Button>{' '}
            <Button color='danger'>Delete</Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Entry;
