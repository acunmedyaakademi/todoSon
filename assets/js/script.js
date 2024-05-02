import { saveToLocalStorage, toDo } from "./localStorage.js";


const form = document.getElementById('add-task-form');
const toDoEkle = document.querySelector('.todo');

// yapılacakları listeledim
function getToDo() {
    toDoEkle.innerHTML = '';
    for (let i = 0; i < toDo.length; i++) {
        const task = toDo[i];
        const li = document.createElement('li');

        // yapıalacak şeyi ve tarihini yazdım
        li.id = i;
        li.style.textDecoration = task.completed ? 'line-through' : 'none';
        li.innerHTML = `
            ${task.gorev} ${task.tarih ? `(Tarih: ${task.tarih})` : ''}
            <button class="editBtn">Düzenle</button>
            <button class="deleteBtn">Sil</button>
            <button class="okeyBtn">${task.completed ? 'Aktif Et' : 'Tamamlandı'}</button>
        `;

        toDoEkle.appendChild(li);
    }

    bindButtons(); // butonlara işlev atadım
}

// butonları çağırdım
function bindButtons() {
    bindDeleteBtns();
    bindEditBtns();
    bindOkeyBtns();
}

// yapılacka şeyi ekliyorum
function addGorev(e) {
    e.preventDefault();
    
    const taskInput = document.getElementById('task-input').value;
    const taskDateInput = document.getElementById('task-date-input').value; 
    
    if (taskInput.trim() === '') {
        alert("Lütfen bir görev girin.");
        return;
    }

    const newTask = {
        gorev: taskInput,
        completed: false,
        tarih: taskDateInput
    };
    
    // görevi ekrana pushladım
    toDo.push(newTask);
    // locale kaydetim
    saveToLocalStorage(); 
    getToDo(); 

    
    document.getElementById('add-task-form').reset();
}

// silme butonu
function bindDeleteBtns() {
    const deleteBtns = document.querySelectorAll('.deleteBtn');
    for (const deleteBtn of deleteBtns) {
        deleteBtn.addEventListener('click', function () {
            const taskId = Number(this.parentElement.id);
            toDo.splice(taskId, 1); 
            saveToLocalStorage(); 
            getToDo(); 
        });
    }
}

// düzenle butonu
function bindEditBtns() {
    const editBtns = document.querySelectorAll('.editBtn');
    for (const editBtn of editBtns) {
        editBtn.addEventListener('click', function () {
            const taskId = Number(this.parentElement.id);
            const newTask = prompt('Yeni görevi yazın:', toDo[taskId].gorev);
            if (newTask) {
                toDo[taskId].gorev = newTask; 
                saveToLocalStorage(); 
                getToDo(); 
            }
        });
    }
}

// tamamla ve aktif etme butonu
function bindOkeyBtns() {
    const okeyBtns = document.querySelectorAll('.okeyBtn');
    for (const okeyBtn of okeyBtns) {
        okeyBtn.addEventListener('click', function () {
            const taskId = Number(this.parentElement.id);
            toDo[taskId].completed = !toDo[taskId].completed; 
            saveToLocalStorage(); 
            getToDo(); 
        });
    }
}

// // locale kayıt
// function saveToLocalStorage() {
//     localStorage.setItem('toDo', JSON.stringify(toDo));
// }

// form kaydedildiğinde görevi ekliyorum
form.addEventListener('submit', addGorev);


getToDo();
