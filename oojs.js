class Task {
    constructor(title, date = new Date()) {
        this.title = title;
        this.date = date;
        this.done = false;
    }

    createBaseCard() {
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
        super(title);
        this.onUpdate = onUpdate;
        this.onDelete = onDelete;
    }

    render() {
        const card = this.createBaseCard();

        const completeBtn = document.createElement("button");
        completeBtn.innerText = "Kész";
        completeBtn.className = "btn complete";

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Törlés";
        deleteBtn.className = "btn delete";

        completeBtn.onclick = () => {
            this.done = !this.done;
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
        this.tasks = [];

        // 🔥 Kötelező elem: document.body.appendChild
        this.board = document.createElement("div");
        this.board.className = "board";

        document.body.appendChild(this.board);
    }

    addTask() {
        const input = document.getElementById("taskInput");
        const value = input.value.trim();

        if (!value) return;

        const task = new SmartTask(
            value,
            () => {},
            () => {
                this.tasks = this.tasks.filter(t => t !== task);
            }
        );

        this.tasks.push(task);

        const card = task.render();
        this.board.appendChild(card);

        input.value = "";
    }
}

// 🔥 globális példány (HTML onclick miatt kell)
const app = new App();
