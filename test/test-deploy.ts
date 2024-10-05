import { assert } from "chai";
import { ethers } from "hardhat";

describe("SimpleStorage", () => {
  // before for initial setup
  let SimpleStorageFactory, SimpleStorageContract;
  beforeEach(async () => {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    SimpleStorageContract = await SimpleStorageFactory.deploy();
  });
  it("Favorite number should be 0", async () => {
    const expectedValue = 0;
    const FavNumber = await SimpleStorageContract!.retrieve();
    assert.equal(FavNumber.toString(), expectedValue);
  });
  it("should update when calling store func", async () => {
    const newNum = "7";
    await SimpleStorageContract!.store(newNum);
    const updatedNum = await SimpleStorageContract!.retrieve();
    assert.equal(newNum, updatedNum.toString());
  });
  it("test addPerson and favnumb", async () => {
    const person = { name: "John", favNumber: 7 };
    await SimpleStorageContract!.addPerson(person);
    const peopleArray=await SimpleStorageContract!.people;
    const storedPerson = peopleArray[0];
    assert.equal(storedPerson, person);
  });
});
