import { Contract, ethers, isAddress, FallbackProvider, JsonRpcProvider } from 'ethers';
import { abi } from "@/utils/abi";
import { Abi, Address, ContractFunctionExecutionError, UserRejectedRequestError, formatUnits, parseUnits } from "viem";

export type SingerOrProvider = ethers.Signer | FallbackProvider | JsonRpcProvider

export function getContract<T extends Contract = Contract>(address: string, ABI: any, provider: SingerOrProvider): T {
  if (!isAddress(address)) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return new ethers.Contract(address, ABI, provider) as T;
}
export function getChallengeContract(address: string, provider: SingerOrProvider) {
  return getContract(address, abi, provider);
}

