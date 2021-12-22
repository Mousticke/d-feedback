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

//Contract address local 0xD735c8F335669503FD97765980c12f2825900BF2