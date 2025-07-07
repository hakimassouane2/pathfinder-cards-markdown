"use client"

import Card from "@/components/Card"
import CardEditFields from "@/components/CardEdit/CardEditFields"
import { emptyCard } from "@/data/emptyCard"
import { useProjectActions } from "@/stores/projectStore"
import { PageColumn, PrimaryButton } from "@/styles/commonStyledComponents"
import { useState } from "react"

import * as S from "./styles"

export default function CreateCard() {
	const [cardData, setCardData] = useState<CardData>(emptyCard)
	const { addCard } = useProjectActions()

	const handleAddCard = () => {
		addCard(cardData)
		setCardData(emptyCard)
	}

	return (
		<S.CreateCardView>
			<PageColumn>
				<CardEditFields cardData={cardData} onSaveCardData={setCardData} />
			</PageColumn>
			<PageColumn>
				<Card cardData={cardData} />
				<PrimaryButton onClick={handleAddCard}>Ajouter une carte</PrimaryButton>
			</PageColumn>
		</S.CreateCardView>
	)
}
