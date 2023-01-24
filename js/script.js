// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, ref, set, onValue, remove, push, update } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    databaseURL: 'https://vc-slutprojekt-grupp4-default-rtdb.europe-west1.firebasedatabase.app/',
    apiKey: "AIzaSyD1l-NXN8r-Cvi1XrFO3oEgtDhwGfeaDvE",
    authDomain: "vc-slutprojekt-grupp4.firebaseapp.com",
    projectId: "vc-slutprojekt-grupp4",
    storageBucket: "vc-slutprojekt-grupp4.appspot.com",
    messagingSenderId: "559571095134",
    appId: "1:559571095134:web:0e5635665f81596885eecf"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log(db);


// input-message som sparas i databas
const usernameInput = document.querySelector('#username')
const messageBox = document.getElementById('#message-input');
const messageBtn = document.querySelector('#message-btn');
messageBtn.addEventListener('click', createMessage);


function createMessage(event) {
    event.preventDefault();

    console.log(userMessage);

    const username = usernameInput.value;
    const userMessage = messageBox.value;

    // Write data
    function writeUserData() {
        set(ref(db, `${username}`), {
            message: `${userMessage}`
        });
    }

    writeUserData();

    console.log(userMessage)
    usernameInput.value = '';
    messageBox.value = '';
}

// Change color of input/textarea

const colorPicker = document.querySelector("#color-picker");

function pickColor(event) {
    let cardColor= event.target.id;
    console.log(cardColor)
    messageBox.style.backgroundColor = cardColor;
}

colorPicker.addEventListener("click",pickColor);

// Loop through messages and display
onValue(ref(db, '/'), (snapshot) => {
    const messageDiv = document.querySelector('#messages');
    messageDiv.innerHTML = '';


    snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        console.log(childKey, childData);

        const messageForBoard = document.createElement('div');
        messageDiv.prepend(messageForBoard);
        const messageP = document.createElement('p');
        messageForBoard.appendChild(messageP);
        messageP.innerText = childData.message;
    });
});

//Pushar message till databasen
push( ref(db , "/") , {
name:"Johan",
message:"hello world"

})