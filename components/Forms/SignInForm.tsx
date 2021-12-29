import { useMutation } from '@apollo/client';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import Button from '@/components/UI/Button';
import { loginWithEmailAndPassword } from '@/redux/Authentication/authenticationSlice';

type FormData = {
  email: string;
  password: string;
};

const SignInForm: FC = () => {
  const dispatch = useDispatch();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register
  } = useForm();

  const onSubmit = (data: FormData) => {
    const { email, password } = data;

    dispatch(loginWithEmailAndPassword({ email, password }));
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
          <Button title="Sign in" loading={isSubmitting} />
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
