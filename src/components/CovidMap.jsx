import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import { covidOptions, countryCodeToName } from '../utils/constants';
import Loader from './Spinner';

const CovidMap = () => {
  const [covidData, setCovidData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .request(covidOptions)
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        const cache = data.map((el) => {
          return [countryCodeToName[el.Country] || el.Country, el.TotalCases];
        });
        console.log('this is the mapped data', cache);
        cache.unshift(['Country', 'Total Cases']);
        setCovidData(cache);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const options = {
    // region: '142', // Asia
    // displayMode: 'text',
    // legendToggle: true,
    // title: 'World Map',
    colorAxis: { colors: ['green', 'black', 'red'] },
  };

  return (
    <div>
      <h1>Covid Map</h1>
      {loading ? (
        <Loader />
      ) : (
        <Chart
          // chartEvents={[
          //   {
          //     eventName: "select",
          //     callback: ({ chartWrapper }) => {
          //       const chart = chartWrapper.getChart();
          //       const selection = chart.getSelection();
          //       if (selection.length === 0) return;
          //       const region = data[selection[0].row + 1];
          //       console.log("Selected : " + region);
          //     },
          //   },
          // ]}
          chartType="GeoChart"
          width="100%"
          height="400px"
          data={covidData}
          options={options}
        />
      )}
    </div>
  );
};

export default CovidMap;