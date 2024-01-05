const API_URL = 'http://localhost:3000/api/files'

// Fetch all files
const listFiles = async () => {
  try {
    const res = await fetch(API_URL)
    const data = await res.json()
    return data.files
  } catch (err) {
    console.error(err)
  }
}

// Fetch one file
const readFile = async (filename: string) => {
  try {
    const res = await fetch(`${API_URL}/${filename}`)
    const data = await res.json()
    return data.content
  } catch (err) {
    console.error(err)
  }
}

// Delete a file
const deleteFile = async (filename: string) => {
  try {
    const res = await fetch(`${API_URL}/${filename}`, {
      method: 'DELETE',
    })
    const data = await res.json()
    return data.message
  } catch (err) {
    console.error(err)
  }
}

// Add a file
const addFile = async (filename: string, content: string) => {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ filename, content })
    })
    const data = await res.json()
    return data.message
  } catch (err) {
    console.error(err)
  }
}

// Update a file
const updateFile = async (filename: string, content: string) => {
  try {
    const res = await fetch(`${API_URL}/${filename}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content })
    })
    const data = await res.json()
    return data.message
  } catch (err) {
    console.error(err)
  }
}

export { listFiles, readFile, deleteFile, addFile, updateFile }