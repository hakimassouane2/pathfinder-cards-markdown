/**
 * Markdown Renderer for Pathfinder Cards
 * 
 * This renderer combines ReactMarkdown with the existing keyword emphasis system.
 * It preserves all the original functionality (keyword emphasis, action icons, horizontal rules)
 * while adding full markdown support including:
 * - Headers (# ## ###)
 * - Bold (**text**) and italic (*text*)
 * - Lists (- and 1.)
 * - Code blocks (`code` and ```code```)
 * - Blockquotes (> text)
 * - Tables
 * - And more via remark-gfm
 * 
 * The keyword emphasis system continues to work within markdown elements,
 * so game terms like "AC", "actions", "creature" etc. are still emphasized.
 */

import { czechKeywords, czechNumericKeywords, keywords, numericKeywords } from '@/data/keyWords'
import { Hr, Paragraph } from '@/styles/commonStyledComponents'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { actionIcons, createActionIcon } from './createActionIcon'

// Custom components for ReactMarkdown that integrate with existing keyword emphasis
const MarkdownComponents = {
	p: ({ children, ...props }: any) => {
		return <Paragraph {...props}>{processTextContent(children)}</Paragraph>
	},
	hr: () => <Hr />,
	strong: ({ children, ...props }: any) => {
		return <strong {...props}>{processTextContent(children)}</strong>
	},
	em: ({ children, ...props }: any) => {
		return <em {...props}>{processTextContent(children)}</em>
	},
	// Handle other markdown elements while preserving keyword emphasis
	span: ({ children, ...props }: any) => {
		return <span {...props}>{processTextContent(children)}</span>
	},
	div: ({ children, ...props }: any) => {
		return <div {...props}>{processTextContent(children)}</div>
	}
}

// Process text content to apply keyword emphasis (similar to the original emphasizeWords function)
function processTextContent(content: React.ReactNode): React.ReactNode {
	if (typeof content === 'string') {
		return emphasizeWords(content)
	}
	
	if (Array.isArray(content)) {
		return content.map((item, index) => {
			if (typeof item === 'string') {
				return <React.Fragment key={index}>{emphasizeWords(item)}</React.Fragment>
			}
			return item
		})
	}
	
	return content
}

// Enhanced emphasizeWords function that works with markdown
function emphasizeWords(text: string) {
	const words = text.split(' ')
	const actionIndex = words.findIndex((word) =>
		Object.keys(actionIcons).includes(word),
	)

	return words.map((word, index) => {
		const shouldBeEmphasized = (
			index < actionIndex ||
			keywords.includes(word) || (
				// Numeric keywords should only be emphasized when used
				// together with a number
				numericKeywords.includes(word) &&
				!isNaN(Number(words[index + 1]))
			) || (
				czechKeywords.includes(word)
			) || (
				czechNumericKeywords.includes(word) &&
				!isNaN(Number(words[index + 1]))
			)
		)
		const icon = createActionIcon(word, 10, index)
		return icon ? (
			icon
		) : shouldBeEmphasized ? (
			<b key={index}>{word} </b>
		) : (
			<span key={index}>{word} </span>
		)
	})
}

export default function renderMarkdownText(text: string, cardWidth?: number) {
	// Handle the special case where '-' creates horizontal rules (existing functionality)
	if (text.includes('\n-\n')) {
		const paragraphs = text.split('\n')
		return paragraphs.map((paragraph, index) => {
			return paragraph === '-' && index < paragraphs.length ? (
				<Hr key={index} />
			) : (
				<ReactMarkdown 
					key={index}
					remarkPlugins={[remarkGfm]}
					components={MarkdownComponents}
				>
					{paragraph}
				</ReactMarkdown>
			)
		})
	}

	// For regular markdown content
	return (
		<ReactMarkdown 
			remarkPlugins={[remarkGfm]}
			components={MarkdownComponents}
		>
			{text}
		</ReactMarkdown>
	)
} 