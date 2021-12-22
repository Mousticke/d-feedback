import Web3 from "web3";
import contract from "./Feedback.json";

export const initWeb3 = (_providerUrl, _contractAddress) => {
  const web3Connector = new Web3(_providerUrl);
  const feedback_contract = new web3Connector.eth.Contract(
    contract.abi,
    _contractAddress,
  );

  return {
    web3Connector,
    feedback_contract,
  };
};
