const byId = id => document.getElementById(id);
const modal = byId('userAuthModal');
byId('userLoginBtn').onclick=()=>{modal.style.display='grid';};
byId('closeAuth').onclick=()=>{modal.style.display='none';};
byId('emailSignIn').onclick=async()=>{
  try { await auth.signInWithEmailAndPassword(byId('userEmail').value.trim(),byId('userPassword').value); byId('authMessage').textContent='Signed in successfully.'; modal.style.display='none'; }
  catch(e){byId('authMessage').textContent=e.message;}
};
byId('emailSignUp').onclick=async()=>{
  try { await auth.createUserWithEmailAndPassword(byId('userEmail').value.trim(),byId('userPassword').value); byId('authMessage').textContent='Account created.'; modal.style.display='none'; }
  catch(e){byId('authMessage').textContent=e.message;}
};
byId('googleSignIn').onclick=async()=>{
  try { const provider=new firebase.auth.GoogleAuthProvider(); await auth.signInWithPopup(provider); modal.style.display='none'; }
  catch(e){byId('authMessage').textContent=e.message;}
};
byId('userLogoutBtn').onclick=()=>auth.signOut();
auth.onAuthStateChanged(user=>{
  byId('userStatus').textContent=user?`Signed in: ${user.email || user.phoneNumber || 'Customer'}`:'Sign in to manage your account and orders.';
  byId('userLoginBtn').style.display=user?'none':'inline-block';
  byId('userLogoutBtn').style.display=user?'inline-block':'none';
});
