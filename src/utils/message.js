import Vue from 'vue';
// Vue.$toast is using vue-toast-notification

const success = (msg, position = 'top') => {
  Vue.$toast.success(msg, { position });
};

const warning = (msg, position = 'top') => {
  Vue.$toast.warning(msg, { position });
};

const error = (msg, position = 'top') => {
  Vue.$toast.error(msg, { position });
};

const log = (msg, showConsole = true, showSuccessToast = false, showWarningToast = false, showErrorToast = false) => {
  if (!msg) {
    return;
  }
  if (showConsole) {
    // eslint-disable-next-line
    console.log(msg);
  }
  if (showSuccessToast) {
    success(msg);
  }
  if (showWarningToast) {
    warning(msg);
  }
  if (showErrorToast) {
    error(msg);
  }
};

const logCatch = (msg, err) => {
  if (err && err.response && err.response.data && err.response.data) {
    log(`${msg} ${JSON.stringify(err.response.data)}`);
    log(`${msg} (${err.response.data.message})`, false, false, false, true);
  }
  else {
    log(`${msg}`, true, false, false, true);
  }
};

const toast = { success, warning, error };
export {
  toast, log, logCatch,
};
