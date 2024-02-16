
const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
const tokenString = (localStorage.getItem("token"));
let token = '';

if (adminInfo && tokenString ) {
    token = tokenString;
}

console.log("token hhh",token);

export const authHeader = () => {
  const headers =  { "Authorization": `Bearer ${token}` }
  return headers;
}

export const multipartHeader = () => {

  const headers = {
    'x-access-token': token,
  }
  return headers;
}

export default { authHeader, multipartHeader };