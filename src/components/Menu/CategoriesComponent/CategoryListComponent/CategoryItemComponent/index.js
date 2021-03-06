import React, { useContext } from 'react'
import { Platform, Dimensions } from 'react-native'
import styled, { ThemeContext } from 'styled-components'
import { ETASimpleText } from '@etaui'
import LinearGradient from 'react-native-linear-gradient'
import { useTranslation } from '@etaui/translate'
import * as RNLocalize from 'react-native-localize'

const {width} = Dimensions.get('window')

const Item = styled.View`
	height: 175px;
	width: ${width / 2.80}px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
	margin-horizontal: ${width / 30}px;
	margin-vertical: 10px;
	border-top-left-radius: 15px;
	border-top-right-radius: 15px;
	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
	shadow-offset: 2px 3px;
	shadow-radius: 2px;
	shadow-opacity: 0;
	shadow-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
`
const ItemImage = styled.Image`
	height: 180px;
	width: ${width / 2.85}px;
	border-top-left-radius: 15px;
	border-top-right-radius: 15px;
	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
`
const NewContainer = styled.View`
	position: absolute;
	z-index: 100;
	height: 15px;
	min-width: 30px;
	padding-horizontal: 2px;
	bottom: 20px;
	left: 8px;
	background-color: ${(props) => props.theme.PRIMARY_COLOR};
	border-radius: 5px;
	border-width: 1px;
	border-color: transparent;
	justify-content: flex-end;
`
const GradientContainer = styled.View`
	height: 35px;
`

const CategoryItemComponent = ({item}) => {
	const themeContext = useContext(ThemeContext)
	const { isnew } = useTranslation()
	let languageCode = RNLocalize.getLocales()

	return (
		<>
			<Item>
				<ItemImage source={{uri: item.image}} />
				<GradientContainer>
					<LinearGradient 
						colors={[ 'transparent', 'rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.6)']} 
						style={{ flex: 1,
								bottom: 35,
								zIndex: 100,
								borderBottomLeftRadius: 15,
								borderBottomRightRadius: 15, }}>
					</LinearGradient>
				</GradientContainer>
				{item.isNew ? (
					<NewContainer>
						<ETASimpleText
							size={11}
							weight={
								Platform.OS === 'ios'
									? '400'
									: '300'
							}
							// color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
							color='white'
							align='center'>
							{isnew.charAt(0).toUpperCase() + isnew.slice(1)}
						</ETASimpleText>
					</NewContainer>
				) : null}
				<ETASimpleText
					size={14}
					weight={Platform.OS === 'ios' ? '400' : '200'}
					// color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
					color='white'
					align='center'
					style={{
						position: 'absolute',
						bottom: 1,
						left: 7,
						elevation: 4,
						textShadowColor:
							themeContext.THIRD_TEXT_COLOR_LIGHT,
						textShadowOffset: {
							width: 0.5,
							height: 0.7,
						},
						textShadowRadius: 3,
					}}>
					{languageCode[0].languageCode === 'en' 
						?	item.name
						:	item.nombre
					}
				</ETASimpleText>
			</Item>
		</>
	)
}

export default React.memo(CategoryItemComponent)
