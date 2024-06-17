import DashboardFilter from '../features/dashboard/DashboardFilter';
import DashboardLayout from '../features/dashboard/DashboardLayout';
import useWidth from '../hooks/useWidth';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Dashboard() {
  const width = useWidth();

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Dashboard</Heading>
        {width > 500 && <DashboardFilter />}
      </Row>

      {width < 500 && (
        <Row>
          <DashboardFilter />
        </Row>
      )}

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
