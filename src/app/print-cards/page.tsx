'use client'

import Card from '@/components/Card'
import { CardDimensionsCtx } from '@/components/Card/cardContexts'
import { standardFFG } from '@/data/cardDimension'
import { useCards } from '@/stores/projectStore'

import * as S from './styles'

export default function Home() {
	const cardsToPrint = useCards().reduce<CardData[]>((collection, card) => {
		for (let i = 0; i < card.numberToPrint; i++) {
			collection.push(card)
		}
		return collection
	}, [])

	const sortedCardsToPrint = cardsToPrint.slice().sort((a, b) => a.name.localeCompare(b.name))

	return (
		<CardDimensionsCtx.Provider value={standardFFG}>
			<S.PrintView>
				{sortedCardsToPrint.map((card, index) => (
					<Card cardData={card} key={index} />
				))}
			</S.PrintView>
		</CardDimensionsCtx.Provider>
	)
}
