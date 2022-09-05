interface Props {
  job: string;
  setJob: (e: any) => void;
  handleAdd: () => void;
}

function InputForm({ job, setJob, handleAdd }: Props) {
  return (
    <div className="form">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Enter Job"
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />
        <button onClick={handleAdd}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </form>
    </div>
  );
}

export default InputForm;
