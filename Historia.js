const kategorie = [
    ['Zakupy przez internet', 'mediumpurple', '<img src="Icons/Cart.png" style = "filter: invert(47%) sepia(84%) saturate(397%) hue-rotate(217deg) brightness(91%) contrast(88%); height: 2.7lvh; width: 2.7lvh;">'],
    ['Artykuły spożywcze', 'salmon', '<img src="Icons/Apple.png" style = "filter: invert(69%) sepia(37%) saturate(2832%) hue-rotate(314deg) brightness(101%) contrast(96%); height: 2.5lvh; width: 2.5lvh;">'],
    ['Transport', 'powderblue', '<img src="Icons/Canister.png" style = "filter: invert(91%) sepia(14%) saturate(577%) hue-rotate(140deg) brightness(97%) contrast(86%); height: 2.5lvh; width: 2.5lvh;">'],
    ['Odzież', 'turquoise', '<img src="Icons/Shirt.png" style = "filter: invert(89%) sepia(17%) saturate(1592%) hue-rotate(107deg) brightness(93%) contrast(88%); height: 2.8lvh; width: 2.8lvh;">'],
    ['Obuwie', 'chocolate', '<img src="Icons/Boot.png" style = "filter: invert(48%) sepia(97%) saturate(1418%) hue-rotate(350deg) brightness(86%) contrast(89%); height: 3lvh; width: 3lvh;">'],
    ['Urzadzenia ekeltryczne', 'gold','<img src="Icons/Lightning.png" style = "filter: invert(79%) sepia(44%) saturate(922%) hue-rotate(359deg) brightness(102%) contrast(104%); height: 2.8lvh; width: 2.8lvh;">'],
    ['Artykuły kosmetyczne', 'plum', '<img src="Icons/Lipstick.png" style = "filter: invert(88%) sepia(73%) saturate(873%) hue-rotate(210deg) brightness(87%) contrast(100%); height: 3lvh; width: 3lvh;">'],
    ['Przelew wewnętrzny', 'lime', '<img src="Icons/Banknote.png" style = "filter: invert(88%) sepia(20%) saturate(1864%) hue-rotate(66deg) brightness(99%) contrast(105%); height: 4lvh; width: 4lvh;">'],
    ['Inne', 'Silver', '<img src="Icons/Canister.png" style = "filter: invert(91%) sepia(14%) saturate(577%) hue-rotate(140deg) brightness(97%) contrast(86%); height: 2.5lvh; width: 2.5lvh;">'],
];

const nazwyDni = [
    'Niedziela',
    'Ponidziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota',
];

const wychodzaceNazwy = [
    ['Steam', kategorie[0][0]],
    ['Lidl', kategorie[1][0]],
    ['Biedronka', kategorie[1][0]],
    ['Rossmann', kategorie[6][0]],
    ['Orlen', kategorie[2][0]],
    ['BP', kategorie[2][0]],
    ['Shell', kategorie[2][0]],
    ['Reserved', kategorie[3][0]],
    ['H&M', kategorie[3][0]],
    ['CCC', kategorie[4][0]],
    ['MediaMarkt', kategorie[5][0]],
    ['RTV Euro AGD', kategorie[5][0]],
    ['Hebe', kategorie[6][0]],
    ['Kaufland', kategorie[1][0]],
    ['Carrefour', kategorie[1][0]],
    ['Epic Games Store', kategorie[0][0]],
    ['Ubisoft Connect', kategorie[0][0]],
    ['BattleNet', kategorie[0][0]],
];

const przychodzaceNazwy = [
    ['Babcia', kategorie[7][0]],
    ['Mama', kategorie[7][0]],
    ['Tata', kategorie[7][0]],
    ['Pracodawca', kategorie[7][0]],
];

function wyczyscTransakcje(){
    const listaTransakcji = document.getElementById('lista-transakcji');
    listaTransakcji.innerHTML = '';
}

function wyswietlTransakcje(lista) {
    wyczyscTransakcje();
    for(let i = 0; i < lista.length; i++){
        const kwota = lista[i][0];
        const nazwa = lista[i][1];
        const kategoria = lista[i][2];
        const data = lista[i][3];
        const dzisiejszaData = new Date;
        let miesiac = data.getMonth() + 1;
        let dzien = data.getDate();
        if(miesiac < 10){
            miesiac = `0${miesiac}`;
        }
        if(data.getDate() < 10){
            dzien = `0${data.getDate()}`;
        }
        let dataStr;
        if(dzisiejszaData.getDate() - data.getDate() < 7 && (dzisiejszaData.getMonth() + 1) - miesiac == 0 && dzisiejszaData.getFullYear() - data.getFullYear() == 0){
            if(dzisiejszaData.getDate() - data.getDate() == 0){
                dataStr = 'Dzisiaj';
            }
            else if(dzisiejszaData.getDate() - data.getDate() == 1){
                dataStr = 'Wczoraj';
            }
            else{
                dataStr = nazwyDni[data.getDay()];    
            }
        }
        else{
            dataStr = `${dzien}. ${miesiac}. ${data.getFullYear()}.`;
        }

        let kolorKategorii = 'black', icon;
        for(let j = 0; j < kategorie.length; j++){
            const nazwaKategori = kategorie[j][0];
            if(nazwaKategori == kategoria){
                kolorKategorii = kategorie[j][1];
                icon = kategorie[j][2];
            }
        }
        document.getElementById("lista-transakcji").innerHTML +=`
            <div class = "transakcja">
                <div class = "data pojemnik-transakcji">${dataStr}</div>
                <div class = "nazwa pojemnik-transakcji">${nazwa}</div>
                <div class = "kategoria pojemnik-transakcji">
                    <div class = "obrazek pojemnik-transakcji">${icon}</div>
                    ${kategoria}
                </div>
                <div class = "kwota pojemnik-transakcji">${kwota.toFixed(2)} PLN</div>
            </div>`

        const kwotaDiv = document.getElementsByClassName("kwota")[i+1];
        if(kwota >= 0){
            kwotaDiv.style.color = "rgb(36, 255, 91)";
        }
        else{
            kwotaDiv.style.color = "black";
        }
        
        const kategoriaDiv = document.getElementsByClassName('kategoria')[i+1];
        kategoriaDiv.style.color = kolorKategorii;
    }
}


