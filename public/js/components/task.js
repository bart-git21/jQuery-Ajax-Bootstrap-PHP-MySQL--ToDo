export default {
  view(data) {
    const {id, is_completed, task} = data;
    return `
        <li class="list-group-item shadow m-2">
            <span class="${is_completed ? "completed" : ""}">${task}</span>
            <button class="btn btn-primary rounded editTaskBtn" data-id="${id}">Edit</button>
            <button class="btn btn-success rounded toggleTaskBtn" data-id="${id}">${
                is_completed ? "To do again" : "Done"
                }</button>
            <button class="btn btn-danger rounded deleteTaskBtn" data-id="${id}">Delete</button>
        </li>
    `;
  },
};
