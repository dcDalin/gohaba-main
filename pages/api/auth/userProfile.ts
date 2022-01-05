import type { NextApiRequest, NextApiResponse } from 'next';

import { sendQuery } from './utils';

const HASURA_OPERATION = `
  query MyQuery($id: uuid = "") {
    users_by_pk(id: $id) {
      created_at
      displayName
      email
      id
      isEmailVerified
      isPhoneNumberVerified
      phoneNumber
      profilePictureUrl
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const userProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      return res.status(400).json({
        message: 'Only POST requests allowed'
      });
    }

    const defaultUser = {
      created_at: '',
      displayName: '',
      email: '',
      id: '',
      isEmailVerified: false,
      isPhoneNumberVerified: false,
      phoneNumber: null,
      profilePictureUrl: 'https://picsum.photos/200'
    };

    const { session_variables } = req.body;

    console.log('Session vars is: ', session_variables);

    const user_id = session_variables['x-hasura-user-id'];

    if (user_id) {
      // logged in user
      const request = await sendQuery({ id: user_id }, HASURA_OPERATION);

      console.log('Request is: ', request);
      // destructure request
      const { data, errors } = request;

      if (errors) {
        return res.status(400).json(errors[0]);
      } else if (!data.users_by_pk) {
        // no user found
        return res.json({ ...defaultUser, success: false });
      } else {
        return res.json({ ...data.users_by_pk, success: true });
      }
    } else {
      return res.json({ ...defaultUser, success: false });
    }
  } catch (err) {
    console.error('Err is: ***************: ', err);
    return res.status(400).json({ message: `Something went wrong, please try again: ${err}` });
  }
};

export default userProfile;
