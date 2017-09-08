var artists = [
    {
        name: 'Lynyrd Skynyrd',
        genre: 'Southern Rock',
        link: '#',
        influenced: [
            'Drive-By Truckers',
            'Kid Rock'
        ]
    },
    {
        name: 'Drive-By Truckers',
        genre: 'Southern Rock',
        link: '#',
        influenced: [
        ]
    },
    {
        name: 'Creedence Clearwater Revival',
        genre: 'Southern Rock',
        link: '#',
        influenced: [
            'Lynyrd Skynyrd'
        ]
    },
    {
        name: 'The Who',
        genre: 'British Rock',
        link: '#',
        influenced: [
            'Lynyrd Skynyrd'
        ]
    },
    {
        name: 'Kid Rock',
        genre: 'Southern Rock',
        link: '#',
        influenced: [
        ]
    }
]

var svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
var allDone = false;

svg.setAttribute("height", window.innerHeight);
svg.setAttribute("width", window.innerWidth);

function init() {
    //Place first object upper left
    var i = 100;
    for(artist in artists) {
        artists[artist].posx = (window.innerWidth / 2)-50;
        artists[artist].posy = (window.innerHeight / 2)-50;
        artists[artist].vx = (Math.random()-0.5) * 0.05;
        artists[artist].vy =(Math.random()-0.5) * 0.05;
        console.log(window.innerHeight/2);
    }

    var artistMap = document.getElementsByClassName("artistMap")[0];
    var lineMap = document.getElementsByClassName("lineMap")[0];

    for(artist in artists) {

        //Create Node background
        var node = document.createElement("div");
        node.id = artists[artist].name;
        node.className = "node";

        //Create inner text
        var innerText = document.createElement("p");
        var plainText = document.createTextNode(artists[artist].name);
        innerText.class = "innerText";
        innerText.id = "innerText";
        innerText.appendChild(plainText);
        node.appendChild(innerText);
        node.style.position = "absolute";
        
        //position node in middle of window
        node.style.left = artists[artist].posx+'px';
        node.style.top = artists[artist].posy+'px';
        artistMap.appendChild(node);

        //Draw initial lines for influenced
        if(artists[artist].influenced!='undefined') {
            console.log(artists[artist].influenced);
            for(var i = 0; i < artists[artist].influenced.length; i++) {
                console.log(artists[artist].influenced.length);
                console.log("running for ");
                var line = document.createElementNS('http://www.w3.org/2000/svg','line');
                // line.head = artists[artist].name;
                // line.tail = artists[artist].influenced[i];
                // line.className = "line";
                line.id = artists[artist].name + i;
                line.setAttribute("x1", artists[artist].posx);
                // line.setAttribute("x1", 0);                
                line.setAttribute("y1", artists[artist].posy);
                // line.setAttribute("y1", 0);
                
                var influencedArtist = getArtistByName(artists[artist].influenced[i]);
                line.setAttribute("x2", influencedArtist.posx);
                line.setAttribute("y2", influencedArtist.posy);
                line.style = "stroke:#FFFEA4;stroke-width:2";
                svg.appendChild(line);
                document.body.appendChild(svg);
            }
            console.log("done");
        }

    //     <svg height="210" width="500">
    //     <line x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);stroke-width:2" />
    //   </svg>
    }
}

function getArtistByName(name) {
    for(artist in artists) {
        // console.log('checking');
        // console.log(artists[artist].name);
        // console.log(name);
        if(artists[artist].name === name) {
            return artists[artist];
        }
    }
    return null;
}

function updateNodes() {
    var x = 0;
    if(allDone==false) {
        while(x < 100) {
            for(artist in artists) {
                artists[artist].posx = artists[artist].posx + artists[artist].vx;
                artists[artist].posy = artists[artist].posy + artists[artist].vy;
                var node = document.getElementById(artists[artist].name);
                node.style.left = artists[artist].posx+'px';
                node.style.top = artists[artist].posy+'px';
                updateLines(artists[artist]);
            }
            x++;
        }
        x = 0;
    }
    if(getAllDone()) {
        allDone = true;
    }
}

function getAllDone() {
    var currentMinDistance = 1000;
    for(artist in artists) {
        // console.log('checking for ');
        // console.log(artists[artist].name);
        var newMinDistance = getNearestNodeDistance(artists[artist]);
        if(newMinDistance<currentMinDistance) {
            currentMinDistance = newMinDistance;
        }
    }

    if(currentMinDistance>=100) {
        return true;
    } else {
        return false;        
    }
}

function getNearestNodeDistance(nodeToCheck) {
    var currentMinDistance = 1000.0;

    //don't check yourself!
    for(var i = 0; i < artists.length; i++) {
        if(nodeToCheck.name!=artists[i].name) {
            var dSquared = Math.pow(nodeToCheck.posx-artists[i].posx, 2) + Math.pow(nodeToCheck.posy-artists[i].posy, 2);
            var dSquared = Math.pow(dSquared, 0.5);
            // console.log(dSquared);
            if(dSquared<currentMinDistance) {
                currentMinDistance = dSquared;
            }
        }
    }
    console.log(currentMinDistance);
    return currentMinDistance;
}

function updateLines(artistToUpdate) {
    if(artists[artist].influenced!='undefined') {
        for(var i = 0; i < artistToUpdate.influenced.length; i++) {
            var line = document.getElementById(artistToUpdate.name + i);
            line.setAttribute("x1", artistToUpdate.posx + 50);              
            line.setAttribute("y1", artistToUpdate.posy + 50);
            
            var influencedArtist = getArtistByName(artistToUpdate.influenced[i]);
            line.setAttribute("x2", influencedArtist.posx + 50);
            line.setAttribute("y2", influencedArtist.posy + 50);
            // line.style = "stroke:rgb(219,177,33);stroke-width:4";
        
            svg.appendChild(line);
            document.body.appendChild(svg);
        }
    }
}

init();

var pos = 0;
var id = setInterval(frame, 5);
function frame() {
    if (pos == 350) {
        clearInterval(id);
    } else {
        pos++; 
        updateNodes();
    }
}

// color scheme: http://www.colourlovers.com/palette/4522383/Gold_Car