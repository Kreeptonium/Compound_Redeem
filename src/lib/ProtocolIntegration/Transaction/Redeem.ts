import Web3 from "web3";
import * as dotenv from "dotenv";
import { AbiItem } from 'web3-utils';
import { ICompoundRedeemCompoundTokenResult } from "../Model/CompoundRedeemCompoundTokenResult";

//Configuring the directory path to access .env file
dotenv.config();

let encoded_tx : string;

export const ReedemTokensAsync = async(walletAddress:string) : Promise<ICompoundRedeemCompoundTokenResult>=> {

  //Setting up Ethereum blockchain Node through Infura
  const web3 = new Web3(process.env.infuraUrlRinkeby!);
 
  //Setting Contract Address
  let cTokenContractAddress;
  let cTokenAbiJson;
  //let underlyingDecimals:number;

  const RNKBYcETH = process.env.RNKBYcETH ??'0xd6801a1DfFCd0a410336Ef88DeF4320D6DF1883e';

   // Initialising the Uniswap Router Contract
   cTokenContractAddress = RNKBYcETH;
   cTokenAbiJson = require('../../../lib/abi/Compound/cETH.json');
   const cTokenContract = new web3.eth.Contract(cTokenAbiJson as AbiItem[], process.env.cEthRnkbyAddress!);

  //Returning receipt for "Encoded ABI"
  
    try {
      

        let cTokenBalance = await cTokenContract.methods.balanceOf(walletAddress).call();
        encoded_tx = await cTokenContract.methods.redeem(cTokenBalance).encodeABI();

    }catch (error) {
            throw(error);
          }

          let compoundRedeemCompoundTokenResult:ICompoundRedeemCompoundTokenResult = {
            encodedText:encoded_tx,
            //underlyingTokenContract:underlyingContractAddress,
            compoundTokenContract:cTokenContractAddress,
          }
  return compoundRedeemCompoundTokenResult;
  
}


    
      
