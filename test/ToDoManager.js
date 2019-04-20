// const etherlime = require('etherlime');
// const ToDoManager = require('../build/ToDoManager.json');
// let toDoInstance;
// async function getToDoIndex(_toDo) {
//     let index = await toDoInstance.indexCounter();
//     for(let i = 0; i < index.toNumber(); i++){
//         let toDo = await toDoInstance.getToDoByIndex(i);
//         if(toDo == _toDo){
//           return i
//         }
//     }
// }
//
// describe('Example', () => {
//     let aliceAccount = accounts[3];
//     let deployer;
//     let shoppingToDo = "go shopping";
//
//     before(async () => {
//
//         deployer = new etherlime.EtherlimeGanacheDeployer(aliceAccount.secretKey);
//         toDoInstance = await deployer.deploy(ToDoManager);
//
//         await toDoInstance.addToDo(shoppingToDo)
//     });
//
//     it('should add new ToDo', async () => {
//         let index = getToDoIndex(shoppingToDo)
//         let toDoStatus = await toDoInstance.getToDoStatus(index)
//         assert.equal(toDoStatus, 1)
//     })
//
//     it('should change ToDo status', async () => {
//         let index = await getToDoIndex(shoppingToDo)
//         await toDoInstance.changeToDoStatus(index)
//         let toDoStatus = await toDoInstance.getToDoStatus(index)
//         assert.equal(toDoStatus, 2)
//     });
//
//     it('should revert if ToDo has been already done', async () => {
//         let index = await getToDoIndex(shoppingToDo)
//         await toDoInstance.changeToDoStatus(index)
//         await assert.revert(toDoInstance.changeToDoStatus(index))
//     })
//
//     it('should remove ToDo', async () => {
//         let index = await getToDoIndex(shoppingToDo)
//         await toDoInstance.removeToDo(index)
//         let toDoStatus = await toDoInstance.getToDoStatus(index);
//         assert.equal(toDoStatus, 0)
//     })
// });
