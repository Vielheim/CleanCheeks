import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export default class Api {
  static async makeApiRequest(axiosConfig) {
    try {
      const result = await axios({
        ...axiosConfig,
        baseURL: BASE_URL,
      });
      return result.data;
    } catch (error) {
      return Promise.reject(error.response);
    }
  }
}
