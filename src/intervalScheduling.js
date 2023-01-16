function montaTabela() {
  var grade = [];
  
  for (var i = 0; i < 7; i++) {
    grade.push([]);
    for (var j = 8; j <= 22; j++) {
      grade[i].push("-");
    }
  }

  return grade;
}

function verificaCompatibilidade(grade, horarioMapeado) {
  var retorno = [];

  if(grade[horarioMapeado.day][horarioMapeado.time-8] !== "-"){
    return [false, null];
  } else {
    retorno.push(Number(horarioMapeado.day), Number(horarioMapeado.time-8));
  }  

  return [true, retorno];
}


function atualizaGrade(grade, posicoes, nome) {
  
  grade[posicoes[0]][posicoes[1]] = nome;
  
}

export default function mount(list) {
  var grade = montaTabela();  

  var numPrioridades = list.length;
  for (var i = 0; i < numPrioridades; i++) {
    if (list[i].lenght !== 0) {      

      for (const event of list[i]) {
        
        const verifica = verificaCompatibilidade(grade, event);
        
        if (verifica[0]) {
          atualizaGrade(grade, verifica[1], event.name);
        
        }
      }
    }
  } 

  return grade;
}