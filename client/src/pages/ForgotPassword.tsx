import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
	return (
		<section className='max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 md:mt-16 gap-12'>
      <div className='mx-20 flex flex-col gap-8 items-center text-center md:items-start mt-32 md:text-left'>
        <h1 className='font-heading text-3xl md:text-5xl'>
          Forgot Your Password? 
        </h1>
        <p className='text-lg md:text-2xl'>
          Don't worry! We'll help you reset your password. Please enter your
          email address, and we'll send you instructions on how to reset it.
        </p>
        <form className='flex flex-col gap-4'>
          <label className='text-base md:text-lg' htmlFor='email'>
            Email Address
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className='border-2 border-gray-300 px-4 py-2 rounded-md focus:outline-none'
            placeholder='Your Email'
          />
          <button
            type='submit'
            className='px-8 py-4 border-2 border-white font-heading w-fit font-semibold bg-primary text-white hover:bg-white hover:text-primary transition-all'
          >
            Reset Password
          </button>
        </form>
        <Link
          to='/signup'
          className='text-primary hover:underline text-lg md:text-xl'
        >
          Back to Signup
        </Link>
      </div>
      <div className='flex items-center justify-center'>
        <div className='max-w-xl'>
          <img
            src='/clip2.jpg'
            alt='Forgot Password'
			className='w-400 h-400'
          />
        </div>
      </div>
    </section>
	)
};

export default ForgotPasswordPage;