import { auth, firebase } from "./firebase";

async function doCreateUserWithEmailAndPassword(email, password, displayName) {
  console.log('bf in create account!!!')
  await auth.createUserWithEmailAndPassword(email, password);
  console.log('af in create account!!!')
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
  console.log('in do password update')
  var user = auth.currentUser;
  var credential = await firebase.auth.EmailAuthProvider.credential(
    user.email, 
    passwordOld
);
  console.log('af credential')
  await user.reauthenticateWithCredential(credential)
  console.log('af reauth')
  await auth.currentUser.updatePassword(passwordNew)
  console.log('af update')
  
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

  console.log('af credential')
  await user.reauthenticateWithCredential(credential)
  console.log('af reauth')
  await user.delete()
  console.log('af delete')
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
