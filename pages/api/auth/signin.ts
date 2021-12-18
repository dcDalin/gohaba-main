import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { generateJWT, sendQuery } from './utils';

const HASURA_OPERATION = `
  query GetUserByEmail($_eq: String) {
    users(where: {email: {_eq: $_eq}}, limit: 1) {
      id
      password
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const signin = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      return res.status(400).json({
        message: 'Only POST requests allowed'
      });
    }

    // grab values from input
    const { email, password } = req.body.input;

    console.log('Req body is: ', req.body);

    const request = await sendQuery({ _eq: email }, HASURA_OPERATION);

    console.log('Request is: ', request);
    // destructure request
    const { data, errors } = request;

    if (errors) {
      return res.status(400).json(errors[0]);
    }
    console.log('Request is: ************', request);

    const dbUser = data.users[0];

    console.log('DB USER IS: ', dbUser);

    if (!dbUser) return res.status(400).json({ message: 'No user found' });

    // decrypt password
    const validPassword = bcrypt.compareSync(password, dbUser.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid email and or password' });

    const token = generateJWT({
      defaultRole: 'user',
      allowedRoles: ['user'],
      otherClaims: {
        'x-hasura-user-id': dbUser.id
      }
    });
    return res.json({ id: dbUser.id, token });
  } catch (err) {
    console.error('Err is: ***************: ', err);
    return res.status(400).json({ message: `Something went wrong, please try again: ${err}` });
  }
};

export default signin;
