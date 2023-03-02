import axios from 'axios';

export const getJobs = async () => {
  const {data} = await axios.get('jobs.json')
  .catch(err => {
    throw new Error(`Не удалось получить должности:\n${err}`)
  });
  return data;
};
