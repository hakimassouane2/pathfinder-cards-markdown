import { Pages } from "@/enums/pages"
import { useNumberToPrint, useProjectActions } from "@/stores/projectStore"
import {
	FlexColumn,
	FlexRow,
	PrimaryButton,
	PrimaryButtonRound,
} from "@/styles/commonStyledComponents"
import { isNumber } from "@/utils/utils"
import { useRouter } from "next/navigation"

import * as S from "./styles"

interface Props {
	cardIndex: number
	children: React.ReactNode
}

export const CardControlWrapper = ({ cardIndex, children }: Props) => {
	const router = useRouter()
	const { changeNumberToPrint, removeCardByIndex } =
		useProjectActions()
	const numberToPrint = useNumberToPrint(cardIndex)

	const handleIncreaseNumber = () => {
		/* Originally projects did not have number of cards to print. If that
		is the case here, let's follow user's most likely intent and increase
		the number of prints to 1. */
		const finalNumber = isNumber(numberToPrint) ? numberToPrint + 1 : 1
		changeNumberToPrint(cardIndex, finalNumber)
	}

	const handleDecreaseNumber = () => {
		/* See previous note, this time the most probable intent is to not
		print the card. */
		const finalNumber = !isNumber(numberToPrint)
			? 0
			: numberToPrint > 0
				? numberToPrint - 1
				: 0
		changeNumberToPrint(cardIndex, finalNumber)
	}

	return (
		<FlexColumn>
			<S.CardWrapper
				disabled={!numberToPrint}
				onClick={() => router.push(`${Pages.editCard}/${cardIndex}`)}
			>
				{children}
			</S.CardWrapper>
			<S.ButtonsRow>
				<FlexRow>
					<PrimaryButtonRound
						title={"Augmenter le nombre de cartes à imprimer"}
						onClick={handleIncreaseNumber}
					>
						+
					</PrimaryButtonRound>
					{numberToPrint}
					<PrimaryButtonRound
						title={"Diminuer le nombre de cartes à imprimer"}
						onClick={handleDecreaseNumber}
					>
						-
					</PrimaryButtonRound>
				</FlexRow>
				<PrimaryButton
					title="Supprimer cette carte"
					onClick={() => removeCardByIndex(cardIndex)}
				>
					Supprimer
				</PrimaryButton>
			</S.ButtonsRow>
		</FlexColumn>
	)
}
