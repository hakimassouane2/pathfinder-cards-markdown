"use client"

import { emptyCard } from "@/data/emptyCard"
import { useProjectActions } from "@/stores/projectStore"
import {
	Label,
	PageColumn,
	PrimaryButton,
} from "@/styles/commonStyledComponents"
import { isCardData } from "@/utils/cardUtils"
import { useState } from "react"

import Card from "../Card"
import CardEditFields from "./CardEditFields"
import * as S from "./styles"


interface Props {
	initialCard: CardData
	cardIndex: number | null
}


export default function CardEdit({ initialCard, cardIndex }: Props) {
	const [cardData, setCardData] = useState<CardData>(initialCard)
	const { addCard, saveCardByIndex, removeCardByIndex } = useProjectActions()

	const jsonValue = JSON.stringify(cardData)
	const transformData = (stringifiedNewCard: string) => {
		let transformedCard
		try {
			transformedCard = JSON.parse(stringifiedNewCard)
		} catch (error) {
			console.debug(error)
		}

		if (isCardData(transformedCard)) {
			setCardData(transformedCard)
		}
	}

	const handleOnSaveClick = () => {
		if (cardData) {
			if (cardIndex) {
				saveCardByIndex(cardData, cardIndex)
			} else {
				addCard(cardData)
			}
			setCardData(emptyCard)
		}
	}

	return (
		<S.CardImport>
			<PageColumn>
				<Label>Coller les données dans le format correct:</Label>
				<S.CardImportTextArea
					value={jsonValue}
					onChange={(event) => transformData(event.target.value)}
				/>
			</PageColumn>
			<PageColumn>
				<CardEditFields cardData={cardData} onSaveCardData={setCardData} />
			</PageColumn>
			<PageColumn>
				<Card cardData={cardData} />
				<PrimaryButton disabled={!cardData} onClick={handleOnSaveClick}>
					Sauvegarder
				</PrimaryButton>
				{typeof cardIndex === "number" && (
					<PrimaryButton onClick={() => removeCardByIndex(cardIndex)}>
						Supprimer
					</PrimaryButton>
				)}
			</PageColumn>
		</S.CardImport>
	)
}
