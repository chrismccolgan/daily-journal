import { useReducer, useCallback } from 'react';
import {
  getAllEntries,
  getEntry,
  addEntry,
  updateEntry,
} from '../components/Entry/EntryApi';

const reducer = (state, action) => {
  if (action.type === 'SEND') {
    return {
      data: null,
      error: null,
      status: 'pending',
    };
  }

  if (action.type === 'SUCCESS') {
    return {
      data: action.responseData,
      error: null,
      status: 'completed',
    };
  }

  if (action.type === 'ERROR') {
    return {
      data: null,
      error: action.errorMessage,
      status: 'completed',
    };
  }

  return state;
};

const useHttp = (startWithPending = false) => {
  const [state, dispatch] = useReducer(reducer, {
    status: startWithPending ? 'pending' : null,
    data: null,
    error: null,
  });

  const sendRequest = async (requestFunction, requestData) => {
    dispatch({ type: 'SEND' });
    try {
      const responseData = await requestFunction(requestData);
      dispatch({ type: 'SUCCESS', responseData });
      return await responseData;
    } catch (error) {
      dispatch({
        type: 'ERROR',
        errorMessage: error.message || 'Something went wrong!',
      });
    }
  };

  return {
    ...state,
    getAllEntries: () => sendRequest(getAllEntries),
    getEntry: (requestData) => sendRequest(getEntry, requestData),
    addEntry: (requestData) => sendRequest(addEntry, requestData),
    updateEntry: (requestData) => sendRequest(updateEntry, requestData),
  };
};

export default useHttp;
