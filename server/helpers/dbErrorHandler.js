
const getUniqueErrorMessage = (err) => {
  let output
  try {
    let fieldName = err.message.substring(
      err.message.lastIndexOf('.$') + 2,
      err.message.lastIndexOf('_1')
    )
    output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists'
  } catch (err) {
    output = 'Unique Field Already Exists'
  }

  return output
}

const getErrorMessage = (err) => {
  let message = ''
  if(err.code){
    switch(err.code){
      case 11000:
      case 11001:
        message = getUnqieErrorMessage(err)
        break;
      default:
        message = 'Something Went Wrong'
    }
  }else{
    for(let errName in err.errors){
      if(err.errors[errName].message)
      message = err.errors[errName].message
    }
  }
  return message
}

export default {getErrorMessage}
