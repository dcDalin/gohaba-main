import { FC } from 'react';

const SignUpForm: FC = () => {
  return (
    <div className="w-full">
      <form className="">
        <div className="mb-4">
          <label className="form-label" htmlFor="email">
            Name
          </label>
          <input className="form-input" id="email" type="text" placeholder="email@address.com" />
        </div>
        <div className="mb-4">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input className="form-input" id="email" type="text" placeholder="email@address.com" />
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
          />
          <p className="text-red-500 text-xs italic">Please choose a password.</p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 custom-hover text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline hover:bg-blue-700"
            type="button"
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

export default SignUpForm;
