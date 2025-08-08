/**
 * Implementação simplificada do Algoritmo de Resolução em JavaScript
 * para lógica proposicional (um subconjunto da lógica de primeira ordem)
 */

// Representação de uma cláusula como conjunto de literais (usando arrays)
// Literais positivos são strings, negativos são strings com prefixo '!'

// Função para verificar se duas cláusulas podem ser resolvidas
function canResolve(clause1, clause2) {
    for (const literal of clause1) {
      const complementary = literal.startsWith('!') ? literal.slice(1) : '!' + literal;
      if (clause2.includes(complementary)) {
        return { literal, complementary };
      }
    }
    return null;
  }
  
  // Função para resolver duas cláusulas
  function resolve(clause1, clause2, literal, complementary) {
    // Criar nova cláusula removendo os literais complementares
    const resolvent = [
      ...clause1.filter(l => l !== literal),
      ...clause2.filter(l => l !== complementary)
    ];
    
    // Remover duplicados
    return [...new Set(resolvent)];
  }
  
  // Verifica se uma cláusula é tautológica (contém P e !P)
  function isTautology(clause) {
    for (const literal of clause) {
      const complementary = literal.startsWith('!') ? literal.slice(1) : '!' + literal;
      if (clause.includes(complementary)) {
        return true;
      }
    }
    return false;
  }
  
  // Algoritmo de resolução principal
  function resolution(clauses) {
    let S = [...clauses]; // Conjunto de cláusulas
    let newClauses = [];
    
    console.log("Conjunto inicial de cláusulas:", S);
    
    while (true) {
      // Para cada par de cláusulas
      for (let i = 0; i < S.length; i++) {
        for (let j = i + 1; j < S.length; j++) {
          const resolvable = canResolve(S[i], S[j]);
          
          if (resolvable) {
            const resolvent = resolve(S[i], S[j], resolvable.literal, resolvable.complementary);
            
            // Se encontrou a cláusula vazia, o conjunto é insatisfatível
            if (resolvent.length === 0) {
              console.log(`Derivou cláusula vazia a partir de {${S[i]}} e {${S[j]}}`);
              return "INSATISFATÍVEL - Teorema provado";
            }
            
            // Verifica se a cláusula é uma tautologia ou já existe
            if (!isTautology(resolvent) && !S.some(c => isEqual(c, resolvent)) && 
                !newClauses.some(c => isEqual(c, resolvent))) {
              console.log(`Resolvendo {${S[i]}} e {${S[j]}} para obter {${resolvent}}`);
              newClauses.push(resolvent);
            }
          }
        }
      }
      
      // Se não foram geradas novas cláusulas, o conjunto é satisfatível
      if (newClauses.length === 0) {
        return "SATISFATÍVEL - Não foi possível provar o teorema";
      }
      
      // Verificar se todas as novas cláusulas já estão em S
      let added = false;
      for (const clause of newClauses) {
        if (!S.some(c => isEqual(c, clause))) {
          S.push(clause);
          added = true;
        }
      }
      
      // Se nenhuma nova cláusula foi adicionada, o conjunto é satisfatível
      if (!added) {
        return "SATISFATÍVEL - Não foi possível provar o teorema";
      }
      
      // Resetar as novas cláusulas
      newClauses = [];
    }
  }
  
  // Função auxiliar para verificar se duas cláusulas são iguais
  function isEqual(clause1, clause2) {
    if (clause1.length !== clause2.length) return false;
    return clause1.every(literal => clause2.includes(literal));
  }
  
  // Exemplo de uso:
  // Queremos provar: Se todos os homens são mortais e Sócrates é homem, então Sócrates é mortal
  // Em lógica: (∀x)(Homem(x) → Mortal(x)) ∧ Homem(Sócrates) → Mortal(Sócrates)
  // Para refutação, negamos a conclusão e convertemos para forma clausal:
  
  const clauses = [
    ['!homem(x)', 'mortal(x)'],   // Todos os homens são mortais
    ['homem(socrates)'],          // Sócrates é homem
    ['!mortal(socrates)']         // Negação da conclusão (para refutação)
  ];
  
  console.log(resolution(clauses));
  
  // Outro exemplo mais simples: ((P → Q) ∧ P) → Q
  // Negando a conclusão e convertendo para forma clausal:
  const simpleExample = [
    ['!p', 'q'],  // P → Q
    ['p'],        // P
    ['!q']        // ¬Q (negação da conclusão)
  ];
  
  console.log("\nExemplo 2:");
  console.log(resolution(simpleExample));