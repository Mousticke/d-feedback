const { expect } = require("chai");

let Feedback;
let hardhatFeedback;
let owner;
let addr1;

describe("Feedback contract", function () {
  beforeEach(async function () {
    Feedback = await ethers.getContractFactory("Feedback");
    [owner, addr1] = await ethers.getSigners();
    hardhatFeedback = await Feedback.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      console.log("Owner ", await hardhatFeedback.owner());
      expect(await hardhatFeedback.owner()).to.equal(owner.address);
    });
  });

  describe("Feedback", function () {
    it("Should not create a feedback (rate is invalid)", async function () {
      await expect(
        hardhatFeedback.createFeed(6, "Test message", "Test user"),
      ).to.be.revertedWith("The rate must be between 0 and 5");
    });

    it("Should not create a feedback (user is invalid)", async function () {
      await expect(
        hardhatFeedback.createFeed(4, "Test message", ""),
      ).to.be.revertedWith("The string cannot be empty");
    });

    it("Should not create a feedback (message is invalid)", async function () {
      await expect(
        hardhatFeedback.createFeed(3, "", "Test user"),
      ).to.be.revertedWith("The string cannot be empty");
    });

    it("Should create a feedback with event", async function () {
      const request = await hardhatFeedback.createFeed(
        3,
        "Test message",
        "Test user",
      );
      const transactionReceipt = await request.wait();
      expect(transactionReceipt.events[0].args[1]).to.equal("Test message");
      expect(transactionReceipt.events[0].args[2]).to.equal("Test user");
      expect(transactionReceipt.events[0].args[3]).to.equal(3);
    });
  });
});
