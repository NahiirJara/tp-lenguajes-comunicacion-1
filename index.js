require('dotenv').config() //para poder traer las variables de .env

const express = require('express')
const {sequelize, DBTest } = require('./database.js')
const tareaModel = require("./tareaModel.js")
const helmet = require('helmet');
const morgan = require('morgan');
const app = express()

const PUERTO = process.env.PUERTO // traigo las variables de.env

//configurar EJS como motor de plantilla
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan('combined'));
app.use(express.static('public')) //guarda los archivos locales|

app.get('/', async function (req, res) {   
    const post = await tareaModel.findAll();
    res.render('inicio',{ post }) 
})

app.get('/agregar', function (req, res) {
    res.render('agregar') 
})

app.post('/agregar', async function (req, res) {
    console.log(req.body)   
    const {nombre, titulo, post, imagen} = req.body

    const nvoPost = await tareaModel.create({
        nombre: nombre,
        titulo: titulo,
        post: post,
        imagen: imagen
    });

    if (nvoPost) {
        res.redirect('/'); 
    } else{
        res.send('No se pudo agregar el post.')
    }


})

app.get('/eliminar/:id', async function (req, res) {
    const { id } = req.params;
        const borrarTarea = await tareaModel.destroy({
            where: {
                id:id
            }
        })

        if (borrarTarea) {
            res.redirect('/'); 
        } else{
            res.send('No se pudo borrar el post.')
        }
})

app.get('/editar/:id', async function (req, res) {
    const { id } = req.params;
        const Tarea = await tareaModel.findOne({
            where: {
                id:id
            }
        })

        if (Tarea) {
            res.render('editar', {
                item: Tarea
            })
        } else{
            res.send('No se pudo encontrar el post.')
        }
})
app.post('/editar/:id', async function (req, res) {
    const { id } = req.params;

    const {nombre, titulo, post, imagen} = req.body

        const editarPost = await tareaModel.update(
            {
            nombre: nombre,
            titulo: titulo,
            post: post,
            imagen: imagen
            },
            {
             where: 
              { id:id }
            }
        )

        if (editarPost) {
            res.redirect('/'); 
        } else{
            res.send('No se pudo editar el post.')
        }
    })


DBTest()

app.listen(PUERTO, ()=>{
    console.log(`El servidor esta corriendo en el puerto ${PUERTO}`)
})

//02:57:00 git hub 
