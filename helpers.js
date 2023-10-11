function generateError (msg, code){
  const err = new Error(msg);
  err.httpStatus = code;
  throw err;
};


function generateTodayDate (){

  //data DD/MM/AAAA HH:MM:SS
  const today = new Date();

  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const hours = String(today.getHours()).padStart(2, '0');
  const minutes = String(today.getMinutes()).padStart(2, '0');
  const seconds = String(today.getSeconds()).padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  //day of week 

  const dayOfWeek = today.getDay();
  const dayOfWeekArray = ['DOMINGO', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO'];
  const todayDayName = dayOfWeekArray[dayOfWeek];

  return {formattedDate, todayDayName}; ;
}

function generateServiceDayName(dayServiceNumberDate){

  var objetoFecha = new Date(dayServiceNumberDate);

  const numDayJavaScript = objetoFecha.getDay();

  const dayOfWeekArray = ['DOMINGO', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO'];

  const dayServiceNumberName = dayOfWeekArray[numDayJavaScript];

  return dayServiceNumberName;
}

module.exports = {generateError, generateTodayDate, generateServiceDayName};


