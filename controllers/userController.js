const db = require('../configs/DB');
const bcrypt = require('bcrypt');

const addUser = async (data)=> {
    return new Promise(async (resolve,reject)=>{
        try {
            let email = await getUserByEmail(data.email);
            if(email.length != 0) reject(`${data.email} already exist!!`);
            else{
                let hashedPassword = await bcrypt.hash(data.password,10);
                let user = {
                    username:data.name,
                    email:data.email,
                    password: hashedPassword
                };
                
                db.query('INSERT INTO users SET ? ',user,
                (error)=>{
                    if(error)
                        reject(new Error('Error occurred while signup1: ' + error));
                    else 
                        resolve('Account created successfully');
                });
            }
        } catch (error) {
            console.log(error);
            reject(new Error('Error occurred while signup2: ' + error));
        }
    });
}

const getUserByEmail =  (email)=>{
    return new Promise((resolve,reject)=>{
        try {
            db.query('SELECT * FROM users WHERE email = ?',[email],
            (error,rows)=>{
                if(error){
                    reject(error);
                }
                resolve(rows);
            });
        } catch (error) {
            reject(new Error(error));
        }
    });
}

const getUserById =  (id)=>{
    return new Promise((resolve,reject)=>{
        try {
            db.query('SELECT * FROM users WHERE  id = ?',[id],
            (error,rows)=>{
                if(error){
                    reject(error);
                }
                resolve(rows);
            })
        } catch (error) {
            reject(new Error(error));
        }
    });
}

const getPasswordByEmail = async (email)=>{
    return new Promise((resolve,reject)=>{
        try {
            db.query('SELECT password FROM users WHERE email = ? ',email,
            (error,rows)=>{
                if(error) reject(new Error(error));
                resolve(rows);
            })
        } catch (error) {
            reject(new Error(error)); 
        }
    });
}

module.exports = {addUser,getUserByEmail,getUserById,getPasswordByEmail};