function wygenerujTransakcje(ilosc, rodzaj, lista = []) {
    if(rodzaj == 'losowo'){
        for (let i = 0; i < ilosc; i++) {
            let kwota;
            do{
                kwota = (Math.random() * 1001) - 500;
            }while(kwota == 0);
            
            if(saldo + kwota < 0){
                kwota *= -1;
            }

            let nazwa, kategoria;
            if(kwota > 0){
                const losowyNum = Math.floor(Math.random() * (przychodzaceNazwy.length));
                nazwa = przychodzaceNazwy[losowyNum][0];
                kategoria = przychodzaceNazwy[losowyNum][1];
            }
            else{
                const losowyNum = Math.floor(Math.random() * (wychodzaceNazwy.length));
                nazwa = wychodzaceNazwy[losowyNum][0];
                kategoria = wychodzaceNazwy[losowyNum][1];
            }
            const data = losowaDataWZasiegu(360);

            saldo += kwota;
            transakcje.push([kwota, nazwa, kategoria, data]);
        }
    }
    else if(rodzaj == 'lista'){
        saldo += lista[3];
        transakcje.push([lista[3], lista[0], lista[2], new Date()]);        
    }
}

function losowaDataWZasiegu(liczbaDni) {
    const data = new Date;
    return new Date(data.getTime() - Math.floor(Math.random()*liczbaDni*24*60*60*1000));
}

function sortowanieTransakcji(lista, params){
    let numer;
    switch(params[0]){
        case 'kwota':
            numer = 0;
            break;
        case 'nazwa':
            numer = 1;
            break;
        case 'kategoria':
            numer = 2;
            break;
        case 'data':
            numer = 3;
            break;
    }

    for(let i = 0; i < lista.length; i ++){
        for(let j = 0; j < lista.length - 1; j++){
            let check;
            let num1 = lista[j][numer];
            let num2 = lista[j + 1][numer];
            const znak = params[1] == 'malejaco' ? '<' : '>';
            if(numer == 3){
                const dzien = new Date();
                
                switch(params[2]){
                    case 0:
                        sprawdzenie = eval(`num1.getSeconds() ${znak} num2.getSeconds()`);  
                        break;
                    
                    case 1:
                        sprawdzenie = eval(`num1.getMinutes() ${znak} num2.getMinutes()`);
                        break;
                    
                    case 2:
                        sprawdzenie = eval(`num1.getHours() ${znak} num2.getHours()`);
                        break;
                    case 3:
                        sprawdzenie = eval(`num1.getDate() ${znak} num2.getDate()`);  
                        break;
                    
                    case 4:
                        sprawdzenie = eval(`num1.getMonth() ${znak} num2.getMonth()`);
                        break;
                    
                    case 5:
                        sprawdzenie = eval(`num1.getFullYear() ${znak} num2.getFullYear()`);
                        break;
                }
            }
            else{
                sprawdzenie = num1 < num2;
                if(params[1] == 'rosnaco'){
                    sprawdzenie = num1 > num2
                }
            }
            if(sprawdzenie == false)continue;
            
            const temp = lista[j];
            lista[j] = lista[j+1];
            lista[j+1] = temp;
        }
    }   
    params[2] ++;
    params[2] %= 6;
    if(params[2] != 0){
        sortowanieTransakcji(lista, params);
    }
}

function sortujPoKliknieciu(div){
    div.addEventListener('click', (e) =>{
        const lastDiv = document.querySelector(`.${sortowanie[0]}`);
        lastDiv.style.setProperty('--tekst', '""')

        let klasaPojemnika = div.className.replace(/ .*/,'');
        let tekst;
        if(sortowanie[0] == klasaPojemnika){
            if(sortowanie[1] == 'malejaco'){
                sortowanie[1] = 'rosnaco';
                tekst = '▲';
            }
            else{
                sortowanie[1] = 'malejaco'
                tekst = '▼';
            }
        }
        else{
            sortowanie[1] = 'rosnaco'
            tekst = '▲';
        }
        div.style.setProperty('--tekst', `"${tekst}"`);
        sortowanie[0] = klasaPojemnika;
        
        aktualizujWidok();
    })
}

function aktualizujWidok(){
    sortowanieTransakcji(transakcje, sortowanie);
    wyswietlTransakcje(transakcje);
}
