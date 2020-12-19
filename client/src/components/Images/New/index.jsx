import React from 'react';
import Form from '../Form';
import Header from '../../shared/Header';
import { Container } from 'react-bootstrap';

const New = () => {
  return (
    <>
      <Header title="Images">
        Share your memories by uploading images!
      </Header>

      <Container>
        <Form endpoint="images"/>
      </Container>
    </>
  );
}
 
export default New;