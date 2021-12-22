async function main() {
  const Feedback = await ethers.getContractFactory("Feedback");
  const feedback_instance = await Feedback.deploy();
  console.log(
    "Smart contract Feedback deployed at : ",
    feedback_instance.address,
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
