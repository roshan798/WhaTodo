const db = require('../configs/DB')


const addTodo = (todo) => {
    return new Promise((resolve, reject) => {
        // console.log(todo);
        db.query('INSERT INTO tasks SET ?', todo,
            (error) => {
                if (error) reject(new Error(`ERROR: ${error}`));
            });
        // console.log('todo inserted successfully');
        db.query('SELECT LAST_INSERT_ID() AS task_id',
            (error, result) => {
                resolve(result[0].task_id);
            })
    });
};

const getTodo = (user_id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM tasks WHERE user_id = ?',
            user_id,
            (error, rows) => {
                if (error) {
                    reject(new Error(`ERROR: ${error}`));
                }
                resolve(rows);
            });
    });
}

const updateTodoStatus = (id, status) => {
    return new Promise((resolve, reject) => {

        db.query('UPDATE tasks set status = ?  WHERE id = ?', [status, id],
            (error) => {
                if (error)
                    reject(new Error(`ERROR: ${error}`));
                // console.log('status updated successfully');
                resolve();
            })
    })
}
const updateTodo = (id, todo) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE tasks SET ? WHERE id = ?', [todo,id],
            (error) => {
                if (error) {
                    reject(new Error(`ERROR: ${error}`));
                }
                resolve();
            })
    })
}
const deleteTodo = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM tasks WHERE id = ?', id,
            (error) => {
                if (error) {
                    reject(new Error(`ERROR: ${error}`));
                }
                resolve();
            });
    })
}

module.exports = { addTodo, getTodo, updateTodoStatus, updateTodo, deleteTodo }