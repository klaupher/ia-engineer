import tf, { train } from '@tensorflow/tfjs-node';

async function trainModel(inputXs, outputYs) {
  const model = tf.sequential()

  //primeira cama da rede:
  //entrad de 7 posições (idade normalizada + 3 cores + 3 localizações)
  
  //80 neuronios = aqui coloquei tudo iss, pq tem pouca base de treino
  //quanto mais neuronios, mais complexidade a rede pode aprender
  //e consequentemente, mais processamento ela vai usar

  // a ReLU age como um filtro:
  // É como se ela deixasse somente os dados interessantes seguirem viagem na rede
  // Se a informação chegou nesse neuronio é positiva, passa para a frente!
  // se for zero ou negativa, pdoe jogar fora, nçao vai servir para nada
  model.add(tf.layers.dense({inputShape: [7], units: 80, activation: 'relu' }))
  // saida: 3 neuronios
  // 1 para cada categoria (premium, mediumn e basic)
  model.add(tf.layers.dense({ units: 3, activation: 'softmax'}))

  // Compilando o modelo
  // optimizer Adam (Adaptive Moment Estimation)
  // é um treinador essoal moderno para redes neurais
  // ajustra os pesos de forma eficiente e inteligente
  // aprender com hsitorico de erros e acertos
  // loss: 'categoricaCrossentropy'
  // compara o que o modelo "acha" (os scores de cada categoria)
  // com a resposta certa
  // a categoria 'premium' será sempre [1,0,0]

  // quanto mais distante da previsão de mopdelo da resposta correta
  // maior o erro (loss)
  // Exemplo clássico: classificação de imagens, recomendação, categorização de usuário
  model.compile({
    optimizer: 'adam', 
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy']
  })

  //treinamento do modelo
  await model.fit(
    inputXs,
    outputYs,
    {
      verbose: 0, // não mostra o log interno (e usa do callback)
      epochs: 100, // quantidade de vezes que vai rodar no dataset
      shuffle: true, // embaralha para não viciar o algoritmo - evitar viés
      callbacks: {
        // onEpochEnd: (epoch, log) => console.log(
        //   `Epoch: ${epoch}: loss = ${log.loss}`
        // )
      }
    }
  )
  return model
}

async function predict(model, pessoaTensorNormalizada) {
  // transformar o array js para o tensor
  const tfInput = tf.tensor2d(pessoaTensorNormalizada);
  // Faz a predição (output será um vetor de 3 probabilidades)
    const pred = model.predict(tfInput)
    const predArray = await pred.array() 
    console.log (predArray)
    return predArray[0].map((prob, index) => ({ prob, index }))
}
// Exemplo de pessoas para treino (cada pessoa com idade, cor e localização)
// const pessoas = [
//     { nome: "Erick", idade: 30, cor: "azul", localizacao: "São Paulo" },
//     { nome: "Ana", idade: 25, cor: "vermelho", localizacao: "Rio" },
//     { nome: "Carlos", idade: 40, cor: "verde", localizacao: "Curitiba" }
// ];

// Vetores de entrada com valores já normalizados e one-hot encoded
// Ordem: [idade_normalizada, azul, vermelho, verde, São Paulo, Rio, Curitiba]
// const tensorPessoas = [
//     [0.33, 1, 0, 0, 1, 0, 0], // Erick
//     [0, 0, 1, 0, 0, 1, 0],    // Ana
//     [1, 0, 0, 1, 0, 0, 1]     // Carlos
// ]

// Usamos apenas os dados numéricos, como a rede neural só entende números.
// tensorPessoasNormalizado corresponde ao dataset de entrada do modelo.
const tensorPessoasNormalizado = [
    [0.33, 1, 0, 0, 1, 0, 0], // Erick
    [0, 0, 1, 0, 0, 1, 0],    // Ana
    [1, 0, 0, 1, 0, 0, 1]     // Carlos
]

// Labels das categorias a serem previstas (one-hot encoded)
// [premium, medium, basic]
const labelsNomes = ["premium", "medium", "basic"]; // Ordem dos labels
const tensorLabels = [
    [1, 0, 0], // premium - Erick
    [0, 1, 0], // medium - Ana
    [0, 0, 1]  // basic - Carlos
];

// Criamos tensores de entrada (xs) e saída (ys) para treinar o modelo
const inputXs = tf.tensor2d(tensorPessoasNormalizado)
const outputYs = tf.tensor2d(tensorLabels)

// quanto mais dado melhor!
// assim o algoritmo consegue entender melhor os padrões complexos
// dos dados
const model = await trainModel(inputXs, outputYs)

const pessoa = {nome: 'zé', idade: '28', cor: 'verde', localizacao: 'Curitiba'}
// Normalizando a idade da nova pesoa usando o mesmo padrão do treino
// Exemplo: idade_min = 25, idade_max = 40, então (28 - 25) / (40 - 25 ) = 0.2

const pessoaTensorNormalizada = [
  [
    0.2, // idade normalizada
    1, // cor azul
    0, // cor vermelha
    0, // cor verde
    0, // São Paulo
    1, // Rio
    0 // Curitiba
  ]
]

const previsoes = await predict(model, pessoaTensorNormalizada)
const results = previsoes
    .sort((a, b) => b.prob - a.prob) //para mostrar primeiro o de maior probabilidade
    .map(p => `${labelsNomes[p.index]} (${(p.prob * 100).toFixed(2)}%)`)
    .join('\n')

console.log(results)