// GET REQUEST
function getTodos() {
  console.log('GET Request');
  // axios({
  //  method :"get",
  //  url:'https://jsonplaceholder.typicode.com/todos',
  //  params :{
  //   _limit:5
  //  }
  // })
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
  .then((res)=>{
    showOutput(res)
    console.log(res.data)
  })
  .catch((err)=> console.log(err))
  
}

// POST REQUEST
function addTodo() {
  console.log('POST Request');
  // axios.post('https://jsonplaceholder.typicode.com/todos',{data :{
  //   title : "todo new 201" ,
  //   completed : false ,
  // }})
  axios({
     method : 'post',
     url : 'https://jsonplaceholder.typicode.com/todos',
     data : {
      title : 'todo 201',
      completed :  false,
     }
  })
  .then((res)=>{showOutput(res)})
  .catch((err) => console.log(err))
}

// PUT/PATCH REQUEST
function updateTodo() {
  console.log('PUT/PATCH Request');
  axios({ 
    method : 'put',
    url : 'https://jsonplaceholder.typicode.com/todos/1',
    data : {
      title : 'Updated through put method',
      comnpleted : false ,
    }
  })
  .then ((res)=>{showOutput(res)})
  .catch((err) => console.log(err))
}

// DELETE REQUEST
function removeTodo() {
  console.log('DELETE Request');
  axios.delete('https://jsonplaceholder.typicode.com/todos/1')
  .then((res)=>{showOutput(res)})
  
}

// SIMULTANEOUS DATA
function getData() {
  console.log('Simultaneous Request');
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
  ])
  // .then((res)=>{
  //   showOutput(res[1])
  //   // showOutput(res[0])
  // })
  .then(axios.spread((todo,post)=>{showOutput(todo)}))
  .catch((err) => console.log(err))
}

// CUSTOM HEADERS
function customHeaders() {
  console.log('Custom Headers');
    let config = {
      header : {
        'content-type':'application/json',
        authorization : 'sometoken'
      }
    }
    axios.post('https://jsonplaceholder.typicode.com/todos',{title:'NewTodo new Post request custom Header',
    completed : false
    },config) 
  .then((res)=>{showOutput(res)})
  .catch((err) => console.log(err))

}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log('Transform Response');
  let options = {
    method: 'post',
    url : 'https://jsonplaceholder.typicode.com/todos',
    data : {
      title : "Hello transforming request"
    },
    transformResponse : axios.defaults.transformResponse.concat(data =>{
      data.title = data.title.toUpperCase();
      return data
    })
  }
  axios(options).then(res => showOutput(res))
}

// ERROR HANDLING
function errorHandling() {
  console.log('Error Handling');
  axios.get('https://jsonplaceholder.typicode.com/posts')
  .then((res)=>{
    showOutput(res)
    console.log(res.data)
  })
  .catch((err)=> {
    if(err.response){
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
      if(err.response.status===404){
        alert('Page Not found')
      }
    }else {
      console.error(err.message)
    }
  })
}

// CANCEL TOKEN
function cancelToken() {
 const source = axios.CancelToken.source();
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5',{
    cancelToken : source.token
  })
  .then((res)=>{
    showOutput(res)
    console.log(res.data)
  })
  .catch((thrown)=> {
    if(axios.isCancel(thrown)){
      console.log('Request Cancelled :', thrown.message)
    }
  })
  if(true){
    source.cancel('Request canceled!');
  }
}

// INTERCEPTING REQUESTS & RESPONSES
// axios.interceptors.request.use((config)=>{
//   console.log(`${config.method.toUpperCase()} request send`)
// })


// AXIOS INSTANCES
 let axiosInstance = axios.create({
  baseURL : 'https://jsonplaceholder.typicode.com'
 })

//  axiosInstance.get('/comment').then((res)=>{showOutput(res)})



// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
