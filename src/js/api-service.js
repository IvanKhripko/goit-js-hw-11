const axios = require('axios');

export default class ImageApiService {
  constructor() {
    this.inputValue = '';
    this.page = 1;
  }

  fetchAxios() {
    console.log(this);
    const url = `https://pixabay.com/api/?key=25737167-0db4b813879a604136ea7d639&q=${this.inputValue}&lang=en&per_page=4&page=${this.page}&
    image_type="photo&orientation=horizontal&safesearch=true"`;

    return axios(url)
      .then(({data}) => {
        this.page += 1;
        return data;
      })
    
          
  }

  resetPage() {
    this.page = 1;
  }

  get input() {
    return this.inputValue;
  }

  set input(newInput) {
    this.inputValue = newInput;
  }
}


// ----------------------AXIOS-----------------------

// const axios = require('axios');

// export default class ImageApiService {
//   constructor(render) {
//     this.inputValue = '';
//     this.page = 1;
//     this.render = render
//   }

//   fetchAxios(data) {
//     console.log(this);
//     const url = `https://pixabay.com/api/?key=25737167-0db4b813879a604136ea7d639&q=${this.inputValue}&lang=en&per_page=5&page=${this.page}&
//     image_type="photo"`;

//      axios
//       .get(url)
//       .then(response => {
//         this.page +=1;
//         // return response;
//         this.render(response.data)
//       })
    
          
//   }

//   resetPage() {
//     this.page = 1;
//   }

//   get input() {
//     return this.inputValue;
//   }

//   set input(newInput) {
//     this.inputValue = newInput;
//   }
// }
