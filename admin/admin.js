// TÁŃVIⱤ SUPER ADMIN — Firebase Authentication
// This signs in an account, but does not itself grant admin permissions.
const byId = (id) => document.getElementById(id);

const status = byId("adminNotice") || byId("message");
const form = byId("adminForm");

if (byId("togglePassword")) {
  byId("togglePassword").addEventListener("click", () => {
    const input = byId("adminPassword");
    input.type = input.type === "password" ? "text" : "password";
    byId("togglePassword").textContent = input.type === "password" ? "Show" : "Hide";
  });
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      if (status) status.textContent = "Signing in…";
      const email = byId("adminEmail").value.trim();
      const password = byId("adminPassword").value;
      const credential = await firebase.auth().signInWithEmailAndPassword(email, password);

      if (byId("adminArea")) byId("adminArea").style.display = "block";
      if (byId("adminWho")) byId("adminWho").textContent = credential.user.email || credential.user.uid;
      if (status) status.textContent =
        "Signed in. Admin permissions are NOT verified yet. Do not use this as a live admin dashboard until secure role checks are added.";
    } catch (error) {
      if (status) status.textContent = error.message;
    }
  });
}

if (byId("adminLogout")) {
  byId("adminLogout").addEventListener("click", async () => {
    await firebase.auth().signOut();
    if (byId("adminArea")) byId("adminArea").style.display = "none";
    if (status) status.textContent = "Signed out.";
  });
}

firebase.auth().onAuthStateChanged((user) => {
  if (!user && byId("adminArea")) byId("adminArea").style.display = "none";
});
