import { useEffect, useState } from "react"

type Props = {
  filename: string,
  content: string,
  onUpdate: (filename: string, content: string) => void
}

const UpdateForm = (props: Props) => {
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    setContent(props.content)
  }, [props.content])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    props.onUpdate(props.filename, content)
  }

  return (
    <div>
      <h2>Update</h2>
      <form onSubmit={handleSubmit} className="update-form">
        <label>
          <strong>Filename</strong> <em>{props.filename}</em>
        </label>
        <label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default UpdateForm