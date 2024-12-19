/**
 * Calcula as métricas de avaliação de modelos de classificação.
 *
 * @param {number} vp Verdadeiros Positivos.
 * @param {number} vn Verdadeiros Negativos.
 * @param {number} fp Falsos Positivos.
 * @param {number} fn Falsos Negativos.
 * @returns {object} Um objeto contendo as métricas calculadas (acuracia, sensibilidade, especificidade, precisao, fScore). Retorna null em caso de divisão por zero.
 */
function calcularMetricas(vp, vn, fp, fn) {
  const n = vp + vn + fp + fn;

  if (n === 0) {
      console.error("Total de elementos (N) não pode ser zero.");
      return null; // Retorna null para indicar erro.
  }

  const sensibilidade = vp / (vp + fn);
  const especificidade = vn / (fp + vn);
  const acuracia = (vp + vn) / n;
  const precisao = vp / (vp + fp);

  // Verifica divisão por zero para a precisão
  if (isNaN(precisao) || !isFinite(precisao)) {
    console.warn("Divisão por zero ao calcular a precisão. Retornando 0 para precisão e F-Score.");
  }

  const fScore = 2 * (precisao * sensibilidade) / (precisao + sensibilidade);

  // Verifica divisão por zero para o F-Score
  if (isNaN(fScore) || !isFinite(fScore)) {
    console.warn("Divisão por zero ao calcular o F-Score. Retornando 0 para o F-Score.");
  }

  return {
    acuracia: acuracia,
    sensibilidade: sensibilidade,
    especificidade: especificidade,
    precisao: isNaN(precisao) || !isFinite(precisao) ? 0 : precisao, // Retorna 0 em caso de NaN ou Infinity
    fScore: isNaN(fScore) || !isFinite(fScore) ? 0 : fScore, // Retorna 0 em caso de NaN ou Infinity
  };
}

// Exemplo de uso com uma matriz de confusão arbitrária:
const vp = 85;
const vn = 92;
const fp = 15;
const fn = 8;

const metricas = calcularMetricas(vp, vn, fp, fn);

if (metricas) {
    console.log("Métricas de Avaliação:");
    console.log("Acurácia:", metricas.acuracia);
    console.log("Sensibilidade (Recall):", metricas.sensibilidade);
    console.log("Especificidade:", metricas.especificidade);
    console.log("Precisão:", metricas.precisao);
    console.log("F-Score:", metricas.fScore);
}


// Teste com valores que resultam em divisão por zero para precisão e F-Score
const metricasDivZero = calcularMetricas(50, 20, 0, 30);

if (metricasDivZero) {
  console.log("\nTeste com divisão por zero (FP = 0):");
  console.log("Precisão:", metricasDivZero.precisao);
  console.log("F-Score:", metricasDivZero.fScore);
}

// Teste com total de elementos igual a zero
const metricasTotalZero = calcularMetricas(0, 0, 0, 0);