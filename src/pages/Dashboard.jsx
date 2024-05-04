import { useUser } from '../features/authentication/useUser';

function Dashboard() {
  const { user } = useUser();

  // console.log(user.user);

  return <div>Dashboard</div>;
}

export default Dashboard;
