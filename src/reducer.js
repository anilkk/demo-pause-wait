export const initialState = {
  pasueDuration: 3000,
  isPauseDemoRunning: false,
  demoDuration: 2000
};
const reducer = (state, action) => {
  switch (action.type) {
    case "incrementPause":
      return { ...state, pasueDuration: state.pasueDuration + 1000 };
    case "decrementPause":
      if (state.pasueDuration === 2000) {
        return { ...state, pasueDuration: state.pasueDuration };
      } else if (state.demoDuration >= state.pasueDuration - 1000) {
        return {
          ...state,
          pasueDuration: state.pasueDuration - 1000,
          demoDuration: state.pasueDuration - 2000
        };
      } else {
        return { ...state, pasueDuration: state.pasueDuration - 1000 };
      }
    case "updatePauseDemoRunning":
      return { ...state, isPauseDemoRunning: action.isPauseDemoRunning };
    case "incrementDemoDuration":
      return state.demoDuration + 1000 >= state.pasueDuration
        ? { ...state, demoDuration: state.demoDuration }
        : { ...state, demoDuration: state.demoDuration + 1000 };
    case "decrementDemoDuration":
      return state.demoDuration === 1000
        ? { ...state, demoDuration: state.demoDuration }
        : { ...state, demoDuration: state.demoDuration - 1000 };
    case "updateDemoDuration":
      return {
        ...state,
        demoDuration: action.demoDuration
      };
    default:
      throw new Error();
  }
};

export default reducer;
