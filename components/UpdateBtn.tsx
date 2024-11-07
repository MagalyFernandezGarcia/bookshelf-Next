
import Image from "next/image";
import pen from "@/images/pen.svg";
const UpdateBtn = ({sizeIcon} : {sizeIcon: number}) => {
    return( <Image
        src={pen}
        alt="trash"
        width={sizeIcon}
        height={sizeIcon}
      />)
}

export default UpdateBtn