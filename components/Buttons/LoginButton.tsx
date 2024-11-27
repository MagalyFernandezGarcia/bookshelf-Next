
import { useFormStatus } from "react-dom";
import Spinner from "../Spinner";


export default function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button className="mt-12 bg-[#794822] p-4 rounded-lg text-[#F8D8B1] min-w-[110px]" type="submit" disabled={pending}>
      {pending ? <Spinner size={40}/> : "Sign in"}
      
    </button>
  );
}