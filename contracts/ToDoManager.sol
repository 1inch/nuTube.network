pragma solidity ^0.5.0;

contract ToDoManager {
    
    enum Status {Initial, ToDo, InProgress, Done}
    mapping (uint => string) public todoByIndex;
    mapping (uint => Status) public statusOf;
    uint public indexCounter;
    
    
    function addToDo(string memory _toDo) public {
        todoByIndex[indexCounter] = _toDo;
        statusOf[indexCounter] = Status.ToDo;
        indexCounter++;
    }

    
    function changeToDoStatus(uint _index) public {
        uint currentStatus = uint(statusOf[_index]);
        require(currentStatus < 3);
        statusOf[_index] = Status(currentStatus + 1);
    }
    
    function removeToDo(uint _index) public {
        require(uint(statusOf[_index]) != uint(Status.Initial));
        statusOf[_index] = Status.Initial;
        todoByIndex[_index] = "empty";
    }

    function getToDoByIndex(uint _index) public view returns (string memory) {
        return todoByIndex[_index];
    }

    function getToDoStatus(uint _index) public view returns(Status) {
        return statusOf[_index];
    }

    
}