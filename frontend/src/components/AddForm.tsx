import { useState } from "react"

type Props = {
  onAdd: (filename: string, content: string) => void
}

const AddForm = (props: Props) => {
  const [filename, setFilename] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    props.onAdd(filename, content)
    setFilename('')
    setContent('')
  }

  return (
    <div>
      <h2>Add Document</h2>
      <form onSubmit={handleSubmit} className="add-form">
        <label>
          Filename
          <input type="text" value={filename} onChange={e => setFilename(e.target.value)} />
        </label>
        <label>
          Content
          <textarea value={content} onChange={e => setContent(e.target.value)} />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default AddForm