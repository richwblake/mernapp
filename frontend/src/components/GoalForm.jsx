import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postGoal } from '../features/goals/goalSlice';

function GoalForm() {
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const handleOnSubmit = e => {
    e.preventDefault();
    dispatch(postGoal({
      text
    }));
  }

  return (
    <section className='form'>
      <form onSubmit={handleOnSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Goal</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>Add Goal</button>
        </div>
      </form>
    </section>
  )
}

export default GoalForm;