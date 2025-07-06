'use client'

import Card from '@/components/Card'
import { CardDimensionsCtx } from '@/components/Card/cardContexts'
import { CardControlWrapper } from '@/components/CardControlsWrapper'
import { standardFFG } from '@/data/cardDimension'
import { useCards } from '@/stores/projectStore'

import * as S from './styles'


export default function Home() {
	const cards = useCards()
	const sortedCards = cards.slice().sort((a, b) => a.name.localeCompare(b.name))

	return (
		<CardDimensionsCtx.Provider value={standardFFG}>
			<S.Project>
				{sortedCards.map((card, index) => (
					<CardControlWrapper cardIndex={index} key={index}>
						<Card cardData={card} />
					</CardControlWrapper>
				))}
			</S.Project>
		</CardDimensionsCtx.Provider>
	)
}
