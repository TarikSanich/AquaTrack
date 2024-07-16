import { useState, useEffect } from 'react';
import css from '../WaterForm/WaterForm.module.css';
import { useForm } from 'react-hook-form';
import Icon from '../../../shared/components/Icon/Icon';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';

const schema = yup.object().shape({
  Time: yup
    .string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Must be in hh:mm format')
    .required('Time is required'),

  Count: yup
    .number()
    .test(
      'is-multiple',
      'Value must be number multiple of 50',
      value => value % 50 === 0,
    )
    .required('Count is required'),
});

export default function WaterForm({ isOpen }) {
  //    <div>
  //     {operationType === "add" ? ( <h2> Тут буде форма для додавання води</h2>)
  //     : <h2> Тут буде форма для редагуання води</h2>}
  //   </div>;

  const [count, setCount] = useState(50);
  const [time, setTime] = useState(getFormattedTime());

  function getFormattedTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Count: count,
      Time: time,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue('Count', count);
  }, [count, setValue]);

  const incrementCount = () => {
    const newCount = Number(count + 50);
    setCount(newCount);
    setValue('Count', newCount);
  };

  const decrementCount = () => {
    const newCount = Number(count - 50);
    setCount(newCount);
    setValue('Count', newCount);
  };

  const onCountChange = event => {
    const value = Number(event.target.value);
    setCount(value);
    setValue('Count', value);
  };

  const isNumber = event => {
    const charCode = event.which ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57) && charCode !== 8) {
      event.preventDefault();
    }
  };

  return (
    <form
      className={css.form}
      onSubmit={handleSubmit(data => {
        console.log(data);
        isOpen(false);
      })}
    >
      <p className={css.text}>Correct entered data:</p>
      <p className={css.secondaryText}>Amount of water:</p>
      <div className={css.counterContainer}>
        <button
          className={clsx(css.counterBtn, count <= 50 && css.decrementBtn)}
          type="button"
          onClick={decrementCount}
          disabled={count <= 50}
        >
          <Icon
            className={css.iconMinus}
            width="19"
            height="19"
            id="icon-minus"
          />
        </button>
        <p className={css.count}>{count} ml</p>
        <button
          className={clsx(css.counterBtn, count >= 1500 && css.incrementBtn)}
          type="button"
          onClick={incrementCount}
          disabled={count >= 1500}
        >
          <Icon
            className={css.iconPlus}
            width="26"
            height="26"
            id="icon-plus"
          />
        </button>
      </div>
      <label className={css.baseLabel}>
        Recording time:
        <input
          className={clsx(css.baseInput, errors.Time && css.errorInput)}
          {...register('Time', { required: true })}
        />
        <span className={css.error}>{errors.Time && errors.Time.message}</span>
      </label>
      <label className={css.secondaryLabel}>
        Enter the value of the water used:
        <input
          className={clsx(css.baseInput, errors.Count && css.errorInput)}
          {...register('Count')}
          onChange={onCountChange}
          onKeyDown={isNumber}
        />
        <span className={css.error}>
          {errors.Count && errors.Count.message}
        </span>
      </label>
      <button className={css.saveBtn} type="submit">
        Save
      </button>
    </form>
  );
}
