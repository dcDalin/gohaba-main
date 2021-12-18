import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';

import { generateJWT, sendQuery } from './utils';

const HASURA_OPERATION = `
  mutation UserSignUp($email: String, $password: String) {
    insert_users_one(object: {email: $email, password: $password}) {
      id
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const signUp = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      return res.status(400).json({
        message: 'Only POST requests allowed'
      });
    }

    const { email, password } = req.body.input;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and or password required' });
    }

    // validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: `${email} is invalid` });
    }

    // has password
    const hashedPassword = bcrypt.hashSync(password);

    // fire query to hasura
    const request = await sendQuery({ email, password: hashedPassword }, HASURA_OPERATION);

    const { data, errors } = request;

    if (errors) {
      return res.status(400).json(errors[0]);
    }

    const { id } = data.insert_users_one;

    // generate jwt token
    const token = generateJWT({
      defaultRole: 'user',
      allowedRoles: ['user'],
      otherClaims: {
        'x-hasura-user-id': id
      }
    });

    return res.json({
      id,
      token
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: `Something went wrong, please try again: ${err}` });
  }
};

export default signUp;
