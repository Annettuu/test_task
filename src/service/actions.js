import axios from 'axios';

export const getJobs = async () => {
  const {data} = await axios.get('jobs.jsonw')
  .catch(err => {
    throw new Error(`Не удалось получить должности:\n${err}`)
  });
  return data;
};
