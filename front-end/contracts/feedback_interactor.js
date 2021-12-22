export const loadLastFeedBack = async (contract_instance) => {
  const feeds = [];
  const get_feedback_count = await contract_instance.methods
    .getFeedCount()
    .call();

  feeds = await contract_instance.methods.feeds(get_feedback_count - 1).call();
  return feeds;
};

export const createFeedBack = async (
  web3Connector,
  contract_instance,
  contract_address,
  address_public_key,
  address_private_key,
  rate,
  message,
  username,
) => {
  if (rate > 5 || rate < 0) {
    return {
      status: "❌ Your rate must be between 0 and 5.",
    };
  }

  if (message === "") {
    return {
      status: "❌ Your message must be filled.",
    };
  }

  if (username === "") {
    return {
      status: "❌ You must provide a username.",
    };
  }

  const gasLimit = await web3Connector.eth.estimateGas({
    to: contract_address,
    data: contract_instance.methods
      .createFeed(rate, message, username)
      .encodeABI(),
  });
  const nonce = await web3Connector.eth.getTransactionCount(
    address_public_key,
    "latest",
  );

  const tx = {
    nonce: nonce,
    from: address_public_key,
    to: contract_address,
    gasLimit: gasLimit,
    data: contract_instance.methods
      .createFeed(rate, message, username)
      .encodeABI(),
  };

  try {
    const signedTx = await web3Connector.eth.accounts.signTransaction(
      tx,
      address_private_key,
    );
    const txHash = await web3Connector.eth.sendSignedTransaction(
      signedTx.rawTransaction,
    );

    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://ropsten.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    };
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }
};
