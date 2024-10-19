
async function Await<T>({promise,children}:{promise:Promise<T>,children:(value:T)=>JSX.Element}) {
    // function delay(time:number) {
    //     return new Promise(resolve => setTimeout(resolve, time));
    //   }
    // async function test() {
    //     console.log('start timer');
    //     await delay(6000);
    //   }
    //   await test()
    let data = await promise
  return children(data)
}

export default Await