










//     function quickSort(arr) {
//         if (arr.length <= 1) return arr;
      
//         const pivot = arr[arr.length - 1]; // Define o pivô como o último elemento
//         const left = [];
//         const right = [];
      
//         for (let i = 0; i < arr.length - 1; i++) {
//           if (arr[i] < pivot) {
//             left.push(arr[i]); // Menores que o pivô
//           } else {
//             right.push(arr[i]); // Maiores ou iguais ao pivô
//           }
//         }
      
//         return [...quickSort(left), pivot, ...quickSort(right)];
//       }
      
//       const unsortedArray = [34, 7, 23, 32, 5, 62];
//       console.log("Array ordenado:", quickSort(unsortedArray));








// function IdQSort(list){
//     var blond =  list.length <=1 ? true : false
//     if(blond){return list}

//     const pivo = list[list.length - 1]
//     const left = []
//     const right = []


//     for(let i = 0; i <list.length -1; i++){
//         if(list[i]< pivo){
//             left.push(list[i])
//         }else{
//             right.push(list[i])
//         }
//     }

//     return [...IdQSort(left), pivo, ...IdQSort(right)]
// }

// var lista =[34,56,12,1,23]
// console.log("Ordenado", IdQSort(lista))




// function quickSortInPlace(arr, left = 0, right = arr.length -1){
//     if(left >= right){
//         return 
//     }

//     const pivoIndex = partition(arr, left, right)

//     quickSortInPlace(arr, left, pivoIndex -1)
//     quickSortInPlace(arr,pivoIndex +1, right)
// }

// function partition(arr, left, right){
//     const pivot = arr[right]
//     let i = left
 
//     for(let j = left; j < right; j++){
//         if(arr[j] < pivot){
//             [arr[i], arr[j]] = [arr[j], arr[i]]
//             i++
//         }
//     }

// [arr[i], arr[right]] = [arr[right], arr[i]]
// return i
    


// }
// const numbers = [10, 7, 8, 9, 1, 5];
// quickSortInPlace(numbers);
// console.log("Array ordenado:", numbers);




let transactions = [
    { id: 1, date: "2025-02-01", amount: 300.50 },
    { id: 2, date: "2025-01-25", amount: 50.25 },
    { id: 3, date: "2025-02-03", amount: 700.00 },
    { id: 4, date: "2025-01-30", amount: 150.00 }
  ];
  
  function quickSortByAmount(arr) {
    if (arr.length <= 1) return arr;
  
    let pivot = arr[arr.length - 1];
    let left = [];
    let right = [];
  
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i].amount < pivot.amount) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
  
    return [...quickSortByAmount(left), pivot, ...quickSortByAmount(right)];
  }
  
  console.log("Transações ordenadas por valor:", quickSortByAmount(transactions));



  let products = [
    { id: 101, name: "Laptop", price: 3500 },
    { id: 102, name: "Smartphone", price: 1800 },
    { id: 103, name: "Smartwatch", price: 950 },
    { id: 104, name: "Tablet", price: 2100 }
  ];
  
  function quickSortByPrice(products) {
    if (products.length <= 1) return products;
  
    let pivot = products[products.length - 1];
    let left = [];
    let right = [];
  
    for (let i = 0; i < products.length - 1; i++) {
      if (products[i].price < pivot.price) {
        left.push(products[i]);
      } else {
        right.push(products[i]);
      }
    }
  
    return [...quickSortByPrice(left), pivot, ...quickSortByPrice(right)];
  }
  
  console.log("Produtos ordenados por preço:", quickSortByPrice(products));
  
  let events = [
    { event: "MoveUnit", time: 300 },
    { event: "BuildStructure", time: 100 },
    { event: "TrainUnit", time: 200 },
    { event: "AttackEnemy", time: 400 }
  ];
  
  function quickSortByTime(arr) {
    if (arr.length <= 1) return arr;
  
    let pivot = arr[arr.length - 1];
    let left = [];
    let right = [];
  
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i].time < pivot.time) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
  
    return [...quickSortByTime(left), pivot, ...quickSortByTime(right)];
  }
  
  console.log("Eventos ordenados por tempo:", quickSortByTime(events));
  



  