const express = require('express')
const cors = require('cors')
const fs = require('fs').promises
const path = require('path')

const app = express();
const PORT = 3000;

// Directory path
const docs = path.join(__dirname, 'docs')

// Middleware to enable CORS
app.use(cors())

// Middleware to parse JSON requests
app.use(express.json())

// Route to Homepage
app.get('/', (req, res) => {
  res.send('You are in homepage')
})

// Route to list files
app.get('/api/files', async (req, res) => {
  try {
    const files = await fs.readdir(docs)
    res.json({ files })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Route to read a file
app.get('/api/files/:filename', async (req, res) => {
  try {
    const { filename } = req.params
    const filePath = path.join(docs, filename)
    const fileContent = await fs.readFile(filePath, 'utf-8')
    res.json({ content: fileContent })
  } catch (err) {
    res.status(404).json({ error: 'File not found' })
  }
})

// Route to delete a file
app.delete('/api/files/:filename', async (req, res) => {
  try {
    const { filename } = req.params
    const filePath = path.join(docs, filename)
    await fs.unlink(filePath)
    res.json({ message: 'File deleted successfully' })
  } catch (err) {
    res.status(404).json({ error: 'File nout found' })
  }
})

// Route to add a file
app.post('/api/files', async (req, res) => {
  try {
    const { filename, content } = req.body
    const filePath = path.join(docs, filename)
    await fs.writeFile(filePath, content)
    res.json({ message: 'File added successfully'})
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', err })
  }
})

// Route to update the content
app.put('/api/files/:filename', async (req, res) => {
  try {
    const { filename } = req.params
    const { content } = req.body
    const filePath = path.join(docs, filename)
    await fs.writeFile(filePath, content)
    res.json({ message: 'File updated successfully' })
  } catch (err) {
    res.status(404).json({ error: 'File not found' })
  }
})

// Route to 404 page
app.get('/not-found', (req, res) => {
  res.status(404).send('Page not found')
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})