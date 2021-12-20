import { JobTenures, Salaries } from '@/utils/enums';

const genJobTenureSalaryChartData = (json) => {
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
  const ageDatasets = {
    '21~25 歲': [],
    '26~30 歲': [],
    '31~35 歲': [],
    '36~40 歲': [],
    '41~45 歲': [],
    '46~50 歲': [],
  };
  const genderDatasets = {
    男性: [],
    女性: [],
  };
  const educationDatasets = {
    高中畢業: [],
    大專院校畢業: [],
    碩士畢業: [],
    博士畢業: [],
    其他: [],
  };
  const industryDatasets = {
    AI: [], // 11
    // ERP: [], // 1
    // '"Healthcare "': [], // 1
    'IoT 物聯網': [], // 16
    // OTT: [], // 1
    // SI: [],  // 1
    'SaaS 服務': [],  // 45
    個人工作室: [], // 7
    傳統產業: [], // 32
    公家機關: [], // 7
    // '冷鏈科技，算IoT嗎': [], // 1
    區塊鏈: [], // 9
    // 半導體: [],  // 2
    // 半導體製造業: [],  // 1
    博奕: [], // 65
    // 博弈轉型區塊鏈當中: [],  // 1
    // 品牌顧問拓展電商: [],  // 1
    // 媒體: [],  // 1
    // 房仲產業: [],  // 1
    // 接案 + Saas 服務: [],  // 1
    接案公司: [], // 95
    // 支付平台: [],  // 1
    教育產業: [], // 16
    數位整合行銷: [], // 34
    // 新創公司: [],  // 1
    // 環境衛生及污染防治服務業: [],  // 1
    // 社群: [],  // 1
    科技公司: [], // 3
    科技業: [], // 4
    // '算是 AI + IoT + SaaS 吧': [], // 1
    // 範圍很廣: [],  // 1
    // 網路多媒體: [],  // 1
    // 網路設備相關: [],  // 1
    // 行銷 廣告公司: [], // 1
    // 製造業: [],  // 2
    // 資安: [],  // 2
    // 資訊公司: [],  // 1
    // 資訊安全: [],  // 1
    // 資訊服務: [],  // 1
    // 資訊業: [],  // 1
    // 資訊軟體系統解決方案與顧問服務商: [],  // 1
    // 資通: [],  // 1
    // 軟體公司: [],  // 1
    // 軟體服務業: [],  // 1
    // 遊戲: [],  // 1
    // 遊戲公司: [],  // 1
    // 醫材軟體: [],  // 1
    // 醫療: [],  // 2
    醫療產業: [], // 4
    '金融相關 (銀行、保險)': [],  // 20
    // 雲端資安: [],  // 1
    // 零售業: [],  // 2
    // 電信: [],  // 1
    電子商務: [], // 58
    // 電子產品公司: [],  // 1
    // 電子零組件業: [],  // 1
    // 非營利組織: [],  // 1
    顧問公司: [], // 8
    其他: [],
  };
  // const jobTenuresCollection = {};
  json.forEach((info) => {
    // each user info
    if (info && info.company && info.company.job_tenure && info.company.salary) {
      // jobTenuresCollection[info.company.industry] = (jobTenuresCollection[info.company.industry]) ? jobTenuresCollection[info.company.industry] + 1 : 1;

      // age
      if (info.age) {
        // get data type statistic

        // collect data of the same job-tenure & salary & age for bubble chart
        const jobTenure = JobTenures[info.company.job_tenure];  // x
        const salary = Salaries[info.company.salary];           // y
        const curAgeDataset = ageDatasets[info.age];            // dataset
        let isNewXYCategory = true;
        // find the exist job-tenure & salary category
        curAgeDataset.forEach((data, idx) => {
          if (data.x === jobTenure && data.y === salary) {
            curAgeDataset[idx].r += 1;
            curAgeDataset[idx].d.push(info);    // collect data
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
          curAgeDataset.push(data);         // start to collect 1st data
        }
      }

      // gender
      if (info.gender) {
        // get data type statistic

        // collect data of the same job-tenure & salary & gender for bubble chart
        const jobTenure = JobTenures[info.company.job_tenure];    // x
        const salary = Salaries[info.company.salary];             // y
        const curGenderDataset = genderDatasets[info.gender];     // dataset
        let isNewXYCategory = true;
        // find the exist job-tenure & salary category
        curGenderDataset.forEach((data, idx) => {
          if (data.x === jobTenure && data.y === salary) {
            curGenderDataset[idx].r += 1;
            curGenderDataset[idx].d.push(info);           // collect data
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
          curGenderDataset.push(data);         // start to collect 1st data
        }
      }

      // education
      if (info.education) {
        // get data type statistic

        // collect data of the same job-tenure & salary & education for bubble chart
        const jobTenure = JobTenures[info.company.job_tenure];                                     // x
        const salary = Salaries[info.company.salary];                                              // y
        const curEducationDataset = educationDatasets[info.education] || educationDatasets['其他']; // dataset
        let isNewXYCategory = true;
        // find the exist job-tenure & salary category
        curEducationDataset.forEach((data, idx) => {
          if (data.x === jobTenure && data.y === salary) {
            curEducationDataset[idx].r += 1;
            curEducationDataset[idx].d.push(info);           // collect data
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
          curEducationDataset.push(data);         // start to collect 1st data
        }
      }

      // industry
      if (info.company.industry) {
        // get data type statistic

        // collect data of the same job-tenure & salary & company.industry for bubble chart
        const jobTenure = JobTenures[info.company.job_tenure];                                              // x
        const salary = Salaries[info.company.salary];                                                       // y
        const curIndustryDataset = industryDatasets[info.company.industry] || industryDatasets['其他'];     // dataset
        let isNewXYCategory = true;
        // find the exist job-tenure & salary category
        curIndustryDataset.forEach((data, idx) => {
          if (data.x === jobTenure && data.y === salary) {
            curIndustryDataset[idx].r += 1;
            curIndustryDataset[idx].d.push(info);           // collect data
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
          curIndustryDataset.push(data);         // start to collect 1st data
        }
      }
    }
  });
  // console.log(jobTenuresCollection);

  return {
    age: ageDatasets,
    gender: genderDatasets,
    education: educationDatasets,
    industry: industryDatasets,
  };
};

const temp = {};

export {
  genJobTenureSalaryChartData, temp,
};
