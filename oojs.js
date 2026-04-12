class Task {
    constructor(title, date = new Date()) {
        this.title = title;
        this.date = date;
        this.done = false;
    }

    render() {
        const card = document.createElement("div");
        card.className = "card";

        const text = document.createElement("p");
        text.innerHTML = `<b>${this.title}</b><br><small>${this.date.toLocaleString()}</small>`;

        card.appendChild(text);

        return card;
    }
}
class SmartTask extends Task {
    constructor(title, onUpdate, onDelete) {
        super(title); // super kötelező
        this.onUpdate = onUpdate;
        this.onDelete = onDelete;
    }

    render() {
        const card = super.render();

        const completeBtn = document.createElement("button");
        completeBtn.innerText = "Kész";
        completeBtn.className = "btn complete";

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Törlés";
        deleteBtn.className = "btn delete";

        completeBtn.onclick = () => {
            card.classList.toggle("done");
            this.onUpdate(this);
        };

        deleteBtn.onclick = () => {
            card.remove();
            this.onDelete(this);
        };

        card.appendChild(completeBtn);
        card.appendChild(deleteBtn);

        return card;
    }
}
class App {
    constructor() {
        this.board = document.getElementById("board");
        this.tasks = [];
    }

    addTask() {
        const input = document.getElementById("taskInput");
        const value = input.value.trim();

        if (!value) return;

        const task = new SmartTask(
            value,
            () => {},
            () => {}
        );

        this.tasks.push(task);

        this.board.appendChild(task.render());

        input.value = "";
    }
}

const app = new App();
