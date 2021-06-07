export const initialState = {
  id: '',
  title: { value: '', isTouched: false, isValid: false },
  date: { value: '', isTouched: false, isValid: false },
  moodId: { value: '', isTouched: false, isValid: false },
  journalEntry: { value: '', isTouched: false, isValid: false },
};

export const entryFormReducer = (state, action) => {
  const updatedElement = { ...state[action.field] };
  if (action.type === 'INPUT') {
    updatedElement.value = action.payload;
    return { ...state, [action.field]: updatedElement };
  } else if (action.type === 'BLUR') {
    const isNotEmpty = (value) => value.trim() !== '';
    updatedElement.isTouched = true;
    updatedElement.isValid = isNotEmpty(action.payload);
    return { ...state, [action.field]: updatedElement };
  } else if (action.type === 'EDIT') {
    return {
      id: action.payload.id,
      title: { value: action.payload.title, isTouched: false, isValid: true },
      date: { value: action.payload.date, isTouched: false, isValid: true },
      moodId: {
        value: action.payload.moodId,
        isTouched: false,
        isValid: true,
      },
      journalEntry: {
        value: action.payload.journalEntry,
        isTouched: false,
        isValid: true,
      },
    };
  } else if (action.type === 'SUBMIT') {
    return {
      ...state,
      title: { ...state.title, isTouched: true },
      date: { ...state.date, isTouched: true },
      moodId: { ...state.moodId, isTouched: true },
      journalEntry: { ...state.journalEntry, isTouched: true },
    };
  } else {
    return;
  }
};
