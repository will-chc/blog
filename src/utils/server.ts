import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    }
});

instance.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
});


const request = (url: string, data: any, method = 'GET') => {
    return new Promise((resolve, reject) => {
      switch (method.toUpperCase()) {
        case 'GET':
          instance.get(url, { params: { ...data } })
            .then(res => {
              resolve(res.data);
            })
            .catch(err => {
              reject(err);
            });
          break;
        case 'POST':
          instance.post(url, data)
            .then(res => {
              resolve(res.data);
            })
            .catch(err => {
              reject(err);
            });
          break;
        default:
          reject(new Error(`Invalid method: ${method}`));
          break;
      }
    });
  };
  

export default request;