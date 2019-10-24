import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import ErrorMessage from '../../Error';
import { Button, Form, Textarea } from '../../Universal/style';

const CREATE_MESSAGE = gql`
  mutation($text: String!) {
    createMessage(text: $text) {
      id
      text
      createdAt
      user {
        id
        firstname
        lastname
      }
    }
  }
`;

class MessageCreate extends Component {
  state = {
    text: '',
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = async (event, createMessage) => {
    event.preventDefault();

    try {
      await createMessage();
      this.setState({ text: '' });
    } catch (error) {}
  };

  render() {
    const { text } = this.state;

    return (
      <Mutation mutation={CREATE_MESSAGE} variables={{ text }}>
        {(createMessage, { data, loading, error }) => (
          <Form
            onSubmit={event => this.onSubmit(event, createMessage)}
          >
            <Textarea
              name="text"
              value={text}
              onChange={this.onChange}
              type="text"
              placeholder="Your thoughts on the app..."
            />
            <Button type="submit">Send</Button>

            {error && <ErrorMessage error={error} />}
          </Form>
        )}
      </Mutation>
    );
  }
}

export default MessageCreate;
