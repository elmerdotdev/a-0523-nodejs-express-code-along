type Props = {
  filename: string,
  onDelete: (filename: string) => void,
  onView: (filename: string) => void
}

const ListItem = (props: Props) => {
  return (
    <li className="file-list-item">
      <span>{props.filename}</span>
      <div>
        <button onClick={() => props.onView(props.filename)}>View</button>
        <button onClick={() => props.onDelete(props.filename)}>Delete</button>
      </div>
    </li>
  )
}

export default ListItem