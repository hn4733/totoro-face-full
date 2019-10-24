import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import MessageDelete from '../MessageDelete';
import Loading from '../../Loading';
import withSession from '../../Session/withSession';
import { Button, P } from '../../Universal/style';

/************************ Create New Message ***********************/
const MESSAGE_CREATED = gql`
  subscription {
    messageCreated {
      message {
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
  }
`;
/************************ Get More Messages ***********************/
const GET_PAGINATED_MESSAGES_WITH_USERS = gql`
  query($cursor: String, $limit: Int!) {
    messages(cursor: $cursor, limit: $limit)
      @connection(key: "MessagesConnection") {
      edges {
        id
        text
        createdAt
        user {
          id
          firstname
          lastname
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

/************************ List All Messages ***********************/
const Messages = ({ limit }) => (
  <Query
    query={GET_PAGINATED_MESSAGES_WITH_USERS}
    variables={{ limit }}
  >
    {({ data, loading, error, fetchMore, subscribeToMore }) => {
      if (!data) {
        return (
          <div>
            There are no messages yet ... Try to create one by
            yourself.
          </div>
        );
      }

      const { messages } = data;

      if (loading || !messages) {
        return <Loading />;
      }

      const { edges, pageInfo } = messages;

      return (
        <Fragment>
          <MessageList
            messages={edges}
            subscribeToMore={subscribeToMore}
          />

          {pageInfo.hasNextPage && (
            <MoreMessagesButton
              limit={limit}
              pageInfo={pageInfo}
              fetchMore={fetchMore}
            >
              More
            </MoreMessagesButton>
          )}
        </Fragment>
      );
    }}
  </Query>
);

const MoreMessagesButton = ({
  limit,
  pageInfo,
  fetchMore,
  children,
}) => (
  <Button
    type="button"
    onClick={() =>
      fetchMore({
        variables: {
          cursor: pageInfo.endCursor,
          limit,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }

          return {
            messages: {
              ...fetchMoreResult.messages,
              edges: [
                ...previousResult.messages.edges,
                ...fetchMoreResult.messages.edges,
              ],
            },
          };
        },
      })
    }
  >
    {children}
  </Button>
);

class MessageList extends Component {
  subscribeToMoreMessage = () => {
    this.props.subscribeToMore({
      document: MESSAGE_CREATED,
      updateQuery: (previousResult, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return previousResult;
        }

        const { messageCreated } = subscriptionData.data;

        return {
          ...previousResult,
          messages: {
            ...previousResult.messages,
            edges: [
              messageCreated.message,
              ...previousResult.messages.edges,
            ],
          },
        };
      },
    });
  };

  componentDidMount() {
    this.subscribeToMoreMessage();
  }

  render() {
    const { messages } = this.props;

    return messages.map(message => (
      <MessageItem key={message.id} message={message} />
    ));
  }
}

/************************ The information of each message ***********************/
const MessageItemBase = ({ message, session }) => {
  const { firstname, lastname } = message.user;
  return (
    <div>
      <P fontsize={'19px'} capitalize bold>
        {firstname} {lastname}
      </P>
      <small>{new Date(message.createdAt).toDateString()}</small>
      <p>{message.text}</p>

      {session && session.me && message.user.id === session.me.id && (
        <MessageDelete message={message} />
      )}
    </div>
  );
};
/************************ Pass the logged-in user information to the message ***********************/
const MessageItem = withSession(MessageItemBase);

export default Messages;
