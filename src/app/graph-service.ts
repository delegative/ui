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
    if(response.data.errors){
      console.log('errors', response.data.errors)
      return [];
    }
    return response.data.data;
  }