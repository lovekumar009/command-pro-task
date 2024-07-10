
// insert a new line
document.getElementById('insert-line').addEventListener('click', function () {
  const container = document.getElementById('actions-container');
  const clone = container.cloneNode(true);
  container.parentNode.insertBefore(clone, container.nextSibling);
});

// Toggle visibility of actions-container-wrapper
document.getElementById('toggle-visibility').addEventListener('click', function () {
  const wrapper = document.getElementById('actions-container-wrapper');
  const button = document.getElementById('toggle-visibility');
  wrapper.classList.toggle('hidden');
  if (wrapper.classList.contains('hidden')) {
    button.textContent = 'Show';
  } else {
    button.textContent = 'Hide';
  }
});

// Loader modal
document.getElementById('saveButton').addEventListener('click', function () {

  var modal = document.getElementById('loadingModal');
  modal.style.display = 'flex';


  setTimeout(function () {
    modal.style.display = 'none';
    window.location.href = 'thankyou.html';
  }, 2000);
});


// Modal functionality
document.addEventListener('DOMContentLoaded', () => {
  let storageData = window.localStorage.getItem("data");
  let data = JSON.parse(storageData);

  const taskList = document.getElementById('action-list');
  let task = []
  let staticData = [
    {
      for_poc: "dsgcdw",
      poc_briefed: "dscdsc",
      start_date: "01-01-1901",
      actual_date: "01-01-1901",
      target_date: "01-01-1901"
    },
    {
      for_poc: "xgx",
      poc_briefed: "kh",
      start_date: "01-01-1901",
      actual_date: "01-01-1901",
      target_date: "01-01-1901"
    },
    {
      for_poc: "xzgd",
      poc_briefed: "szs",
      start_date: "01-01-1901",
      actual_date: "01-01-1901",
      target_date: "01-01-1901"
    },
    {
      for_poc: "dzd",
      poc_briefed: "dfz",
      start_date: "01-01-1901",
      actual_date: "01-01-1901",
      target_date: "01-01-1901"
    }
  ]

  if (data?.length > 0) {
    task = data
  } else {
    task = staticData
  }

  renderTasks();

  function addTask() {
    const for_poc_input = document.getElementById('for-poc').value.trim();
    const poc_briefed_input = document.getElementById('poc-briefed').value.trim();
    const start_date_input = document.getElementById('start-date').value.trim();
    const target_date_input = document.getElementById('target-date').value.trim();
    const actual_date_input = document.getElementById('actual-date').value.trim();

    const newTask = {
      for_poc: for_poc_input,
      poc_briefed: poc_briefed_input,
      start_date: start_date_input,
      actual_date: actual_date_input,
      target_date: target_date_input
    };
    task.push(newTask);
    renderTasks();
    window.localStorage.setItem("data", JSON.stringify(task));

    var modal = document.getElementById('loadingModal');
    modal.style.display = 'flex';


    setTimeout(function () {
      modal.style.display = 'none';
      window.location.href = 'thankyou.html';
    }, 2000);
  }


  window.localStorage.setItem("data", JSON.stringify(task));
  const statusSelect = document.getElementById('status-select');
  const modal = document.getElementById('confirmation-modal');
  const yesButton = document.getElementById('yes-button');
  const noButton = document.getElementById('no-button');
  document.getElementById('saveButton').addEventListener('click', addTask)


  statusSelect.addEventListener('change', (event) => {
    if (event.target.value === 'Done') {
      modal.style.display = 'block';
    } else {
      modal.style.display = 'none';
    }
  });

  yesButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  noButton.addEventListener('click', () => {
    modal.style.display = 'none';
    statusSelect.value = '--Select--';

  });


  function renderTasks() {
    taskList.innerHTML = '';

    task.forEach((task, index) => {
      const newActionItem = document.createElement('div');
      newActionItem.classList.add('action-item');
      newActionItem.innerHTML = `
        <h2>${index+1} Lorem Ipsum</h2>
        <p>
          <strong>For/Poc:</strong> ${task.for_poc};
          <strong>POC Briefed:</strong> ${task.poc_briefed}
        </p>
        <p><strong>Start Date:</strong> ${task.start_date}</p>
        <p><strong>Target Date:</strong> ${task.target_date}</p>
        <p><strong>Actual Date:</strong> ${task.actual_date}</p>
        <div class="icons">
          <i class="fa-solid fa-pen"></i>
          <i class="fa-solid fa-trash-can delete-btn" data-index="${index}"></i>
        </div>
      `;

      taskList.appendChild(newActionItem);
    });

    // Add event listeners to all delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
      button.addEventListener('click', () => {
        const index = button.getAttribute('data-index');
        deleteAction(index);
      });
    });

    function deleteAction(index) {
      task.splice(index, 1);
      window.localStorage.setItem("data", JSON.stringify(task));
      renderTasks();
    }

  }


});



