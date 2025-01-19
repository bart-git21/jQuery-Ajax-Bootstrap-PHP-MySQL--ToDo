export default {
  view(data) {
    const { id, is_completed, task } = data;
    return `
        <li class="list-group-item shadow m-2">
            <span class="task ${is_completed ? 'completed' : ''}" data-id="${id}">${task}</span>
            <button class="btn btn-danger rounded deleteTaskBtn" data-id="${id}">Delete</button>
        </li>
    `;
  },
};
