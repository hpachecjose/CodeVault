function MessageHTML(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            return `<div class="container"><p>Inner</p></div>`;
            if(typeof input === "number" && input > 20){
                timeSeconds = 4000
            }else{ return console.log("Consulte o suporte.")}
        }, timeSeconds);

    });
}

async function chamador() {
    console.log("Chamando");
    const result = await MessageHTML();
    console.log(result);
}

function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 2000);
  });
}

async function asyncCall() {
  console.log("calling");
  const result = await resolveAfter2Seconds();
  console.log(result);
  // Expected output: "resolved"
}

asyncCall();