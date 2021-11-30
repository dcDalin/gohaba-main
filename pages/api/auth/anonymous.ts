import type { NextApiRequest, NextApiResponse } from 'next';

import { generateJWT } from './utils';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const signin = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'GET') {
      return res.status(400).json({
        message: 'Only GET requests allowed'
      });
    }

    const token = generateJWT({
      defaultRole: 'anonymous',
      allowedRoles: ['anonymous', 'user']
    });
    return res.json({ token });
  } catch (err) {
    console.log('Err is: **************: ', err);
    return res.status(400).json({ message: ', please try again', err: err });
  }
};

export default signin;
