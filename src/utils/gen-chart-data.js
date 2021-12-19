import { JobTenures, Salaries } from '@/utils/enums';

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
    if (info && info.company && info.company.job_tenure && info.company.salary) {
      // jobTenuresCollection[info.gender] = (jobTenuresCollection[info.gender]) ? jobTenuresCollection[info.gender] + 1 : 1;

      // age
      if (info.age) {
        // get data type statistic

        // collect data of the same job-tenure & salary & age for bubble chart
        const jobTenure = JobTenures[info.company.job_tenure];  // x
        const salary = Salaries[info.company.salary];           // y
        const curAgeChartData = chartData[info.age];            // dataset
        let isNewXYCategory = true;
        // find the exist job-tenure & salary category
        curAgeChartData.forEach((data, idx) => {
          if (data.x === jobTenure && data.y === salary) {
            curAgeChartData[idx].r += 1;
            curAgeChartData[idx].d.push(info);    // collect data
            isNewXYCategory = false;
          }
        });
        if (isNewXYCategory) {
          const data = {
            x: JobTenures[info.company.job_tenure],
            y: Salaries[info.company.salary],
            r: 1,
            d: [info],
          };
          chartData[info.age].push(data);         // start to collect 1st data
        }
      }
    }
  });
  // console.log(jobTenuresCollection);

  return chartData;
};

const temp = {};

export {
  genJobTenureVSSalaryChartData, temp,
};
