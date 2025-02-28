import { useAccount, useEnsName, useDisconnect } from "wagmi";
import Balance from "./Balance";
import SignMessage from "./SignMessage";
import SendTransaction from "./SendTransaction";
import StatusCircle from "./StatusCircle";
import Divider from "./Divider";

const Wallet = () => {
  const { address, connector: activeConnector, status, chain } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { disconnect } = useDisconnect();

  return (
    <div className="wallet-container">
      <div>Connector: {activeConnector?.name}</div>
      <div className="status-container">
        <div>Status:</div> <StatusCircle status={status} />
      </div>

      {chain && <div>Chain: {chain?.name}</div>}
      <Divider />
      <div>Connected to {ensName ?? address}</div>
      <Balance address={address} />
      <Divider />
      <SignMessage />
      <Divider />
      <SendTransaction />
      <Divider />
      <button className="disconnect-button" onClick={disconnect}>
        Disconnect
      </button>
    </div>
  );
};

export default Wallet;
