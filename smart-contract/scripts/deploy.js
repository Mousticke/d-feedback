async function main() {
  const Feedback = await ethers.getContractFactory("Feedback");
  const feedback_instance = await Feedback.deploy(
    process.env.CONTRACT_OWNER_ADDRESS,
  );
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
//Contract address ropsten without owner 0x1BF9e0aDa3ec764B81349e29F2162F25676c1A01
//Contract address ropsten with owner 0xb4F0996AFae3c8720E5bfcb173422811c2131052
