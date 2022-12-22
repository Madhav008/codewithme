var myHeaders = new Headers();


fetch("https://practiceapi.geeksforgeeks.org/api/vr/problems/?pageMode=explore&page=1&curated\\[\\]=1&sortBy=submissions", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));