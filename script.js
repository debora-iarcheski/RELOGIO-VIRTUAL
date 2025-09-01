
let chaveHora = "7bd57e62d4d549e59e029993b1be91cb"
let horas = document.querySelector(".horario")

let horaInterval = null; // vai controlar o intervalo de atualização

function mostrarResultado(timeObj){
    let hora = String(timeObj.getHours()).padStart(2, "0");
    let minuto = String(timeObj.getMinutes()).padStart(2, "0");
    let segundo = String(timeObj.getSeconds()).padStart(2, "0");

    horas.innerHTML = `${hora}:${minuto}:${segundo}`;
}

async function tempo(cidadeUsuario) {
    let horaAtualizada = await fetch("https://api.ipgeolocation.io/timezone?" +
        "apiKey=" +
        chaveHora +
        "&location=" +
        encodeURIComponent(cidadeUsuario)
    )
    .then (resposta => resposta.json())

    console.log(horaAtualizada)

    // pega horas, minutos e segundos da API
    const [hora, minuto, segundo] = horaAtualizada.time_24.split(":");
    let currentTime = new Date();
    currentTime.setHours(parseInt(hora));
    currentTime.setMinutes(parseInt(minuto));
    currentTime.setSeconds(parseInt(segundo));

    mostrarResultado(currentTime);

    // se já existe um intervalo, limpa
    if (horaInterval) clearInterval(horaInterval);

    // atualiza a cada segundo
    horaInterval = setInterval(() => {
        currentTime.setSeconds(currentTime.getSeconds() + 1);
        mostrarResultado(currentTime);
    }, 1000);
}    

function procurar(){
    let cidadeUsuario = document.querySelector(".input-usuario").value

    tempo(cidadeUsuario)
}



