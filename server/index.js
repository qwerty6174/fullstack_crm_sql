const express = require('express');
const mysql = require('mysql2');
const cors = require('cors')
const bodyParser = require('body-parser')

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    port: "3307",
    database: "library",
    password: "root"
});

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(cors())

app.get('/books',(req, res)=>{
    pool.query(`SELECT * FROM books`, (err,data)=>{
        if(err){
            console.log(err)
        }
        res.json(data);
    })
})
app.get('/authors',(req, res)=>{
    pool.query(`SELECT * FROM authors`, (err,data)=>{
        if(err){
            console.log(err)
        }
        res.json(data);
    })
})
app.get('/genres',(req, res)=>{
    pool.query(`SELECT * FROM ganres`, (err,data)=>{
        if(err){
            console.log(err)
        }
        res.json(data);
    })
})

app.post('/query',(req, res)=>{
    const mql = `SELECT * FROM books WHERE автор = ${req.body.id}`
    console.log(req.body.id)
    pool.query(mql, (err,data)=>{
        if(err){
            console.log(err)
        }
        console.log(data)
        res.json(data);
    })
})
app.post('/edit',(req, res)=>{
    const mql = `SELECT * FROM books WHERE Код_книги = ${req.body.id}`
    console.log(req.body.id)
    pool.query(mql, (err,data)=>{
        if(err){
            console.log(err)
        }
        console.log(data)
        res.json(data);
    })
})
app.post('/books',(req,res)=>{
    const title = req.body.title;
    const date = req.body.date;
    const author = req.body.author;
    const genre = req.body.genre;
    console.log(title,date,author,genre)
    pool.query(`INSERT INTO books (Код_книги, Название, Дата_написания, Автор, Жанр) VALUES (?,?,?,?,?)`, [null,title,date,author,genre], err => res.send.err)
    res.send('ok')
})

app.delete('/books',(req,res)=>{
    const id = req.body.id;
    console.log(id)
    pool.query(`DELETE FROM books WHERE Код_книги = ?`,[id],(err,data)=>{
    if (err) console.log(err)
        res.send('ok');
    })
})
app.post('/authors',(req,res)=>{
    const firstName = req.body.firstName;
    const middleName = req.body.middleName;
    const lastName = req.body.lastName;
    const birthDate = req.body.birthDate;
    const dethDate = req.body.dethDate;
    pool.query(`INSERT INTO authors (Код_автора, Имя, Фамилия, Отчество, Дата_рождения, Дата_смерти) VALUES (?,?,?,?,?,?)`, [null,firstName,middleName,lastName,birthDate, dethDate], err => res.send.err)
    res.send('ok')
})

app.delete('/authors',(req,res)=>{
    const id = req.body.id;
    console.log(id)
    pool.query(`DELETE FROM authors WHERE Код_автора = ?`,[id],(err,data)=>{
    if (err) console.log(err)
        res.send('ok');
    })
})
app.post('/genres',(req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    pool.query(`INSERT INTO ganres (Код_жанра, Название, Описание) VALUES (?,?,?)`, [null,title,description], err => res.send.err)
    res.send('ok')
})

app.delete('/genres',(req,res)=>{
    const id = req.body.id;
    pool.query(`DELETE FROM ganres WHERE Код_жанра = ?`,[id],(err,data)=>{
    if (err) console.log(err)
        res.send('ok');
    })
})

app.get('/users',(req, res)=>{
    pool.query(`SELECT * FROM users`, (err,data)=>{
        if(err){
            console.log(err)
        }
        res.json(data);
    })
})
app.post('/users',(req,res)=>{
    const name = req.body.name;
    const mail = req.body.mail;
    const passwd = req.body.password;
    pool.query(`INSERT INTO users (userName,userPassword,userMail,role) VALUES (?,?,?,?)`, [name,passwd,mail,'user'], err => res.send.err)
    res.send('ok')
})
app.post('/comments',(req,res)=>{
    const id = req.body.id;
    const author = req.body.author;
    const body = req.body.body;
    const comment = `"\ Автор: ${author} , Комментарий: ${body} \"`
    console.log(comment);
    pool.query(`UPDATE books SET Комментарий =  concat(Комментарий,${comment})  WHERE Код_книги=${id}`, err => {res.send.err})
    res.send('ok')
})

app.listen(9999,(err)=>{
    if (err){
        console.log(err)
    }
    console.log('server is fine')
})
