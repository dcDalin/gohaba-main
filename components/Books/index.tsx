import { gql, useQuery } from '@apollo/client';
import { FC } from 'react';

const GET_BOOKS = gql`
  query MyQuery {
    book {
      id
      name
      updated_at
    }
  }
`;

const Books: FC = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{`Error! ${error.message}`}</div>;

  console.log('Data is: ', data);

  return <div>hey books</div>;
};

export default Books;
