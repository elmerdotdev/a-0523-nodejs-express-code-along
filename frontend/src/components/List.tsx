import { useEffect, useState } from "react"
import { listFiles, deleteFile, addFile, updateFile, readFile } from "../utils/functions"

import ListItem from "./ListItem"
import UpdateForm from "./UpdateForm"
import AddForm from "./AddForm"

const List = () => {
  const [files, setFiles] = useState<string[]>([])
  const [currentFile, setCurrentFile] = useState<{ filename: string, content: string }>({ filename: '', content: '' })
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false)

  useEffect(() => {
    const getFiles = async () => {
      const serverFiles = await listFiles()
      console.log(serverFiles)
      setFiles(serverFiles)
    }
    getFiles()
  }, [])

  const handleDelete = async (filename: string) => {
    const res = await deleteFile(filename)
    console.log(res)
    setFiles(files.filter(file => file !== filename))
    setIsUpdateOpen(false)
  }

  const handleAdd = async (filename: string, content: string) => {
    const res = await addFile(filename, content)
    console.log(res)
    setFiles([...files, filename])
  }

  const handleView = async (filename: string) => {
    const res = await readFile(filename)
    setCurrentFile({ filename, content: res })
    setIsUpdateOpen(true)
  }

  const handleUpdate = async (filename: string, content: string) => {
    const res = await updateFile(filename, content)
    console.log(res)
    setIsUpdateOpen(false)
  }

  return (
    <div>
      <ul className="file-list">
        {files.map((file, index) => (
          <ListItem key={index} filename={file} onDelete={handleDelete} onView={handleView} />
        ))}
      </ul>

      {isUpdateOpen && (
        <UpdateForm filename={currentFile.filename} content={currentFile.content} onUpdate={handleUpdate} />
      )}
      <hr />

      <AddForm onAdd={handleAdd} />
    </div>
  )
}

export default List