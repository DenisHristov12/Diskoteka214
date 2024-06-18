import { useDarkMode } from '../../context/DarkModeContext';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import styled from 'styled-components';
import Heading from '../../ui/Heading';
import {
  respondToLandscapeTablets,
  respondToMobile,
  respondToSmallLaptop,
} from '../../styles/mediaQueries';
import useWidth from '../../hooks/useWidth';

const ChartBox = styled.div`
  padding: 2.4rem 3.2rem;

  background-color: var(--color-grey-0);

  grid-column: 3 / span 2;

  & .recharts-pie-label-text {
    font-weight: 600;
  }

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  ${respondToSmallLaptop(`
    padding: 2rem 3rem;
  `)}

  ${respondToLandscapeTablets(`
    grid-column: 2 / span 1;

    padding: 2rem 3rem;
  `)}

  ${respondToMobile(`
    grid-column: 1 / span 1;
  `)}
`;

const startDataLight = [
  {
    guests: '1 guest per booking',
    value: 0,
    color: '#ef4444',
  },
  {
    guests: '2 guests per booking',
    value: 0,
    color: '#f97316',
  },
  {
    guests: '3 guests per booking',
    value: 0,
    color: '#eab308',
  },
  {
    guests: '4 guests per booking',
    value: 0,
    color: '#84cc16',
  },
  {
    guests: '5 guests per booking',
    value: 0,
    color: '#22c55e',
  },
];

const startDataDark = [
  {
    guests: '1 guest per booking',
    value: 0,
    color: '#b91c1c',
  },
  {
    guests: '2 guests per booking',
    value: 0,
    color: '#c2410c',
  },
  {
    guests: '3 guests per booking',
    value: 0,
    color: '#a16207',
  },
  {
    guests: '4 guests per booking',
    value: 0,
    color: '#4d7c0f',
  },
  {
    guests: '5 guests per booking',
    value: 0,
    color: '#15803d',
  },
];

function prepareData(startData, bookings) {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.guests === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = bookings
    .reduce((arr, cur) => {
      const num = cur.reservators.peopleNum;
      if (num === 1) return incArrayValue(arr, '1 guest per booking');
      if (num === 2) return incArrayValue(arr, '2 guests per booking');
      if (num === 3) return incArrayValue(arr, '3 guests per booking');
      if (num === 4) return incArrayValue(arr, '4 guests');
      if (num === 5) return incArrayValue(arr, '5 guests per booking');
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function GuestsChart({ bookings }) {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, bookings);

  const width = useWidth();

  return (
    <ChartBox>
      <Heading as='h2'>Guests atendency summary</Heading>
      <ResponsiveContainer
        width='100%'
        height={width < 321 ? 180 : width < 780 ? 270 : 240}>
        <PieChart>
          <Pie
            data={data}
            nameKey='guests'
            dataKey='value'
            cx={width > 780 ? '40%' : '50%'}
            cy='50%'
            innerRadius={width > 320 ? 85 : 45}
            outerRadius={width > 320 ? 110 : 60}
            fill='#4f46e5'
            paddingAngle={3}
            startAngle={180}
            endAngle={-180}>
            {data.map((entry, i) => (
              <Cell
                key={entry.guests}
                fill={entry.color}
                stroke={entry.color}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            height={width < 780 ? 10 : 0}
            verticalAlign={width > 780 ? 'middle' : 'bottom'}
            align={width > 780 ? 'right' : 'center'}
            width={width > 780 ? '30%' : '100%'}
            layout={width > 780 ? 'vertical' : 'horizontal'}
            iconSize={15}
            iconType='circle'
            wrapperStyle={
              width < 780 && {
                bottom: '0px',
                top: '100%',
              }
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default GuestsChart;
