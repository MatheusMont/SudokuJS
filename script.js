let sudokuTeste = []

for(let i = 0; i < 9; i++){
    sudokuTeste[i] = new Array(9)
}
//Criação de um array vazio com as dimensões necessárias

function verificarPreenchimento(){
    //Criação da função que verifica o preenchimento do array

    let arrayNumeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    //Array para a verificação dos números válidos já que estes vêm como String do input

    let valido = true
    //Criação da variável de verificação que definirá se a função seguirá sendo executada
    
    let mensagem = document.getElementById("mensagem")
    mensagem.innerHTML = ""
    //Mensagem do parágrafo no HTML, sempre é esvaziada quando esta parte é executada


    for(i = 0; i<sudokuTeste.length; i++){
        for(j = 0; j<sudokuTeste.length; j++){
            var quadrado = document.getElementById(i+""+j)
            quadrado.style.backgroundColor = "white"
        }
    }
    //Laço de repetição para fazer os fundos de todos os quadrados voltarem a ser brancos

    loop1:
    for(i = 0; i<sudokuTeste.length; i++){

        for(j = 0; j<sudokuTeste.length; j++){
        //Laços de repetição com o objetivo de preencher um array de duas dimensões

            quadrado = document.getElementById(i+""+j)
            sudokuTeste[i][j] = quadrado.value
            //Preenche o elemento atual do array 2D com o valor do sudoku na posição equivalente
            
            if(quadrado.value == ""){
                mensagem.innerHTML = 'Preencha todos os quadrados'
                valido = false
                document.getElementById(i+""+j).style.backgroundColor = "yellow"
                break loop1
                //Altera a mensagem, invalida a variável de verificação e quebra o primeiro loop

            }else if(quadrado.value > 9 || quadrado.value < 1 || !arrayNumeros.includes(quadrado.value)){
                console.log("iiiih");
                document.getElementById(i+""+j).style.backgroundColor = "yellow"
                mensagem.innerHTML = 'Digite apenas números de 1 a 9'
                valido = false
                break loop1
                //Altera a mensagem, invalida a variável de verificação e quebra o primeiro loop
            }else{
                valido = true
                //Valida a variável de verificação, útil para quando esta não é a primeira execução da função
            }

        }
    }

    if(valido == true){
        mensagem.innerHTML = ""
        testarSudoku(sudokuTeste)
    }
    //Altera a mensagem e executa a função de verificação do Sudoku
    
}


