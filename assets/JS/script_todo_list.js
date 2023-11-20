const listaDeTareas = document.querySelector("#tareas");
const btnAgregar = document.querySelector("#agregarTarea");
const tareaInput = document.querySelector("#nuevaTarea");
const cuentaTareas = document.getElementById("cuenta-tareas");
const cuentaTareasValidadas = document.getElementById("tareas-validadas");

let tareas = [
  { id: 1, tarea: "estudiar JS", completado: false },
  { id: 2, tarea: "estudiar HTML", completado: false },
  { id: 3, tarea: "estudiar CSS", completado: false },
];

btnAgregar.addEventListener("click", () => {
  // Se añade un listener de eventos asociados al click del botón agregar
  const nuevaTarea = tareaInput.value;
  tareas.push({ id: tareas.length + 1, tarea: nuevaTarea, completado: false });
  tareaInput.value = "";
  renderTareas(tareas);
});

function verificarCheckboxesChequeados() {
  // Obtener todos los checkboxes de tipo "checkbox" que se irán creando en la medida que se añadan tareas
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  // Filtrar los checkboxes chequeados y no chequeados para poder actualizar el arreglo
  const checkboxesChequeados = Array.from(checkboxes).filter(
    (checkbox) => checkbox.checked
  );
  const checkboxesNoChequeados = Array.from(checkboxes).filter(
    (checkbox) => !checkbox.checked
  );

  // Actualizar la información chequeada al arreglo de tareas
  checkboxesChequeados.forEach((checkbox) => {
    const tareaEncontrada = tareas.find(
      (tarea) => tarea.id === parseInt(checkbox.id)
    );
    tareaEncontrada.completado = true;
  });
  // Actualizar la información no chequeada al arreglo de tareas
  checkboxesNoChequeados.forEach((checkbox) => {
    const tareaEncontrada = tareas.find(
      (tarea) => tarea.id === parseInt(checkbox.id)
    );
    tareaEncontrada.completado = false;
  });
  // Actualización en página sobre la cantidad resueltas, usando los checkbox chequeados
  cuentaTareasValidadas.textContent = `Resueltas: ${checkboxesChequeados.length}`;
  // Imprime en consola la tabla de tareas, para corroborar que la información se guarda.
  console.table(tareas);
}

function renderTareas(tareas) {
  // función que actualiza la página web tras una modificación, añadir o eliminar tarea.
  let html = "";
  for (task of tareas) {
    html += `<li>${task.tarea} <button onclick="borrar(${task.id})"> x </button><input type="checkbox" id=${task.id} class="checkboxTarea">
    </li>`;
  }
  listaDeTareas.innerHTML = html;
  cuentaTareas.textContent = `Total: ${tareas.length}`;
}

function borrar(id) {
  // función para eliminar tarea, se realiza en conjunto con el botón "x"
  const index = tareas.findIndex((ele) => ele.id == id);
  tareas.splice(index, 1);
  renderTareas(tareas);
}
