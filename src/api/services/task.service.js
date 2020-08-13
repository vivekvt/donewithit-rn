import APIKit, {clientToken} from '../core/api-kit';
import {API_CONFIG} from '../api.config';

// removed

function getEmployeeTaskList(onSuccess, onFailure) {
  clientToken
    .getAccessToken()
    .then(accessToken => {
      console.log(accessToken);
      APIKit.get(API_CONFIG.EMPLOYEE_TASK_LIST, {
        params: {
          token: accessToken,
        },
      })
        .then(onSuccess)
        .catch(e => {
          console.log(e);
          clientToken.tokenExpired(onFailure);
        });
    })
    .catch(e => {
      console.log(e);
    });
}

function getVendorTaskList(onSuccess, onFailure) {
  clientToken
    .getAccessToken()
    .then(accessToken => {
      APIKit.get(API_CONFIG.VENDOR_TASK_LIST, {
        params: {
          token: accessToken,
        },
      })
        .then(onSuccess)
        .catch(e => {
          console.log(e);
          clientToken.tokenExpired(onFailure);
        });
    })
    .catch(e => {
      console.log(e);
    });
}

function getTaskList(checkEmployeeOrVender, onSuccess, onFailure) {
  checkEmployeeOrVender == 'employee'
    ? getEmployeeTaskList(onSuccess, onFailure)
    : getVendorTaskList(onSuccess, onFailure);
}

function updateTaskDetails(payload, onSuccess, onFailure) {
  clientToken
    .getAccessToken()
    .then(accessToken => {
      APIKit.post(API_CONFIG.UPDATE_TASK, payload, {
        params: {
          token: accessToken,
        },
      })
        .then(onSuccess)
        .catch(e => {
          console.log(e);
          clientToken.tokenExpired(onFailure);
        });
    })
    .catch(e => {
      console.log(e);
    });
}

function getNotes(onSuccess, onFailure) {
  clientToken
    .getAccessToken()
    .then(accessToken => {
      APIKit.get(API_CONFIG.GET_NOTES, {
        params: {
          token: accessToken,
        },
      })
        .then(onSuccess)
        .catch(e => {
          console.log(e);
          clientToken.tokenExpired(onFailure);
        });
    })
    .catch(e => {
      console.log(e);
    });
}

function createNote(payload, onSuccess, onFailure) {
  clientToken
    .getAccessToken()
    .then(accessToken => {
      APIKit.post(API_CONFIG.CREATE_NOTE, payload, {
        params: {
          token: accessToken,
        },
      })
        .then(onSuccess)
        .catch(e => {
          console.log(e);
          clientToken.tokenExpired(onFailure);
        });
    })
    .catch(e => {
      console.log(e);
    });
}

export {getTaskList, updateTaskDetails, getNotes, createNote};
