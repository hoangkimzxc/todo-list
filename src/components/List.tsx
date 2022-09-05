import { Job } from "../types/types";
interface Props {
  setDefaultFilter: (e: any) => void;
  selectedJob: (e: any) => Job[];
  defaultFilter: string;
  handleDone: (e: any) => void;
  handleDel: (e: any) => void;
  handleClearAll: () => void;
}

function List({
  setDefaultFilter,
  defaultFilter,
  selectedJob,
  handleDone,
  handleDel,
  handleClearAll,
}: Props) {
  return (
    <div className="list">
      <div className="list-title">
        <p>List:</p>
        <select onChange={(e) => setDefaultFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="todo">To do</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="jobs">
        <ul>
          {selectedJob(defaultFilter).map((job, index) => (
            <li key={job.id}>
              <p
                onClick={() => handleDone(job.id)}
                className={`${job.isDone && "line-through"}`}
              >
                {index + 1}. {job.text}
              </p>
              <i
                onClick={() => handleDel(job.id)}
                className="fa-solid fa-trash"
              ></i>
            </li>
          ))}
        </ul>
      </div>
      <button className="clear-all" onClick={handleClearAll}>
        Clear All
      </button>
    </div>
  );
}

export default List;
