import { TiArrowSync } from 'react-icons/ti'

const RefreshTasks = ({ task, deletes }) => {
  return (
      <h3>
        <TiArrowSync
          style={{ color: 'green', cursor: 'pointer' }}
          onClick={() => deletes(task.id)}
        />
      </h3>
  )
}

export default RefreshTasks