import {TIMEOUT_SECS} from './config';

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

export const AJAX = async function(url, uploadData = undefined) {


  try {
    const fetchData = uploadData ? fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(uploadData)
    }) : fetch(url);
  
    const res =  await Promise.race([fetchData, timeout(TIMEOUT_SECS)])

    if(!res.ok) {
      throw new Error('Please Enter A Valid Item')
    }
  
    const data = await res.json();
  
    return data;


  } catch(err) {
    throw err;


  }








}




// export const getJSON = async function(url) {
//    try {
//        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECS)])
//        const data = await res.json();
//         // console.log(data)
//        if(!res.ok) {
//          throw new Error('Please Enter A Valid Item')
//        }
//       return data
//    } catch(err) {
//        throw err;
//    }

// };


// export const sendJSON = async function(url, uploadData) {
//    try {
//      const postReq = fetch(url, {
//        method: 'POST', 
//        headers: {
//          'Content-Type': 'application/json', 
//        },
//        body: JSON.stringify(uploadData)
//      })

//      const res = await Promise.race([postReq, timeout(TIMEOUT_SECS)])
//      const data = await res.json();

//      if(!res.ok) throw new Error(`${data.message} ${res.status}`); 

//      return data;

//    } catch(err) {
//      throw err

//    }

// };