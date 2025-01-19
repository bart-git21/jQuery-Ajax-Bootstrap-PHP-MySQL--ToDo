import taskComponent from "./components/task.js";

$(document).ready(function () {
  function loadTasks() {
    $.get("../src/api/server.php?action=getTasks", function (data) {
      const tasks = data;
      $("#taskList").empty();
      tasks.forEach((data) => $("#taskList").append(taskComponent.view(data)));
    });
  }

  $("#addTaskBtn").on("click", function () {
    const task = $("#taskInput").val().trim();
    if (task) {
      $.ajax({
        url: "../src/api/server.php?action=addTask",
        method: "POST",
        contentType: "application/json",
        headers: {
          "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        data: JSON.stringify({ task: task }),
        beforeSend: function () {
          $(this).prop("disabled", true);
        },
        statusCode: {
          201: function () {
            console.log("201");
          },
        },
      })
        .done((response) => {
          $("#taskList").append(
            taskComponent.view({ id: response.id, task, is_completed: false })
          );
          $("#taskInput").val("");
        })
        .fail((xhr, status, error) => console.error(error))
        .always(() => $(this).prop("disabled", false));
    }
  });

  $("#taskList").on("click", ".deleteTaskBtn", function () {
    const isSure = confirm("Are you sure you want to delete this task?");
    if (isSure) {
      const id = $(this).data("id");
      $.ajax({
        url: "../src/api/server.php?action=deleteTask",
        method: "POST",
        contentType: "application/json",
        headers: {
          "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        data: JSON.stringify({ id }),
        statusCode: {
          200: function () {
            console.log("200 status code");
          },
          204: function () {
            console.log("204 status code");
          },
        },
      })
        .done(() => loadTasks())
        .fail((xhr, status, error) => console.error("Error: ", error));
    }
  });

  $("#taskList").on("click", ".toggleTaskBtn", function () {
    const id = $(this).data("id");
    $.ajax({
      url: "../src/api/server.php?action=toggleTask",
      method: "POST",
      contentType: "application/json",
      headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
      },
      data: JSON.stringify({ id }),
    })
      .done((response) => response.success && loadTasks())
      .fail((xhr, status, error) => console.error("Error: ", error));
  });

  $("#taskList").on("click", ".editTaskBtn", function () {
    const id = $(this).data("id");
    const newValue =
      prompt("Enter new text", $(this).prev().text()).trim() || "new text";
    $.ajax({
      url: "../src/api/server.php?action=editTask",
      method: "POST",
      contentType: "application/json",
      headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
      },
      data: JSON.stringify({ id: id, task: newValue }),
    })
      .done((response) => response.success && loadTasks())
      .fail((xhr, status, error) => console.error("Error: ", error));
  });

  loadTasks();
});
