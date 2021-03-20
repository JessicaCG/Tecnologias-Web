var bPedir = document.getElementById('pedir')
bPedir.addEventListener('click', function() {
    axios.post('http://4d0383d2ba6d.ngrok.io/hola', 
    {
        nomb : document.getElementById('nomb').value
    }).then (function(res){
        console.log(res.data);
    }).catch(function(err){
        console.log(err);
    });
})