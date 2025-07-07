import { useContext } from "react"

import renderMarkdownText from "@/utils/renderMarkdownBody"
import { CardDataCtx, CardDimensionsCtx } from "../cardContexts"
import * as S from "../styles"


export default function Body() {
	const { body } = useContext(CardDataCtx)
	const { width } = useContext(CardDimensionsCtx)

	return (
		<S.Body width={width}>{renderMarkdownText(body, width)}</S.Body>
	)
}
