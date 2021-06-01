const mybody = document.querySelector('table > tbody');
fetch('/datos')
.then((respuesta)=>respuesta.json())
.then(function(datos){
    const fila = datos.map((item)=> cuerpo(item));
    mybody.innerHTML = fila.join("");
})
.catch(function(e){
    console.log(e);
});
function cuerpo(json){
    return `
    <tr class="table-warning">
        <td class="text-center">${ json.temperatura }</td>
        <td class="text-center">${ json.estatus }</td>
    </tr>
    `;
}