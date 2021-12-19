import { jobTenures, salaries } from '@/utils/enums';

const genJobTenureVSSalaryChartData = (json) => {
  // let skip = 0;
  /**
   * charData structure
   *  {
   *    'age': [
   *      {
   *        x: int(job_tenure),
   *        y: int(salary),
   *        r: # of user,
   *        d: [
   *          info object, ...
   *        ],
   *      },
   *      ...
   *    ],
   *    ...
   *  }
   */
  const chartData = {
    '21~25 歲': [],
    '26~30 歲': [],
    '31~35 歲': [],
    '36~40 歲': [],
    '41~45 歲': [],
    '46~50 歲': [],
  };
  // const jobTenuresCollection = {};
  json.forEach((info) => {
    // each user info
    if (info && info.age && info.company && info.company.job_tenure && info.company.salary) {
      // get data type statistic
      // jobTenuresCollection[info.company.job_tenure] = (jobTenuresCollection[info.company.job_tenure]) ? jobTenuresCollection[info.company.job_tenure] + 1 : 1;

      // collect data of the same job-tenure & salary & age for bubble chart
      const jobTenure = jobTenures[info.company.job_tenure];
      const salary = salaries[info.company.salary];
      const curAgeChartData = chartData[info.age];
      let isNewXYCategory = true;
      curAgeChartData.forEach((data, idx) => {
        // find the exist job-tenure & salary category
        if (data.x === jobTenure && data.y === salary) {
          curAgeChartData[idx].r += 1;
          curAgeChartData[idx].d.push(info);    // collect data
          isNewXYCategory = false;
        }
      });
      if (isNewXYCategory) {
        const data = {
          x: jobTenures[info.company.job_tenure],
          y: salaries[info.company.salary],
          r: 1,
          d: [info],
        };
        chartData[info.age].push(data);         // collect data
      }
    }
    else {
      // skip += 1;
    }
  });
  // console.log(jobTenuresCollection);

  return chartData;
};

const temp = {};

export {
  genJobTenureVSSalaryChartData, temp,
};
