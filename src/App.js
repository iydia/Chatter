import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAkPf8rbPKkaoiYSvV4tLlOm_rbH9pG3U",
  authDomain: "chatter-5283e.firebaseapp.com",
  projectId: "chatter-5283e",
  storageBucket: "chatter-5283e.appspot.com",
  messagingSenderId: "700969170654",
  appId: "1:700969170654:web:f1f7e1e8e0ff639335744f",
  measurementId: "G-1E3K1N8X75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  
  return (
    <div className="App">
      <header>
      </header>
      <section>
        {user ? <Chatroom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, {idField: 'id'});

  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key = {msg.id} message={msg} />)}
      </div>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid } = props.message;

  return <p>
    {text}
  </p>
}

export default App;
