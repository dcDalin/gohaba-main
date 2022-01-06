import { gql, useQuery } from '@apollo/client';
import { FC } from 'react';

const GET_REACTIVE_VARIABLE = gql`
  query GetAuthModalState {
    authModalsVar @client
  }
`;

const Books: FC = () => {
  const { loading, error } = useQuery(GET_REACTIVE_VARIABLE);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{`Error! ${error.message}`}</div>;

  return <div>hey books</div>;
};

export default Books;
