function BFS(nodos, inicio, fim){
    console.log(inicio);
    console.log(fim);
    var fila = new Array();

    nodos[inicio].visita = 2;
    fila.push(nodos[inicio]);

    if (inicio != fim) {
        while (fila.length > 0) {
            nodo = fila[0];
            fila.shift();
            for (var i = 0; i < nodo.filhosObj.length; i++) {
                vertice = nodo.filhosObj[i].idVertice2;
                if (nodos[vertice].visita != 2) {
                    nodos[vertice].visita = 2;
                    if (nodos[vertice].relIdObj == fim) {
                        console.log(nodos[vertice]);
                        return false;
                    };
                    fila.push(nodos[vertice]);
                    console.log(nodos[vertice]);
                }else if(fila.indexOf(nodos[vertice])){
                    nodos[vertice].visita = 2;
                    if (nodos[vertice].relIdObj == fim) {
                        console.log(nodos[vertice]);
                        return false;
                    };
                    console.log(nodos[vertice]);
                };
            };
        };
    }else{
        console.log(nodos[inicio]);
    };
};