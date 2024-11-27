import { BookData } from "../app/types/Book";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

const Heart = ({
	isFilled,
	onToggle,
}: {
	isFilled: boolean;
	onToggle: () => void;
}) => {
	return (
		<button onClick={onToggle} type="button">
			<svg
				className={
					isFilled
						? "fill-[#D8778D] text-red-400 w-6 h-auto"
						: "fill-white text-red-400 w-6 h-auto"
				}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
			>
				<path
					d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z"
					style={{ stroke: "#311C0D", strokeWidth: 20 }}
				/>
			</svg>
		</button>
	);
};

const HeartVote = ({
	onSetValue,
	onReset,
	rating,
}: {
	onSetValue: UseFormSetValue<BookData>;
	onReset: number;
	rating: number;
}) => {
	const [toggleFillArray, setToggleFillArray] = useState<boolean[]>(
		Array(5)
			.fill(false)
			.map((_, index) => index < rating)
	);
	useEffect(() => {
		setToggleFillArray(
			Array(5)
				.fill(false)
				.map((_, index) => index < rating)
		);
	}, [rating, onReset]);

	const toggle = (index: number) => {
		onSetValue("rating", index + 1);

		 if (toggleFillArray[index] === true) {
			setToggleFillArray((prev) =>
				prev.map((fill, i) => (i > index ? false : fill))
			);
		} else {
			setToggleFillArray((prev) =>
				prev.map((fill, i) => (i <= index ? true : false))
			);
		}
	};

	return (
		<div className="flex  mt-6 justify-center gap-2">
			{toggleFillArray.map((isFilled, index) => (
				<Heart key={index} isFilled={isFilled} onToggle={() => toggle(index)} />
			))}
		</div>
	);
};

export default HeartVote;
