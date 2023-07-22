// TODO 
// https://typegraphql.com/docs/examples.html
import axios from 'axios';

export const queryGraphql = async (baseURL: string, queryObject: any) =>{
    const response = await axios.post(
      `${baseURL}`,
      queryObject,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    console.log('response', response)
    return response.data.data;
  }