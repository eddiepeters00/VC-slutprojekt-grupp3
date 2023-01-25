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

let cardColor;
const progressBar = document.getElementById('progress-bar');
let timestamp;


// input-message som sparas i databas
const usernameInput = document.querySelector('#username')
const messageBox = document.querySelector('#message-input');
const messageBtn = document.querySelector('#message-btn');
messageBtn.addEventListener('click', createMessage);
const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/779");


//Get the background-color from color-picker
const pickedColors = document.querySelectorAll('.picked-color');

pickedColors.forEach(color => {
    color.addEventListener('click', function () {
        cardColor = getComputedStyle(this).backgroundColor;
        messageBox.style.backgroundColor = cardColor;
    });
});


function createMessage(event) {
    event.preventDefault();
    getTimestamp();

    const username = usernameInput.value;
    const userMessage = messageBox.value;
    audio.play();

    //if-sats för att user måste ange ett username och ett message
    if (username == "" && userMessage == "") {
        alert("Username required & message-box cannot be empty")
    }

    else if (username == "") {
        alert("Username required")
    }

    else if (userMessage == "") {
        alert("Message-box cannot be empty")
    }

    else {
        //Pushar message till databasen
        push(ref(db, "/"), {

            name: username,
            message: userMessage,
            color: cardColor,
            time: timestamp
        })

        console.log(userMessage)
        usernameInput.value = '';
        messageBox.value = '';
    }
}

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
        messageForBoard.style.backgroundColor = childData.color;
        const messageP = document.createElement('p');
        messageForBoard.appendChild(messageP);
        const timestampText = document.createElement('p');
        messageForBoard.appendChild(timestampText);

        timestampText.innerText = childData.time;
        messageP.innerText = childData.message;
        messageForBoard.classList.add("messageCard");

        messageP.innerText = childData.name + ": " + childData.message;

        progressBar.style.display = 'none';
    });
});

function getTimestamp() {
    // get timestamp
    const date = new Date();
    const dateToString = date.toString();
    const dateSplit = dateToString.split(' ');
    console.log(dateSplit);
    timestamp = `${dateSplit[1]} ${dateSplit[2]} ${dateSplit[3]} ${dateSplit[4]}`;
    console.log(timestamp);
}

//Search functions, display in a container and show the total hits of matching word
const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');

onValue(ref(db, '/'), (snapshot) => {
    searchBtn.addEventListener('click', searchMessages);
    function searchMessages() {
        const searchQuery = searchInput.value.toLowerCase();
        const filteredMessages = [];
        snapshot.forEach(childSnapshot => {
            if (childSnapshot.val().message.toLowerCase().includes(searchQuery.toLowerCase()))
                filteredMessages.push(childSnapshot);
        });

        const searchResultsContainer = document.querySelector('#search-results-container');
        searchResultsContainer.innerHTML = '';

        filteredMessages.forEach(function (childSnapshot) {
            const childData = childSnapshot.val();
            const messageDiv = document.createElement('div');
            messageDiv.innerText = childData.name + ": " + childData.message;
            messageDiv.style.backgroundColor = childData.color;
            messageDiv.classList.add("messageCard");
            searchResultsContainer.appendChild(messageDiv);
        });

        const searchResultCount = document.querySelector('#search-result-count');
        searchResultCount.innerText = `${filteredMessages.length} matching results`;
    }
});