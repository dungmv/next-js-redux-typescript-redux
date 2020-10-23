import axios from 'axios'

const overCors = 'https://cors-anywhere.herokuapp.com/'
const urlGetData = `${overCors}https://www.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&tags=`

export const getDataByTags = (tags: string = 'macro,fly') => {
  return axios.get(`${urlGetData}${tags}`)
    .then((res: any) => {
      console.log('res', res);
      return res;
    }).catch((err: any) => {
      console.log('doc err', err);
      return ({ err: false, data: [] });
    });
}