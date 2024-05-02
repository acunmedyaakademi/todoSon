// locale kayıt
export function saveToLocalStorage() {
          localStorage.setItem('toDo', JSON.stringify(toDo));
      }
export let toDo = localStorage.toDo ? JSON.parse(localStorage.toDo) : [];