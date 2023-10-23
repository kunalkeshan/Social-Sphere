import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  return (
    <section className='max-w-screen-2xl mx-auto flex flex-col md:flex-row gap-12 items-center'>
      <div className='w-full md:w-1/2 mx-20 text-center md:text-left'>
        <h1 className='font-heading text-3xl md:text-5xl md:mb-4 mt-12'>
          Forgot Your Password?
        </h1>
        <p className='text-sm md:ml-0 ml-6 md:text-2xl mt-6'>
          Don't worry! We'll help you reset your password. Please enter your email address, and we'll send you instructions on how to reset it.
        </p>
        <form className='flex flex-col gap-4 items-center md:items-start'>
          <label className='text-base md:text-lg md:mt-12 mt-4' htmlFor='email'>
            Email Address
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className='border-2 border-gray-300 text-black px-4 py-2 mt-4 md:w-60 w-52 md:ml-0 rounded-md focus:outline-none'
            placeholder='Your Email'
          />
          <button
            type='submit'
            className='px-4 py-2 md:w-60 md:ml-0 border-2 border-white font-heading w-fit font-semibold bg-primary text-white hover:bg-white hover:text-primary transition-all'
          >
            Reset Password
          </button>
        </form>
        <Link to='/signup' className='text-primary hover:underline text-lg md:text-xl'>
          Back to Signup
        </Link>
      </div>
      <div className='w-full md:w-2/3'>
        <img
          src='/clip2.jpg'
          alt='Forgot Password'
          className='md:w-full md:h-screen h-0 w-0  mx-autox'
        />
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
