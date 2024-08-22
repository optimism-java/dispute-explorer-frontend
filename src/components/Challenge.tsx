import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount, useWriteContract } from "wagmi"
import { Button } from "./Button"
import { useCallback } from "react"
import { abi } from "@/utils/abi"
import { Abi } from "viem"


const Challenge = () => {
  const { isConnected } = useAccount()
  const { writeContract } = useWriteContract()

  const handleAttack = useCallback(() => {
    writeContract({
      abi: abi as Abi,
      address: '0x',
      functionName: 'attack',
      args: [],
    }, {
      onSuccess: (res) => {
        console.log(res)
      },
      onError: (res) => {
        console.log(res, 'res1')
      }
    })
  }, [])
  const handleDefend = useCallback(() => {
    writeContract({
      abi: abi as Abi,
      address: '0x',
      functionName: 'defend',
      args: [],
    }, {
      onSuccess: (res) => {
        console.log(res)
      },
      onError: (res) => {
        console.log(res, 'res1')
      }
    })
  }, [])

  return (
    <div>
      <div><ConnectButton accountStatus="address" chainStatus="none" showBalance={false} /></div>
      <div className="mt-4 flex gap-4">
        <Button label="attack" variant="primary" size="md" />
        <Button label="defend" variant="outline" size="md" />
      </div>
    </div>
  )
}

export default Challenge