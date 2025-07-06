import { FlexRow, OverlayWrapper } from '@/styles/commonStyledComponents'
import { useState } from 'react'

import Input from '../Input'
import * as S from './styles'


interface Props {
	onFinished: (newProjectName: string) => void
}


export default function WelcomeScreen({ onFinished }: Props) {
	const [newProjectName, setNewProjectName] = useState<string>('')

	return (
		<OverlayWrapper>
			<S.Message>{welcomeMessage}</S.Message>
			<FlexRow>
				<Input
					label="Nom du projet"
					value={newProjectName}
					buttonText="OK"
					onButtonClick={() => onFinished(newProjectName)}
					onChange={setNewProjectName}
				/>
			</FlexRow>
		</OverlayWrapper>
	)
}

const welcomeMessage = `Bienvenue dans le créateur de cartes RPG! Vous pouvez utiliser cette page pour importer ou créer des cartes imprimables pour vos sorts, compétences, objets - ou tout ce que vous pouvez imaginer.
\n
Tout d'abord, vous devez choisir un nom pour votre nouveau projet, puis vous pouvez commencer à créer les cartes.

`
