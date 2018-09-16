//TYPES
const CANCEL_WIZARD = "CANCEL_WIZARD";
const ADD_WIZARD_ONE_INFO = "ADD_WIZARD_ONE_INFO";
const ADD_WIZARD_TWO_INFO = "ADD_WIZARD_TWO_INFO";
const ADD_WIZARD_THREE_INFO = "ADD_WIZARD_THREE_INFO";
const ADD_WIZARD_FOUR_INFO = "ADD_WIZARD_FOUR_INFO";
const ADD_WIZARD_FIVE_INFO = "ADD_WIZARD_FIVE_INFO";


//ACTION BUILDERS
export function cancelWizard() {
  return {
    type: CANCEL_WIZARD,
    payload: {
      p_name: "",
      p_description: "",
      p_address: "",
      p_city: "",
      p_state: "",
      p_zip: 0,
      p_img_url: "",
      p_loan_amount: 0.00,
      p_monthly_mortgage: 0.00,
      p_recommended_rent: 0.00,
      p_desired_rent: 0.00
    }
  }
}

export function addWizardOneInfo(wizardOneInfo) {
  return {
    type: ADD_WIZARD_ONE_INFO,
    payload: wizardOneInfo
  }
}

export function addWizardTwoInfo(wizardTwoInfo) {
  return {
    type: ADD_WIZARD_TWO_INFO,
    payload: wizardTwoInfo
  }
}

export function addWizardThreeInfo(wizardThreeInfo) {
  return {
    type: ADD_WIZARD_THREE_INFO,
    payload: wizardThreeInfo
  }
}

export function addWizardFourInfo(wizardFourInfo) {
  return {
    type: ADD_WIZARD_FOUR_INFO,
    payload: wizardFourInfo
  }
}

export function addWizardFiveInfo(wizardFiveInfo) {
  return {
    type: ADD_WIZARD_FIVE_INFO,
    payload: wizardFiveInfo
  }
}


const initialState = {
  p_name: "",
  p_description: "",
  p_address: "",
  p_city: "",
  p_state: "",
  p_zip: 0,
  p_img_url: "",
  p_loan_amount: 0.00,
  p_monthly_mortgage: 0.00,
  p_recommended_rent: 0.00,
  p_desired_rent: 0.00
}


//REDUCER FUNCTION
export default function reducer(state = initialState, action) {

  switch(action.type) {
    case CANCEL_WIZARD:
    return Object.assign({}, state, {
      p_name: action.payload.p_name,
      p_description: action.payload.p_description,
      p_address: action.payload.p_address,
      p_city: action.payload.p_city,
      p_state: action.payload.p_state,
      p_zip: action.payload.p_zip,
      p_img_url: action.payload.p_img_url,
      p_loan_amount: action.payload.p_loan_amount,
      p_monthly_mortgage: action.payload.p_monthly_mortgage,
      p_recommended_rent: action.payload.p_recommended_rent,
      p_desired_rent: action.payload.p_desired_rent
    });

    case ADD_WIZARD_ONE_INFO:
        return Object.assign({}, state, {
          p_name: action.payload.p_name,
          p_description: action.payload.p_description
        });

    case ADD_WIZARD_TWO_INFO:
        return Object.assign({}, state, {
          p_address: action.payload.p_address,
          p_city: action.payload.p_city,
          p_state: action.payload.p_state,
          p_zip: action.payload.p_zip
        });

    case ADD_WIZARD_THREE_INFO:
        return Object.assign({}, state, {
          p_img_url: action.payload.p_img_url
        });

    case ADD_WIZARD_FOUR_INFO:
        return Object.assign({}, state, {
          p_loan_amount: action.payload.p_loan_amount,
          p_monthly_mortgage: action.payload.p_monthly_mortgage,
          p_recommended_rent: action.payload.p_recommended_rent
        });

    case ADD_WIZARD_FIVE_INFO:
        return Object.assign({}, state, {
          p_desired_rent: action.p_desired_rent
        });

    default:
        return state;
  }
}