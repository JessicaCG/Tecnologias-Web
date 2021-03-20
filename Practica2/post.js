var bPuchar = document.getElementById('Puchale')
bPuchar.addEventListener('click', function() {
    axios.post('http://4ef175ab61a0.ngrok.io/fecha', 
    {
        day : document.getElementById('day').value,
        month : document.getElementById('month').value,
        year : document.getElementById('year').value
    }).then (function(res){
        console.log(res.data);
    }).catch(function(err){
        console.log(err);
    });
})