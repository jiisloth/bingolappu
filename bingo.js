let username
let bstate
$(document).ready(function(){
    username = localStorage.getItem('username');
    bstate = JSON.parse(localStorage.getItem('state'));
    if (username){
        console.log(username)
        console.log(bstate)
        seed += stringtonumber(username)
        set_nametext(username)
        if (!bstate){
            init_state()
        }
        if (bstate.hasOwnProperty("board")){
            if ( bstate["board"].hasOwnProperty(username)){
                unlocks = bstate["board"][username]
            }
            else {
                init_user_state()
            }
        }
        else {
            init_state()
        }
        generate()
    } else {
        window.location.href = "index.html";
    }
    $(".board-cell").on( "click", function() {
        $(this).toggleClass("unlocked")

        var classList = $(this).attr('class').split(/\s+/);
        let row
        let cell
        $.each(classList, function(index, item) {
            if (item.split("-")[0] === "r") {
                row = parseInt(item.split("-")[1])
            }
            if (item.split("-")[0] === "c") {
                cell = parseInt(item.split("-")[1])
            }
        });
        if (unlocks[row][cell]) {
            unlocks[row][cell] = false
        } else {
            unlocks[row][cell] = true
        }
        bstate["board"][username] = unlocks
        localStorage.setItem('state', JSON.stringify(bstate));
    });
});

function init_state(){
    bstate = {"board": {}}
    init_user_state()
}

function init_user_state(){
    bstate["board"][username] = unlocks
    localStorage.setItem('state', JSON.stringify(bstate));
}


let unlocks = [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
]



var choises = [
    "Lahjoita MIELI ry:lle!",
    "Chatti bäckseattaa",
    "Yhdessä yläviistoon",
    "Ninjailua",
    "Katso runi lapsuudensuosikista",
    "Karaokea pelissä",
    "Pelaa Minigolfia",
    "Uusi Oma Ennätys",
    "Toistuva voiceline pelissä",
    "Yleisö vilkuttaa kameralle",
    "Koe out of bounds -elämys",
    "Postaa Vauhtis- tunnelmakuva someen",
    "Katso kokonainen runi",
    "Todista glitchi",
    "Chattaile 03:00 - 06:00",
    "Bongaa Vauhtijuoksu-paita",
    "Ketsuppi lentää",
    "Iso osa pelistä skipataan",
    "Vessatauko pitkässä runissa",
    "Mäntä litistää pelaajan",
    "Teknisiä ongelmia",
    "Omituinen ohjain käytössä",
    "F",
    "It's a me Mario!",
    "Katso mainostauko",
    "Opi uutta tutusta pelistä",
    "Pulssi Highscore!",
    "Cosplay",
    "Kaksi pelaajaa yhteistyössä",
    "Erittäin hyvä RNG",
    "Erittäin huono RNG",
    "Yli 100e lahjoitus!",
    "Unskippable cutscene",
    "Pelaajat kisaavat keskenään",
    "Vauhtisbiisi",
    "Näe resetti",
    "Joku syö striimissä",
    "Uusi maailmanennätys!",
    "Hauska lahjoitusviesti",
    "NorppaJAM-moment",
    "Kootut selitykset pelaajalta",
    "Äitille terkkuja",
    "Blink and you miss it",
    "\"Ekalla!\"",
    "\"WOAH!\" (Crash Bandicoot)",
    "Moogle ruudulla",
    "Bongaa Disney-hahmo",
    "Joku ei osaa käyttää kannustimia",
    "Framen tarkka temppu",
    "\"Oho\"",
    "Täytä palautekysely",
    "En ymmärrä tätä kieltä",
    "Peli menee rikki",
    "*Nappien hakkaamista*",
    "Puhetta aamupalasta",
    "Bongaa Aku Aku",
    "Terveiset kotopuolesta",
    "Kyseenalainen dialogi",
    "Joku haukottelee"
]
// Damage boost
var seed = 3186;
function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function stringtonumber(s) {
    nums = ""
    for (var c = 0; c < s.length; c++){
        nums += s.charCodeAt(c).toString()
    }
    return parseInt(nums)
}

function set_nametext(s){
    html = ""
    for (var c = 0; c < s.length; c++){
        html += "<div>"
        html += s.charAt(c)
        html += "</div>"
    }
    $("#username").html(html)

}

function generate(){
    let html = ""
    for (var row = 0; row < 5; row ++){
        html += "<div class='board-row'>"
        for (var cell = 0; cell < 5; cell ++) {
            let unlocked = ""
            if (unlocks[row][cell]){
                unlocked = "unlocked"
            }
            html += "<div class='board-cell r-" + row + " c-" + cell + " "+ unlocked +"'><div class='cell'><div>"
            let rnum = random()
            while (rnum === 1) {
                rnum = random()
            }
            rnum = Math.floor(choises.length * rnum)
            let cell_text = choises[rnum]
            choises.splice(rnum, 1)
            if (row === 2 && cell === 2){
                cell_text = '"Tätä ei oo koskaan tapahtunu aikasemmin"'
            }
            html += cell_text
            html += "</div></div></div>"
        }
        html += "</div>"
    }
    $("#board").html(html)
}