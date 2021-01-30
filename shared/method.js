const JsonResponse = (status, message, data) => {
    return {
        message,
        status,
        data,
    }
}

const vowel = ['a','e','i','o','u'];

  const checkType = (val) => {
      if(vowel.includes(val.charAt(0).toLowerCase())){
          return 'an';
      } else{
          return 'a'
      }
  }

  const checkCondition = (field, val, condition) => {
    switch(val){
        case 'gte':
            return field >= condition;
        case 'eq':
            return field == condition;
        case 'neq':
            return field != condition;
        case 'gt':
            return field > condition;
        case 'contains':
            return field.includes(contains);
        default:
            return false;
    }
}


const ress = (status, name, value, condition, condition_value) => {
 return  {validation : {
      error : status === 'success' ? false : 'true',
      field: name,
      field_value: value,
      condition: condition,
      condition_value: condition_value
    }
  }
}

module.exports = {
    JsonResponse,
    checkType,
   checkCondition,
   ress
}

