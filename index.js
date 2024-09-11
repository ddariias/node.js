const express = require('express')
const app = express()
const path = require('path')
const fs = require('node:fs/promises')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const Port = 3000
app.listen(Port)

const func = {
    read: async () => {
        try {
            const pathUsers = path.join(__dirname, 'user.json')
            const fail = await fs.readFile(pathUsers, 'utf-8')
            return fail ? JSON.parse(fail) : []
        }catch (e){
            console.log(e.message);
        }
    },
    write: async (users) => {
        try {
            const pathUsers = path.join(__dirname, 'user.json')
            await fs.writeFile(pathUsers, JSON.stringify(users))
        }catch (e){
            console.log(e.message);
        }
    }
}


app.get('/', (req, res) => {
    res.send('Hello!')
})

app.get('/users', async (req, res) =>{
    try {
        const users = await func.read()
        res.send(users)
    }catch (e){
        res.status(500).send(e.message)
    }
})

app.post('/users', async (req, res) => {
    const users = await func.read()
    const {name, email, password} = req.body
    try {
        const id = users[users.length - 1]?.id + 1;
        const newUser = {id, name, email, password}
        users.push(newUser)
        res.send(newUser)

        await func.write(users)

    }catch (e){
        console.log(e.message)

}
})

app.get('/users/:userId', async (req, res) => {
    try {
        const users = await func.read()
        const userId = Number(req.params.userId)
        const user = users.find(user => user.id === userId)
        if(!user){
            return res.status(404).send('User not found')
        }
        res.send(user)

    }catch (e) {
        res.status(500).send(e.message)
    }
})


app.put('/users/:userId', async (req, res) => {
    try {
        const users = await func.read()
        const userId = Number(req.params.userId)
        const user = users.findIndex(user => user.id === userId)
        const {name, email, password} = req.body

        users[user].name = name
        users[user].email = email
        users[user].password = password
        await func.write(users)

        res.send(users)


    }catch (e){
        res.status(500).send(e.message)
    }
})

app.delete('/users/:userId', async (req, res) => {
    try {
        const users = await func.read()
        const userId = Number(req.params.userId)
        const user = users.findIndex(user => user.id === userId)

        users.splice(user, 1)
        await func.write(users)
        res.send(users)
    }catch (e){
        res.status(500).send(e.message)
    }
})