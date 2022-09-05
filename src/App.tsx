import { useState, useEffect } from "react";
import { Job } from "./types/types";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Guide from "./components/Guide";
import InputForm from "./components/InputForm";
import List from "./components/List";



function App() {
  const [job, setJob] = useState<string>("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [defaultFilter, setDefaultFilter] = useState<string>("all");

  useEffect(() => {
    const jobStorage = localStorage.getItem("jobs");
    if (!jobStorage) {
      localStorage.setItem("jobs", "[]");
    } else {
      setJobs(JSON.parse(jobStorage));
    }
  }, []);

  const handleAdd = () => {
    const newJob: Job = {
      id: uuidv4(),
      text: job,
      isDone: false,
    };
    setJobs([...jobs, newJob]);
    setJob("");
    const jsonJobs = JSON.stringify([...jobs, newJob]);
    localStorage.setItem("jobs", jsonJobs);
  };

  const handleDel = (id: string) => {
    const newList = jobs.filter((job) => job.id !== id);
    setJobs(newList);
    const jsonJobs = JSON.stringify([...newList]);
    localStorage.setItem("jobs", jsonJobs);
  };

  const handleClearAll = () => {
    setJobs([]);
    const jsonJobs = JSON.stringify([]);
    localStorage.setItem("jobs", jsonJobs);
  };

  const handleDone = (id: string) => {
    const target = jobs.findIndex((job) => job.id === id);
    jobs[target] = { ...jobs[target], isDone: !jobs[target].isDone };
    setJobs([...jobs]);
    const jsonJobs = JSON.stringify(jobs);
    localStorage.setItem("jobs", jsonJobs);
  };

  const selectedJob = (type: string) => {
    switch (type) {
      case "all":
        return jobs;
      case "todo":
        return jobs.filter((job) => !job.isDone);
      case "done":
        return jobs.filter((job) => job.isDone);
      default:
        return [];
    }
  };

  return (
    <div className="container">
      <Guide />

      <InputForm job={job} setJob={setJob} handleAdd={handleAdd} />

      <List
        setDefaultFilter={setDefaultFilter}
        defaultFilter={defaultFilter}
        selectedJob={selectedJob}
        handleDone={handleDone}
        handleDel={handleDel}
        handleClearAll={handleClearAll}
      />
    </div>
  );
}

export default App;
