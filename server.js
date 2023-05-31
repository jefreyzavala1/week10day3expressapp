const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json())

const items = []

app.get('/items', (req, res) => {
  res.json(items)
})

app.post('/items', (req, res) => {

    if(!req.body.name || !req.body.price){
        res.status(404).json({message:"missing data on the body"})
    }
  const id = req.body.name + req.body.price + (Math.floor(Math.random() * 10))

  req.body.id = id
  items.push(req.body)
  res.status(201).json(req.body)
})

//get a specific item
app.get('/items/:id',(req,res)=>{
    const item = items.find(item=> item.id ===req.params.id)
    if(!items) return res.status(404).json({message: "item not found"})
    res.json(item)
})

//update a item
app.put('/items/:id',(req,res)=>{
    const item = items.find(item=>item.id === req.params.id)
    if(!items) return res.status(404).json({message:"Item not found"})

 item.name = req.body.name
 item.price = req.body.price
    res.json(item)
})

//delete a item

app.delete('/items/:id',(req,res)=>{
    const index = items.findIndex(item=> item.id === req.params.id)
    if(index === -1) return res.status(404).json({message:"Item not found"})
    
    items.splice(index,1)
    res.status(201).json(items[index])
})


app.listen(PORT, () => {
  console.log(`Listening on port $${PORT}`)
})
