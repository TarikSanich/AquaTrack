import css from '../SignInForm/SignInForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Icon from '../../shared/components/Icon/Icon';
import { useState } from 'react';
import clsx from 'clsx';
import { login } from '../../redux/user/operations';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export default function SignInForm({ onSubmit }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = data => {
    const { email, password } = data;
    dispatch(login({ email, password }))
      .unwrap()
      .then(loginResponse => {
        console.log('login Response:', loginResponse);
        // if (loginResponse) {
        //   navigate('/tracker');
        // }
      })
      .catch(error => {
        console.log('Error message:', error.message);
        console.log('Error:', error);
        console.log(
          'Error response data message:',
          error.response?.data?.message,
        );

        toast.error(`login failed: ${error.response?.data?.message}`);
      });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={css.inputGroup}>
        <label>Email</label>
        <input
          className={clsx(css.inputGroupInput, errors.email && css.inputError)}
          type="text"
          placeholder="Enter your email"
          {...register('email')}
        />
        {errors.email && <p className={css.error}>{errors.email.message}</p>}
      </div>
      <div className={css.inputGroup}>
        <label>Password</label>
        <div className={css.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            {...register('password')}
            className={clsx(
              css.inputGroupInput,
              errors.password && css.inputError,
            )}
          />

          <button
            type="button"
            className={css.passwordToggle}
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <Icon className={css.icon} id="eye" width={20} height={20} />
            ) : (
              <Icon className={css.icon} id="eyeOff" width={20} height={20} />
            )}
          </button>
        </div>
        {errors.password && (
          <p className={css.error}>{errors.password.message}</p>
        )}
      </div>
      <button type="submit" className={css.submitButton} onClick={onSubmit}>
        Sign In
      </button>
    </form>
  );
}
