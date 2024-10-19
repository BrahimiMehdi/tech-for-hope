import { BadgeAlert } from "lucide-react"
type Props = {
    message:string
}

const FormError = ({message}: Props) => {
  return (
    <div className='rounded-md w-full justify-center py-2 gap-x-3 text-destructive-foreground  flex items-center px-4 bg-destructive/50'>
        <BadgeAlert size={"18px"} />
        {message}
    </div>

  )
}

export default FormError