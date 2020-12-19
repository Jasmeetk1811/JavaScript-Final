import React from 'react';
import Form from '../Form';
import Header from '../../shared/Header';
import { Container } from 'react-bootstrap';

const New = () => {
  return (
    <>
      <Header title="Posts">
        Let your imagination run wild!
      </Header>

      <Container>
        <Form endpoint="posts"/>
      </Container>
    </>
  );
}
 
export default New;