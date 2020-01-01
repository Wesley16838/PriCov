import { auth, firebase } from "./firebase";

async function doCreateUserWithEmailAndPassword(email, password, displayName) {

  await auth.createUserWithEmailAndPassword(email, password);
 
  auth.currentUser.updateProfile({ displayName: displayName });
  console.log(`DISPLAY NAME ${displayName}`);

}

async function doSignInWithEmailAndPassword(email, password) {
  await auth.signInWithEmailAndPassword(email, password);
}

async function doSocialSignIn(provider) {
  let socialProvider = null;
  if (provider === "google") {
    socialProvider = new firebase.auth.GoogleAuthProvider();
  } 

  await auth.signInWithPopup(socialProvider);
}

async function doPasswordReset(email) {
  await auth.sendPasswordResetEmail(email);
}
// async function reauth(passwordOld){
//   var user = auth.currentUser;
//   var credential = await firebase.auth.EmailAuthProvider.credential(
//     user.email, 
//     passwordOld
//   );
// }
async function doPasswordUpdate(passwordOld,passwordNew) {
 
  var user = auth.currentUser;
  var credential = await firebase.auth.EmailAuthProvider.credential(
    user.email, 
    passwordOld
);

  await user.reauthenticateWithCredential(credential)
 
  await auth.currentUser.updatePassword(passwordNew)

  
}

async function doSignOut() {

  await auth.signOut();
}
async function removeUser(password){
 
  var user = auth.currentUser;

  var credential = await firebase.auth.EmailAuthProvider.credential(
    user.email, 
    password
  );

 
  await user.reauthenticateWithCredential(credential)

  await user.delete()
 
}

export {
  doCreateUserWithEmailAndPassword,
  doSocialSignIn,
  doSignInWithEmailAndPassword,
  doPasswordReset,
  doPasswordUpdate,
  doSignOut,
  removeUser
};
