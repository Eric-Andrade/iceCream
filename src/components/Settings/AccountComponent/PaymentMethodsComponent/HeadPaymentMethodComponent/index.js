import React, {useContext} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {Platform} from 'react-native'
import {ETASimpleText} from '@etaui'
import { useTranslation } from '@etaui/translate'

const logoSize = 70
const avatarRadius = logoSize / 2

const Root = styled.View`
	flex: 0.2;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 15px;
	background-color: transparent;
`
const ContentContainer = styled.View`
	min-height: 20px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: transparent;
	padding: 10px 20px;
`
const LogoContainer = styled.View`
	height: ${Platform.OS === 'ios' ? logoSize + 10: logoSize + 10}px;
	width: ${Platform.OS === 'ios' ? logoSize + 10: logoSize + 10}px;
	border-radius: ${avatarRadius + 10}px;
	flex-direction: row;
	display: flex;
	justify-content: center;
	align-items: center;
	border-width: 0.3px;
	border-color: ${(props) => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
	background-color: ${(props) => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
`
const Logo = styled.Image`
	height: ${Platform.OS === 'ios' ? logoSize : logoSize}px;
	width: ${Platform.OS === 'ios' ? logoSize : logoSize}px;
	border-radius: ${avatarRadius}px;
`

const HeadPaymentMethodComponent = () => {
	const themeContext = useContext(ThemeContext)
	const { payment_text } = useTranslation()

	return (
		<Root>
			<LogoContainer>
				<Logo
					source={{
						uri:
							'https://img.pngio.com/atm-card-png-transparent-atm-cardpng-images-pluspng-debit-card-png-250_250.png',
					}}
				/>
			</LogoContainer>
			<ContentContainer>
				<ETASimpleText
					size={10}
					weight={Platform.OS === 'ios' ? '300' : '200'}
					color={
						themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
					}
					align='left'>
					{payment_text.charAt(0).toUpperCase() + payment_text.slice(1)}
				</ETASimpleText>
			</ContentContainer>
		</Root>
	)
}

export default React.memo(HeadPaymentMethodComponent)
