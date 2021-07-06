import { useReducer, useCallback } from 'react';

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

  const sendRequest = useCallback(async (requestFunction, requestData) => {
    dispatch({ type: 'SEND' });
    try {
      const responseData = await requestFunction(requestData);
      dispatch({ type: 'SUCCESS', responseData });
    } catch (error) {
      dispatch({
        type: 'ERROR',
        errorMessage: error.message || 'Something went wrong!',
      });
    }
  }, []);

  return {
    sendRequest,
    ...state,
  };
};

export default useHttp;
