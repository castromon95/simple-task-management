let tasksUniqueId = 0;
let targetTaskId = null;

const submitTask = () => {
  if(targetTaskId) {
    updateTask();
  } else {
    createTask();
  }
  $('#taskModal').modal('hide');
  clearForm();
}

const createTask = () => {
  tasksUniqueId++;
  $( ".list-container" ).append(currentTask());
};

const deleteTask = (id) => {
  $(`#task${id}`).remove();
};

const clearForm = () => {
  $('#title').val('');
  $('#level').val('primary');
  $('#date').val('');
  $('#description').val('');
}

const openModal = (id = null) => {
  targetTaskId = id;
  if (id) {
    populateModal();
  }
  $('#taskModal').modal();
};

const updateTask = () => {
  const currentTask = $(`#task${targetTaskId}`);
  currentTask.find('.task-title').text($('#title').val());
  currentTask.find('.task-level').text($('#level').val());
  currentTask.find('.task-level-label').text($('#level option:selected').text());
  currentTask.find('.task-level-label').removeClass("btn-primary btn-warning btn-danger").addClass(`btn-${$('#level').val()}`);
  currentTask.find('.task-level-button').removeClass("btn-primary btn-warning btn-danger").addClass(`btn-${$('#level').val()}`);
  currentTask.find('.task-date').text($('#date').val());
  currentTask.find('.task-description').text($('#description').val());
};

const populateModal = () => {
  const currentTask = $(`#task${targetTaskId}`);
  $('#title').val(currentTask.find('.task-title').text());
  $('#level').val(currentTask.find('.task-level').text());
  $('#date').val(currentTask.find('.task-date').text());
  $('#description').val(currentTask.find('.task-description').text());
};

const currentTask = () => newTask(
  $('#title').val(), $('#level').val(), $('#level option:selected').text(),
  $('#date').val(), $('#description').val()
);

const addSampleTask = () => {
  tasksUniqueId++;
  const sampleDescription = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  $( ".list-container" ).append(newTask('Sample task', 'danger', 'High', '03/01/2020', sampleDescription));
};

const newTask = (title, level, levelLabel, date, description) => `
  <div class="card my-2" id="task${tasksUniqueId}">
    <div class="card-body">
      <div class="row">
        <div class="col-7">
          <h5 class="card-title task-title">${title}</h5>
        </div>
        <div class="col-5 text-right">
          <span class="d-none task-level">${level}</span>
          <div class="btn-group">
            <button type="button" class="btn btn-${level} btn-sm task-level-label">${levelLabel}</button>
            <button type="button" class="btn btn-${level} btn-sm dropdown-toggle dropdown-toggle-split task-level-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="sr-only">Toggle Dropdown</span>
            </button>
            <div class="dropdown-menu">
              <a class="dropdown-item" onclick="openModal(${tasksUniqueId});">Edit</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" onClick="deleteTask(${tasksUniqueId});">Delete</a>
            </div>
          </div>
        </div>
      </div>
      <h6 class="card-subtitle mb-2 text-muted"><b>Deadline: </b><span class="task-date">${date}</span></h6>
      <hr class="my-1"/>
      <div class="overflow-auto w-100 p-2 text-justify item">
        <p class="task-description">${description}</p>
      </div>
    </div>
  </div>
`;

$( document ).ready(function() {
  addSampleTask();
});
