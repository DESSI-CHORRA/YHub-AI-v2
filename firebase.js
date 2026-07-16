import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
GoogleAuthProvider,
signInWithPopup,
signOut,
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig={

apiKey:"AIzaSyCbj1ZU71sjGWoS_X8rkI_mLXKmveiM7cQ",

authDomain:"yhub-ai-v2.firebaseapp.com",

projectId:"yhub-ai-v2",

storageBucket:"yhub-ai-v2.firebasestorage.app",

messagingSenderId:"814803965231",

appId:"1:814803965231:web:d96317f95e40b9d4527dda"

};

const app=

initializeApp(firebaseConfig);

const auth=

getAuth(app);

const provider=

new GoogleAuthProvider();


window.googleLogin=

()=>signInWithPopup(

auth,

provider

);

window.logout=

()=>signOut(auth);


onAuthStateChanged(

auth,

user=>{

console.log(user);

}

);