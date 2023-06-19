const express = require('express');
const path = require('path');
const router = express.Router();
const ejs = require('ejs')
const fs = require('fs')
const { isUserAuthenticated, isUserUnAuthenticated } = require('../middlewares/authenticate');
// const { error, trace } = require('console');
router.use(express.static(path.join(__dirname, '../public')));
router.use(express.json());
const taskdb = require('../controllers/todoController');


router.get('/', isUserAuthenticated, async (req, res) => {
    try {
        let todos = await taskdb.getTodo(req.user[0].id);
        const flash = {
            title: 'Todo | Home',
            username: req.user[0].username,
            path: req.flash('path'),
            todos
        }
        // console.log(flash.username)
        res.render('todoList', flash);

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }

});

router.post('/new', isUserAuthenticated, async (req, res) => {

    try {
        let userId = req.user[0].id; // logged user id
        let todo = [{
            user_id: userId,
            title: req.body.title,
            description: req.body.description,
            status: 0
        }];

        let taskId = await taskdb.addTodo(todo[0]);
        todo[0].id = taskId;
        fs.readFile(path.join(__dirname, '../views/partials/todo.ejs'), 'utf-8', (err, template) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            const todoElement = ejs.render(template, { todos: todo });
            // console.log('todo element :',todoElement)

            res.send(todoElement);
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/', isUserAuthenticated, async (req, res) => {
    try {
        let data = {
            id: req.body.id,
            status: (req.body.status ? 1 : 0)
        }
        // console.log(data)
        await taskdb.updateTodoStatus(data.id, data.status);
        res.status(200).json({ success: true });

    } catch (error) {
        res.status(501).json({ error: "Server Error Occured" });

    }
})
router.delete('/:id', async (req, res) => {
    let todoId = req.params.id.substring(1);
    try {
        await taskdb.deleteTodo(todoId);
        res.status(200).json({ message: 'success' });
    } catch (error) {
        console.log(error);
        res.status(501).json({ message: 'Internal server error' });
    }
})
router.put('/new', isUserAuthenticated, async (req, res) => {

    try {
        let userId = req.user[0].id; // logged user id
        let todo = [{
            user_id: userId,
            title: req.body.title,
            description: req.body.description,
        }];
        let taskId = req.body.id;
        await taskdb.updateTodo(taskId, todo[0]);
        todo[0].id = taskId;
        res.status(201).json({ succes: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router;