function testarSudoku(array) {
    
    let resposta = true
    let arrayVerificador = []
    //declaração das variáveis, a resposta começa como true, e será transformada em false caso as condições não sejam cumpridas, e um array vazio que será populado ao longo do código para se fazer as verificações


    loop1:
    for(let i = 0;  i < array.length; i++){
        //laço de repetição que será executado de acordo com o número de linhas do array

        for(let j = 0;  j < array.length; j++){
        //laço com o mesmo número de execuções, que será executado N vezes sempre que o anterior for incrementado
            //idVariavel = i + "" + j

            if(arrayVerificador.includes(array[i][j])){
            //condicional que verifica se o arrayVerificador possui o valor presente nessa posição, caso positivo, a resposta torna falsa e o laço é quebrado. Como o i só é incrementado depois que o laço j é encerrado, essa posição representa a verificação das linhas
                
                for(let k=0; k<9; k++){
                    let colorirHorizontal = document.getElementById(i+""+k)
                    colorirHorizontal.style.backgroundColor= "yellow"
                }

                document.getElementById(i+""+j).style.backgroundColor = "red"
                //Faz com que os quadrados da linha considerada errada fiquem amarelos, e o quadrado com erro fique vermelho, para dar destaque ao erro e possibilitar correções

                mensagem.innerHTML = "há um erro na horizontal"
                //Altera a mensagem, mostrando o tipo de erro encontrado

                
                resposta = false;
                break loop1;

            }else{
            //caso o arrayVerificador não possua este elemento, ele é adicionado ao final do array para verificações futuras

                arrayVerificador.push(array[i][j])

            }

        }

        arrayVerificador = []
        //o arrayVerificador é declarado como um array vazio para verificações de linhas futuras

    }

    if(resposta == true){
    //Condicional que verifica se a resposta ainda é verdadeira, para impedir que esse código seja executado sem necessidade de mais verificações
    //Esta parte é semelhante à anterior, mas faz as verificações em colunas ao invés de linhas
        
        loop1:
        for(i = 0;  i < array.length; i++){

            for(j = 0;  j < array.length; j++){

                if(arrayVerificador.includes(array[j][i])){

                //semelhante à verificação anterior, esta inverte os valores de j e i, fazendo com que o array percorra a coluna que está na posição i, nesse caso, utilizando os elementos destas colunas para incrementações e verificações

                     for(let k=0; k<9; k++){
                        let colorirVertical = document.getElementById(k+""+i)
                        colorirVertical.style.backgroundColor= "yellow"
                    }

                    mensagem.innerHTML = "há um erro na vertical"

                    document.getElementById(j+""+i).style.backgroundColor = "red"
                    resposta = false;
                    break loop1;

                }else{

                    arrayVerificador.push(array[j][i])

                }

            }
            arrayVerificador = []

        }
    }


    if(resposta == true && array.length % 3 == 0){

        //outra verificação da resposta e uma to tamanho do array, para saber se este é múltiplo de 3, já que esta parte do código só funciona em sudokus em blocos

        let contador = 0
        loop1:
        for(i = 0; i < array.length; i+=3){
        //laço de repetição que incrementa o valor de i por 3 a cada execução para que ele só itere o início de cada bloco
        
            //declaração da variável contador como 1 sempre que o laço de i for executado
        
            for(j = 0; j < array.length; j++){

                if(contador == 3){
                    //condicional que verifica se o contador for igual a 3, se sim, o contador e o arrayVerificador são reinicializados
                    //console.log(arrayVerificador + " resetou");
                    contador = 0;
                    arrayVerificador = []
                }

                for(let k = i; k < i+3; k++){
                //laço de repetição que usa o i como base e limitador

                    if(arrayVerificador.includes(array[j][k])){

                        resposta = false;
                        
                        for(let l = i; l < i+3; l++){

                            let colorirBloco = document.getElementById(j+""+l)
                            colorirBloco.style.backgroundColor= "yellow"
                        }

                        document.getElementById(j+""+k).style.backgroundColor = "red"

                        break;

                    }else{

                        arrayVerificador.push(array[j][k])

                    }
                }
                contador ++
                //este laço permite que haja a verificação dos elementos i, i+1 e i+2 na coluna J atual, como o i é incrementado por 3 a cada repetição, isso faz com que essas verificações sejam executadas em blocos de 3. o contador serve para limitar o número de elementos armazenados no arrayVerificador, o limitando a um bloco de 3x3
            }
        
        }
        

        
    }

    if(resposta){
        mensagem.innerHTML = "Sudoku válido!"
    }
    //console.log(resposta);

    return resposta;
}

const sudokuValido1 = [
    [7, 8, 4, 1, 5, 9, 3, 2, 6],
    [5, 3, 9, 6, 7, 2, 8, 4, 1],
    [6, 1, 2, 4, 3, 8, 7, 5, 9],
  
    [9, 2, 8, 7, 1, 5, 4, 6, 3],
    [3, 5, 7, 8, 4, 6, 1, 9, 2],
    [4, 6, 1, 9, 2, 3, 5, 8, 7],
  
    [8, 7, 6, 3, 9, 4, 2, 1, 5],
    [2, 4, 3, 5, 6, 1, 9, 7, 8],
    [1, 9, 5, 2, 8, 7, 6, 3, 4]
];


const sudokuValido2 = [[1, 4, 2, 3], [3, 2, 4, 1], [4, 1, 3, 2], [2, 3, 1, 4]];

const sudokuInvalido1 = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],

  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],

  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9]
];

const sudokuInvalido2 = [[1, 2, 3, 4, 5], [1, 2, 3, 4], [1, 2, 3, 4], [1]];

const sudokuVai = [
    [6, 3, 9, 5, 7, 4, 1, 8, 2],
    [5, 4, 1, 8, 2, 9, 3, 7, 6],
    [7, 8, 2, 6, 1, 3, 9, 5, 4],

    [1, 9, 8, 4, 6, 7, 5, 2, 3],
    [3, 6, 5, 9, 8, 2, 4, 1, 7],
    [4, 2, 7, 1, 3, 5, 8, 6, 9],

    [9, 5, 6, 7, 4, 8, 2, 3, 1],
    [8, 1, 3, 2, 9, 6, 7, 4, 5],
    [2, 7, 4, 3, 5, 1, 6, 9, 8]
]
//sudoku(sudokuValido1)
//sudoku(sudokuValido2)
//sudoku(sudokuInvalido1)
//sudoku(sudokuInvalido2)

function testeValido(sudoku){
    console.log("veio");
    
    for(let i = 0; i < 9; i++){
        for(let j =0;j<9;j++){

            document.getElementById(i+""+j).value = sudoku[i][j]

        }
    }
}
  