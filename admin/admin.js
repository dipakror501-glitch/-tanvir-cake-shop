// TÁŃVIⱤ SUPER ADMIN — Firebase Authentication + Admin UID Check
const byId = (id) => document.getElementById(id);
const status = byId("adminNotice") || byId("message");
const form = byId("adminForm");
const ADMIN_UID = "vtKNxlGQ9mbqV4i5xrodgAQDKUd2";
function showStatus(message) {
  if (status) status.textContent = message;
}
function hideAdminArea() {
  if (byId("adminArea")) byId("adminArea").style.display = "none";
}
if (byId("togglePassword")) {
  byId("togglePassword").addEventListener("click", () => {
    const input = byId("adminPassword");
    input.type = input.type === "password" ? "text" : "password";
    byId("togglePassword").textContent =
      input.type === "password" ? "Show" : "Hide";
  });
}
async function verifyAdmin(user) {
  const snapshot = await firebase.database()
    .ref("admins/" + user.uid)
    .once("value");
  return user.uid === ADMIN_UID && snapshot.val() === true;
}
if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    hideAdminArea();
    try {
      showStatus("Signing in and verifying admin permission...");
      const email = byId("adminEmail").value.trim();
      const password = byId("adminPassword").value;
      const credential = await firebase.auth()
        .signInWithEmailAndPassword(email, password);
      const allowed = await verifyAdmin(credential.user);
      if (!allowed) {
        await firebase.auth().signOut();
        showStatus("Access denied. This account is not an authorized admin.");
        return;
      }
      if (byId("adminArea")) {
        byId("adminArea").style.display = "block";
      }
      if (byId("adminWho")) {
        byId("adminWho").textContent = credential.user.email;
      }
      showStatus("Admin UID verified. Admin login successful.");
    } catch (error) {
      hideAdminArea();
      showStatus("Login or permission check failed: " + error.message);
    }
  });
}
if (byId("adminLogout")) {
  byId("adminLogout").addEventListener("click", async () => {
    await firebase.auth().signOut();
    hideAdminArea();
    showStatus("Signed out.");
  });
}
