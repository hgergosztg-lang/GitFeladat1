<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <title>OOJS Task Manager</title>
    <style>
        body {
            font-family: Arial;
            background: #f4f4f4;
            margin: 0;
            padding: 20px;
        }

        #app {
            max-width: 700px;
            margin: auto;
        }

        .card {
            background: white;
            padding: 10px;
            margin: 10px 0;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .done {
            opacity: 0.5;
            text-decoration: line-through;
        }

        .btn {
            margin: 5px;
            padding: 5px 10px;
            cursor: pointer;
        }

        .complete { background: #4caf50; color: white; }
        .delete { background: #f44336; color: white; }
        .edit { background: #2196f3; color: white; }

        #controls {
            margin-bottom: 10px;
        }

        input, select {
            padding: 5px;
            margin-right: 5px;
        }
    </style>
</head>
<body>

<div id="app">
    <h2>OOJS Feladatkezelő</h2>

    <div id="controls">
        <input id="taskInput" placeholder="Új feladat...">
        <select id="priority">
            <option value="low">Alacsony</option>
            <option value="medium">Közepes</option>
            <option value="high">Magas</option>
        </select>
        <button onclick="app.addTask()">Hozzáadás</button>
    </div>

    <div id="board"></div>
</div>

<script>
class Task {
    constructor(title, priority = "medium", date = new Date()) {
        this.title = title;
        this.priority = priority;
        this.date = date;
        this.done = false;
    }

