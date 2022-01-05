import { useApolloClient } from '@apollo/client';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/UI/Button';
import useSignIn from '@/hooks/useSignIn';
import { closeAuthModals } from '@/operations/mutations/AuthModals';
import { JWT } from '@/utils/environment';

type FormData = {
  email: string;
  password: string;
};

const SignInForm: FC = () => {
  // hooks
  const { signInUser, loading } = useSignIn();

  const client = useApolloClient();

  // hook form
  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm();

  const onSubmit = async (data: FormData) => {
    try {
      const { email, password } = data;

      const {
        data: {
          UserSignIn: { token }
        }
      } = await signInUser({ variables: { email, password } });

      localStorage.setItem(JWT, token);
      closeAuthModals();
      await client.refetchQueries({
        include: ['GetUserProfile']
      });
    } catch (error) {
      console.log('Sign in error: ', error);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-input"
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              validate: (value) => value.includes('@') || "Email must include '@' symbol"
            })}
          />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>
        <div className="mb-6">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            className="form-input"
            id="password"
            type="password"
            placeholder="******************"
            {...register('password', {
              required: 'Password is required'
            })}
          />
          {errors.password && <p className="form-error">{errors.password.message}</p>}
        </div>
        <div className="flex items-center justify-between">
          <Button title="Sign in" loading={loading} />
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-700"
            href="/asd"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
