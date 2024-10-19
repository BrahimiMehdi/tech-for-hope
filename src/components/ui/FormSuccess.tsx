import { BadgeCheck } from "lucide-react"
type Props = {
    message:string
}

const FormSuccess = ({message}: Props) => {
  return (
    <div className='rounded-md py-2 gap-x-3 text-emerald-600  w-full justify-center flex items-center px-4 bg-emerald-100'>
        <BadgeCheck size={"18px"} />
        {message}
    </div>

  )
}

export default FormSuccess