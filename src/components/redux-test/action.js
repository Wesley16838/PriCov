export const dologin = () => ({
    type: "login",
    state: 'login',
    word: 'Log out',
    to: '/'
  });
  
  export const dologout = () => ({
    type: "logout",
    state: 'logout',
    word: 'Log In',
    to: '/Signin'
  });
  
  /*
     We can give a "payload" that can be used in our reducer
  */
  export const specify = status => ({
    type: "SPEC",
    payload: status
  });
  