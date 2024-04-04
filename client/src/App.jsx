import { useEffect } from "react"
import toast from "react-hot-toast"

export default function App() {
  useEffect(
    () => {
    toast.success('hello')
  })
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}