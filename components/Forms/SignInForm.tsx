import { FC } from 'react';
import { useForm } from 'react-hook-form';

const SignInForm: FC = () => {
  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm();

  const onSubmit = (data) => {
    console.log({ data });
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
            type="text"
            placeholder="email@address.com"
            {...register('email', {
              required: 'Email is required',
              validate: (value) => value.includes('@') || "Email must include '@' symbol"
            })}
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
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
          {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password.message}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 custom-hover text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline hover:bg-blue-700"
            type="submit"
          >
            Sign In
          </button>
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
