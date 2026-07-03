import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const visitorRef = ref(db, "visitors/count");

// 방문자 증가
get(visitorRef).then((snapshot) => {
  let count = snapshot.exists() ? snapshot.val() : 0;
  count++;

  set(visitorRef, count);
});

// 실시간 반영
onValue(visitorRef, (snapshot) => {
  document.getElementById("visitorCount").innerText = snapshot.val();
});