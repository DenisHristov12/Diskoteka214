// import { useDarkMode } from 'context/DarkModeContext';
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

const ChartBox = styled.div`
  padding: 2.4rem 3.2rem;

  background-color: white;

  grid-column: 3 / span 2;

  & .recharts-pie-label-text {
    font-weight: 600;
  }

  /* A bit hack, but okay */
  & > *:first-child {
    margin-bottom: 1.6rem;
  }
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
      // console.log(cur.reservators.peopleNum);

      const num = cur.reservators.peopleNum;
      if (num === 1) return incArrayValue(arr, '1 guest per booking');
      if (num === 2) return incArrayValue(arr, '2 guests per booking');
      if (num === 3) return incArrayValue(arr, '3 guests per booking');
      if (num === 4) return incArrayValue(arr, '4 guests');
      if (num === 5) return incArrayValue(arr, '5 guests per booking');
      // if ([4, 5].includes(num)) return incArrayValue(arr, '4-5 nights');
      // if ([6, 7].includes(num)) return incArrayValue(arr, '6-7 nights');
      // if (num >= 8 && num <= 14) return incArrayValue(arr, '8-14 nights');
      // if (num >= 15 && num <= 21) return incArrayValue(arr, '15-21 nights');
      // if (num >= 21) return incArrayValue(arr, '21+ nights');
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function GuestsChart({ bookings }) {
  // const { isDarkMode } = useDarkMode();
  // const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startDataLight, bookings);

  return (
    <ChartBox>
      <Heading type='h2'>Guests atendency summary</Heading>
      <ResponsiveContainer width='100%' height={240}>
        <PieChart>
          <Pie
            data={data}
            // name='guests per booking'
            nameKey='guests'
            dataKey='value'
            cx='40%'
            cy='50%'
            innerRadius={85}
            outerRadius={110}
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
            verticalAlign='middle'
            align='right'
            width='30%'
            layout='vertical'
            iconSize={15}
            iconType='circle'
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default GuestsChart;
