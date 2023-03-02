import axios from 'axios';

export const getJobs = async () => {
  const {data} = await axios.get('jobs.json')
  .catch(err => console.log(err));
  return data;
};
