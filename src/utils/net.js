// import { log } from './message';

/** API response process
 * callback:
 * - success()
 * - failure(needToLogin)
 * - noResponse()
 * - needToLogin()
 */
const axiosThen = (response, success, failure, noResponse) => {
  if (response && response.data) {
    if (response.data) {
      success();
    }
    else {
      failure();
    }
  }
  else {
    noResponse();
  }
};

const temp = () => {};

export { axiosThen, temp };
