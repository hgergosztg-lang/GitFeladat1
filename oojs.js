class Task {
    constructor(title) {
        this.title = title;
    }

    render() {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <p>${this.title}</p>
        `;

        return div;
    }
}

class DeletableTask extends Task {
    constructor(title, onDelete) {
        super(title); // super használata kötelező
        this.onDelete = onDelete;
    }

    render() {
        const div = super.render();

        const btn = document.createElement("button");
        btn.innerText = "Törlés";

        btn.onclick = () => {
            this.onDelete(div);
        };

        div.appendChild(btn);

        return div;
    }
}
class App {
    constructor() {
        this.list = document.getElementById("list");
    }

    addTask() {
        const input = document.getElementById("taskInput");
        const value = input.value.trim();

        if (!value) return;

        const task = new DeletableTask(value, (element) => {
            element.remove();
        });

        this.list.appendChild(task.render());

        input.value = "";
    }
}
const app = new App();
