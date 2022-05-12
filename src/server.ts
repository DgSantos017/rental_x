import express from 'express'

const app = express()
app.use(express.json())
const array = []

app.post('/teste', (req, res) => {
	const { name, sobrename, age } = req.body
	const obj = { name, sobrename, age }
	array.push(obj)
	res.status(201).json(obj)
})

app.get('/teste', (req, res) => {
	res.json(array)
})

app.listen(3000, () => {
	console.log('running in port 3000')
})
