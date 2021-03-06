import React, { useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform } from 'react-native'
import { ETASimpleText, ETAButtonFilled, ETAButtonOutline, ETAAuthSocialmedia } from '@etaui'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from '@etaui/translate'
import { LoginManager } from 'react-native-fbsdk'

const logoSize = 70
const avatarRadius = logoSize / 2

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	padding-horizontal: 10px;
	background-color: transparent;
`
const LogoContainer = styled.View`
	flex-direction: row;
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${Platform.OS === 'ios' ? logoSize + 20 : logoSize + 20}px;
	height: ${Platform.OS === 'ios' ? logoSize + 20 : logoSize + 20}px;
	border-radius: ${avatarRadius + 10}px;
	margin-vertical: 30px;
	border-width: 0.3px;
	border-color: ${(props) => props.theme.SECONDARY_BACKGROUND_COLOR_LIGHT};
	background-color: #ffffff;
`
const Logo = styled.Image`
	width: ${Platform.OS === 'ios' ? logoSize : logoSize}px;
	height: ${Platform.OS === 'ios' ? logoSize : logoSize}px;
	border-radius: ${avatarRadius}px;
`
const TextContainer = styled.View`
    width: 100%;
    padding: 20px;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	background-color: transparent;
`
const SocialMediaContainer = styled.View`
	min-height: 200px;
	flex-direction: column;
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	padding-horizontal: 10px;
	background-color: transparent;
`

const AuthWelcomeComponent = () => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const { need_account, log_in, sign_up } = useTranslation()

	useEffect(() => {
		let isUnMounted = false
	    LoginManager.logOut()
		console.log('logeed out');
		return () => {
			isUnMounted = true
		}
	}, [])
	
	const _onShowSigninPress = () => {
		navigation.navigate('AuthNavigator', {
			screen: 'AuthScreen'
		})
	}
	
	const _onShowSignupPress = () => {
		navigation.navigate('AuthNavigator', {
			screen: 'SignupScreen'
		})
	}
	
	return (
		<Root>
			<LogoContainer>
				<Logo source={require('@assets/icons/app-icon.png')} />
			</LogoContainer>
			<TextContainer>
				<ETASimpleText
					size={13}
					weight={Platform.OS === 'ios' ? '300' : '300'}
					color={themeContext.PRIMARY_TEXT_COLOR}
					align='center'>
					{need_account.charAt(0).toUpperCase() + need_account.slice(1)}
				</ETASimpleText>
			</TextContainer>

			<ETAButtonFilled
				title={log_in.charAt(0).toUpperCase() + log_in.slice(1)}
				onPress={() => _onShowSigninPress()}
				colorButton={
					themeContext.SECONDARY_BACKGROUND_COLOR
				}
				padding={10}
				width={250}
				borderRadius={3}
			/>
			
			<ETAButtonOutline
				title={sign_up.charAt(0).toUpperCase() + sign_up.slice(1)}
				onPress={() => _onShowSignupPress()}
				colorButton={
					themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
				}
				padding={10}
				width={240}
				borderRadius={3}
				borderWidth={0.3}
			/>
			
			<SocialMediaContainer>
				<ETAAuthSocialmedia />
			</SocialMediaContainer>
		</Root>
	)
}

export default React.memo(AuthWelcomeComponent)
