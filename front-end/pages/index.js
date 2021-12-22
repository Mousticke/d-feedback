import { useEffect, useState } from "react";
import { initWeb3 } from "../contracts/web3Provider";
import {
  loadLastFeedBack,
  createFeedBack,
} from "../contracts/feedback_interactor";
import StarRating from "../components/StarRating";

export default function Home({
  providerUrl,
  contractAddress,
  address_public_key,
  address_private_key,
}) {
  const [status, setStatus] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [feed, setFeed] = useState({});
  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(0);

  const { web3Connector, feedback_contract } = initWeb3(
    providerUrl,
    contractAddress,
  );

  useEffect(async () => {
    async function fetchLastFeedback() {
      const feed = await loadLastFeedBack(feedback_contract);
      const returnValue = {
        rate: feed["rate"],
        username: feed["user"],
        message: feed["message"],
        createdAt: feed["createdAt"],
      };
      setFeed(Object.assign({}, returnValue));
    }

    fetchLastFeedback();
    addSmartContractListener();
  }, []);

  function addSmartContractListener() {
    feedback_contract.events.OnNewFeed({}, (error, data) => {
      if (error) {
        setStatus("😥 " + error.message);
      } else {
        const returnValue = {
          rate: data.returnValues["rate"],
          username: data.returnValues["user"],
          message: data.returnValues["message"],
          createdAt: data.returnValues["createdAt"],
        };
        setFeed(Object.assign({}, returnValue));
        setNewMessage("");
        setNewUsername("");
        setRating(0);
        setStatus("🎉 Your feedback has been updated ");
      }
    });
  }

  const create = async () => {
    const { status } = await createFeedBack(
      web3Connector,
      feedback_contract,
      contractAddress,
      address_public_key,
      address_private_key,
      rating,
      newMessage,
      newUsername,
    );
    setStatus(status);
  };

  return (
    <div id="container">
      <h2 style={{ paddingTop: "50px" }}>Last Feedback:</h2>
      <p>{JSON.stringify(feed)}</p>

      <h2 style={{ paddingTop: "18px" }}>New Feedback:</h2>

      <div>
        <input
          type="text"
          placeholder="Your feedback."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <input
          type="text"
          placeholder="Define the username."
          onChange={(e) => setNewUsername(e.target.value)}
          value={newUsername}
        />
        <StarRating
          rating={rating}
          setRating={setRating}
          hover={hover}
          setHover={setHover}
        />
        <p id="status">{status}</p>

        <button id="publish" onClick={create}>
          Add Feedback
        </button>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      providerUrl: process.env.PROVIDER_WS,
      contractAddress: process.env.CONTRACT_ADDRESS,
      address_public_key: process.env.PUBLIC_KEY,
      address_private_key: process.env.PRIVATE_KEY,
    },
  };
}
