// Import the necessary functions from Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, addDoc, deleteDoc, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyALHU_SnJkI3_YhgOsvj5Uet-zZUe6zvks",
    authDomain: "practice-b4dd1.firebaseapp.com",
    projectId: "practice-b4dd1",
    storageBucket: "practice-b4dd1.appspot.com",
    messagingSenderId: "562615560889",
    appId: "1:562615560889:web:21f2654dcd7c15d1028968"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const addTodoButton = document.getElementById('add-todo');

// Fetch and display existing todos
const todosCollection = collection(db, "todos");
onSnapshot(todosCollection, snapshot => {
    todoList.innerHTML = '';
    snapshot.forEach(doc => {
        const todo = doc.data();
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        todoItem.innerHTML = `
            <span>${todo.text}</span>
            <button onclick="deleteTodo('${doc.id}')">Delete</button>
        `;
        todoList.appendChild(todoItem);
    });
});

// Add new todo to Firestore
addTodoButton.addEventListener('click', async () => {
    const text = todoInput.value.trim();
    if (text) {
        await addDoc(todosCollection, { text });
        todoInput.value = '';
    }
})

// Delete To-Do Items
window.deleteTodo = async (id) => {
    const todoDoc = doc(db, "todos", id);
    await deleteDoc(todoDoc);
};
