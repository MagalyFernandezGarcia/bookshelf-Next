import Link from "next/link";

const AccountModal = () => {
    return (
		<div className="fixed top-0 left-0 w-full h-full  bg-black bg-opacity-50 z-50 flex items-center justify-center ">
			<div className="bg-[#E4B781] p-16 rounded-lg flex flex-col gap-12  w-[90%] items-center lg:w-[600px]">
				Votre compte a bien été créer
				<div className="flex gap-4  ">
					<button
						
						className="bg-[#794822] p-4 rounded-lg text-[#F8D8B1]"
					>
						<Link href="/login">Se connecter</Link>
					</button>
				</div>
			</div>
		</div>
	);
}
export default AccountModal