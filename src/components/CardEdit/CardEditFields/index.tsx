import { ChangeEvent } from 'react'
import Input from '../../Input'
import * as S from './styles'


interface Props {
	cardData: CardData | undefined
	onSaveCardData: (cardData: CardData) => void
}


export default function CardEditFields({ cardData, onSaveCardData }: Props) {
	const handleNameChange = (value: string) => {
		cardData && onSaveCardData({ ...cardData, name: value })
	}

	const handleTraitsChange = (value: string) => {
		cardData && onSaveCardData({ ...cardData, traits: value })
	}

	const handleActionsChange = (value: string) => {
		cardData && onSaveCardData({ ...cardData, actions: value })
	}

	const handleTypeChange = (value: string) => {
		cardData && onSaveCardData({ ...cardData, type: value })
	}

	const handleLevelChange = (value: string) => {
		cardData && onSaveCardData({ ...cardData, level: value })
	}

	const handleBodyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		cardData && onSaveCardData({ ...cardData, body: event.target.value })
	}

	return (
		<S.CardEdit>
			<Input
				label="Nom:"
				value={cardData?.name ?? ''}
				onChange={handleNameChange}
			/>
			<Input
				label="Traits:"
				value={cardData?.traits ?? ''}
				onChange={handleTraitsChange}
			/>
			<Input
				label="Actions:"
				value={cardData?.actions ?? ''}
				onChange={handleActionsChange}
			/>
			<Input
				label="Type:"
				value={cardData?.type ?? ''}
				onChange={handleTypeChange}
			/>
			<Input
				label="Niveau:"
				value={cardData?.level.toString() ?? ''}
				onChange={handleLevelChange}
			/>
			<S.TextArea value={cardData?.body ?? ''} onChange={handleBodyChange} />
		</S.CardEdit>
	)
}
