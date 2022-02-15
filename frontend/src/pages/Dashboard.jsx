import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import GoalItem from '../components/GoalItem';
import Spinner from '../components/Spinner';
import { getGoals } from '../features/goals/goalSlice';

function Dashboard() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { goals, isLoading, isError, message } = useSelector(state => state.goals);

  useEffect(() => {
    if (!user) {
      navigate('login');
    }

    if (isError) {
      toast.error(message)
    }

    dispatch(getGoals())
  }, [user, isError, message, navigate, dispatch]);

  if (!user) {
    return null;
  };

  if (isLoading) {
    return <Spinner />
  }

  const showGoals = () => {
    if (goals.length < 0) {
      return <h3>Add some goals to get started!</h3>;
    } else {
      return goals.map(goal => <GoalItem key={goal._id} goal={goal} />);
    };
  };
  
  return (
    <>
      <section className='heading'>
        <h1>Welcome, {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <section className='content'>
        {showGoals()}
      </section>
    </>
  )
}

export default Dashboard;