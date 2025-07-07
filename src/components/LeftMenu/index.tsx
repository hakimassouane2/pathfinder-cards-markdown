import { Pages } from "@/enums/pages"
import { useOverlayActions } from "@/stores/overlayStore"
import { useProjectActions, useProjectName } from "@/stores/projectStore"
import { PrimaryButton, PrimaryLink } from "@/styles/commonStyledComponents"


export default function LeftMenu() {
	const projectNameExists = !!useProjectName()

	const { saveProject } = useProjectActions()
	const { showLoadProjectOverlay, showSaveProjectAsOverlay } = useOverlayActions()

	return (
		<>
			{projectNameExists && (
				<PrimaryLink href={Pages.home}>Projet</PrimaryLink>
			)}

			{projectNameExists && (
				<PrimaryLink href={Pages.createCard}>Créer une carte</PrimaryLink>
			)}

			{projectNameExists && (
				<PrimaryLink href={Pages.importCard}>Importer une carte</PrimaryLink>
			)}

			{projectNameExists && (
				<PrimaryButton onClick={saveProject}>Sauvegarder</PrimaryButton>
			)}

			{projectNameExists && (
				<PrimaryButton onClick={() => showSaveProjectAsOverlay()}>
					Sauvegarder sous
				</PrimaryButton>
			)}

			{projectNameExists && (
				<PrimaryButton onClick={() => showLoadProjectOverlay()}>
					Charger un projet
				</PrimaryButton>
			)}

			{projectNameExists && (
				<PrimaryLink href={Pages.printView}>Impression</PrimaryLink>
			)}
		</>
	)
}
