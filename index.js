// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.put('/todos/:id',(req, res, next) =>{
    let todoId = req.params.id
    let todoData = router.db.get('todos')
    .getById(todoId).value();

    req.body.createdAt =  todoData.createdAt || Date.now()
    console.log(req.body)
    next()
})


server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now()
        req.body.completed = false
    }
    next()
})


server.use(router)

server.listen(3000, () => {
    console.log('JSON Server is running')
})