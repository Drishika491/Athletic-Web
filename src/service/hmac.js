import CryptoJS from 'crypto-js';
import { getCookie, setCookie } from './config';
// const crypt = CryptoJS;

// key dev
// const key = 'u7x!A%C$C-JaNdRgUkXp2s5v8y/B!E(H+MbPeShVmYq8t6w9z$C&F)J@NcRfTjW'
const key = 'nZq4t7w!z%C*F-JaNdRgUkXp2s5u8x/A?D(G+KbPeShVmYq3t6w9y$B&E)H@McQf'


const getDateNowString=()=>{
    return new Date().toUTCString();
}

const callback= (err,cookie)=>{
    if(err)console.log(err);
}

const run = async (method) => {
    let xauth = localStorage.getItem('xauth');
    // let xauth = getCookie('xauth');
  
    if(xauth === null){
      let date = getDateNowString();
      const data = `CONTENT\n${date}\n82c7n8iv\n${method}`;
      //const keyBuffer = (new TextEncoder).encode(key);
      var hash = CryptoJS.HmacSHA256(data, key);
      var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
          
      // console.log(`X-Auth=signature=${hashInBase64}`);
          
      ('xauth',`signature=${hashInBase64}`);
      localStorage.setItem('xauthdate',date);
      localStorage.setItem('xrequestid',`82c7n8iv`);
      // localStorage.setItem('xauth',`signature=${hashInBase64}`);
  
      setCookie('xauth',`signature=${hashInBase64}`);
      xauth = `signature=${hashInBase64}`;
    }
    return xauth;
  }
  


export default run