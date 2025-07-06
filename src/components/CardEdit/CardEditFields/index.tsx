import { useState } from 'react'
import ReactMde from 'react-mde'
import 'react-mde/lib/styles/css/react-mde-all.css'
import Showdown from 'showdown'
import Input from '../../Input'
import * as S from './styles'

interface Props {
	cardData: CardData | undefined
	onSaveCardData: (cardData: CardData) => void
}

export default function CardEditFields({ cardData, onSaveCardData }: Props) {
	const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write')
	const converter = new Showdown.Converter()

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
			<div style={{ marginTop: 10 }}>
				<label>Corps de la carte:</label>
				<ReactMde
					value={cardData?.body ?? ''}
					onChange={value => cardData && onSaveCardData({ ...cardData, body: value })}
					selectedTab={selectedTab}
					onTabChange={setSelectedTab}
					generateMarkdownPreview={markdown => Promise.resolve(converter.makeHtml(markdown))}
					childProps={{
						writeButton: { tabIndex: -1 },
					}}
				/>
			</div>
		</S.CardEdit>
	)
}
