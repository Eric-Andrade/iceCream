import React, { useState , useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { ETATextInputOutline, ETAButtonFilled, ETAErrorMessage } from '@etaui'
import { useTranslation } from '@etaui/translate'
// import { graphql, compose } from 'react-apollo';
// import { connect } from 'react-redux';
// import signupMutation from '../graphql/mutations/signup'
// import Loading from '../Loading';
// import { login } from '../actions/client'

const signup = 'Sign up'

const Root = styled.TouchableWithoutFeedback`
	flex: 1;
	position: relative;
	justify-content: center;
`
const FormContainer = styled.View`
	flex: 1;
	flex-direction: column;
	display: flex;
	justify-content: center;
	align-items: center;
	padding-horizontal: 10px;
`
const ButtonContainer = styled.View`
	height: 20px;
	margin-top: 15px;
`

const validationSchema = yup.object().shape({
	fullname: yup
		.string()
		.matches(
			/^[A-Za-zÑñ ]*$/,
			'Please do not insert special characters',
		)
		.required('This field is required')
		.uppercase(),
	username: yup
		.string()
		.matches(
			/^[A-Za-z0-9]*$/,
			'Please do not insert special characters',
		)
		.required('This field is required')
		.uppercase(),
	cellphone: yup
		.string()
		.matches(/^[0-9]*$/, 'Cellphone should has only numbers')
		.min(10, 'Cellphone should has 10 characters')
		.max(10, 'Cellphone should has 10 characters')
		.typeError('Phone should has only numbers')
		.required('This field is required'),
	password: yup
		.string()
		.matches(
			/^[A-Za-z0-9]*$/,
			'Please do not insert special characters',
		)
		.required('This field is required')
		.min(5, 'Password must be bigger')
		.uppercase(),
	confirmPassword: yup
		.string()
		.matches(
			/^[A-Za-z0-9]*$/,
			'Please do not insert special characters',
		)
		.required('This field is required')
		.min(5, 'Password must be bigger')
		.oneOf([yup.ref('password'), null], 'Passwords must match'),
})

const SignupForm = () => {
	const themeContext = useContext(ThemeContext)
	const [mysecureTextEntry] = useState(true)
	const {  } = useTranslation()

	return (
		<Root>
			<Formik
				enableReinitialize
				initialValues={{
					fullname: '',
					username: '',
					cellphone: '',
					password: '',
				}}
				onSubmit={(values, actions) => {
					// signUp({
					// 	fullname: values.fullname,
					// 	username: values.username,
					// 	cellphone: values.cellphone,
					// 	password: values.password,
					// })
					setTimeout(() => {
						actions.setSubmitting(false)
						// alert(JSON.stringify(values))
					}, 2000)
				}}
				validationSchema={validationSchema}>
				{({
					handleChange,
					handleBlur,
					handleSubmit,
					values,
					isSubmitting,
					errors,
				}) => (
					<FormContainer>
						<ETATextInputOutline
							value={values.fullname}
							placeholder='Fullname'
							placeholderTextColor={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
							keyboardType='default'
							autoCapitalize='none'
							allowFontScaling
							autoCorrect
							autoFocus
							blurOnSubmit={false}
							caretHidden={false}
							clearButtonMode='while-editing'
							contextMenuHidden={false}
							editable
							enablesReturnKeyAutomatically={false}
							underlineColorAndroid='transparent'
							keyboardAppearance='dark'
							maxLength={10}
							multiline={false}
							numberOfLines={1} // android
							returnKeyLabel='next' // android
							secureTextEntry={false} // password
							spellCheck
							textContentType='none'
							returnKeyType='next'
							textsize={14}
							height={40}
							width={270}
							borderWidth={0.3}
							onChangeText={handleChange(
								'fullname',
							)}
							onBlur={handleBlur('fullname')}
							selectionColor={
								themeContext.PRIMARY_COLOR
							}
						/>
						{errors.fullname ? (
							<ETAErrorMessage size={12}>
								{errors.fullname}
							</ETAErrorMessage>
						) : null}
						<ETATextInputOutline
							value={values.username}
							placeholder='Username'
							placeholderTextColor={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
							keyboardType='default'
							autoCapitalize='none'
							allowFontScaling
							autoCorrect
							autoFocus
							blurOnSubmit={false}
							caretHidden={false}
							clearButtonMode='while-editing'
							contextMenuHidden={false}
							editable
							enablesReturnKeyAutomatically={false}
							underlineColorAndroid='transparent'
							keyboardAppearance='dark'
							maxLength={10}
							multiline={false}
							numberOfLines={1} // android
							returnKeyLabel='next' // android
							secureTextEntry={false} // password
							spellCheck
							textContentType='none'
							returnKeyType='next'
							textsize={14}
							height={40}
							width={270}
							borderWidth={0.3}
							onChangeText={handleChange(
								'username',
							)}
							onBlur={handleBlur('username')}
							selectionColor={
								themeContext.PRIMARY_COLOR
							}
						/>
						{errors.username ? (
							<ETAErrorMessage size={12}>
								{errors.username}
							</ETAErrorMessage>
						) : null}
						<ETATextInputOutline
							value={values.cellphone}
							placeholder='Cellphone'
							placeholderTextColor={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
							keyboardType='phone-pad'
							autoCapitalize='none'
							allowFontScaling
							autoCorrect
							autoFocus
							blurOnSubmit={false}
							caretHidden={false}
							clearButtonMode='while-editing'
							contextMenuHidden={false}
							editable
							enablesReturnKeyAutomatically={false}
							underlineColorAndroid='transparent'
							keyboardAppearance='dark'
							maxLength={10}
							multiline={false}
							numberOfLines={1} // android
							returnKeyLabel='next' // android
							secureTextEntry={false} // password
							spellCheck
							textContentType='none'
							returnKeyType='next'
							textsize={14}
							height={40}
							width={270}
							borderWidth={0.3}
							onChangeText={handleChange(
								'cellphone',
							)}
							onBlur={handleBlur('cellphone')}
							selectionColor={
								themeContext.PRIMARY_COLOR
							}
						/>
						{errors.cellphone ? (
							<ETAErrorMessage size={12}>
								{errors.cellphone}
							</ETAErrorMessage>
						) : null}
						<ETATextInputOutline
							value={values.password}
							placeholder='Password'
							placeholderTextColor={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
							keyboardType='default'
							autoCapitalize='none'
							allowFontScaling
							autoCorrect
							autoFocus={false}
							blurOnSubmit={false}
							caretHidden={false}
							clearButtonMode='while-editing'
							contextMenuHidden={false}
							editable
							enablesReturnKeyAutomatically={false}
							underlineColorAndroid='transparent'
							keyboardAppearance='dark'
							maxLength={100}
							multiline={false}
							numberOfLines={1} // android
							returnKeyLabel='next' // android
							secureTextEntry={mysecureTextEntry} // password
							spellCheck
							textContentType='none'
							returnKeyType='none'
							textsize={14}
							height={40}
							width={270}
							borderWidth={0.3}
							onChangeText={handleChange(
								'password',
							)}
							onBlur={handleBlur('password')}
							selectionColor={
								themeContext.PRIMARY_COLOR
							}
						/>

						{errors.password ? (
							<ETAErrorMessage size={12}>
								{errors.password}
							</ETAErrorMessage>
						) : null}
						<ETATextInputOutline
							value={values.confirmPassword}
							placeholder='Confirm password'
							placeholderTextColor={
								themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
							}
							keyboardType='default'
							autoCapitalize='none'
							allowFontScaling
							autoCorrect
							autoFocus={false}
							blurOnSubmit={false}
							caretHidden={false}
							clearButtonMode='while-editing'
							contextMenuHidden={false}
							editable
							enablesReturnKeyAutomatically={false}
							underlineColorAndroid='transparent'
							keyboardAppearance='dark'
							maxLength={100}
							multiline={false}
							numberOfLines={1} // android
							returnKeyLabel='next' // android
							secureTextEntry={mysecureTextEntry} // password
							spellCheck
							textContentType='none'
							returnKeyType='none'
							textsize={14}
							height={40}
							width={270}
							borderWidth={0.3}
							onChangeText={handleChange(
								'confirmPassword',
							)}
							onBlur={handleBlur('confirmPassword')}
							selectionColor={
								themeContext.PRIMARY_COLOR
							}
						/>
						{errors.confirmPassword ? (
							<ETAErrorMessage size={12}>
								{errors.confirmPassword}
							</ETAErrorMessage>
						) : null}
						<ButtonContainer>
							<ETAButtonFilled
								title={signup}
								onPress={handleSubmit}
								disabled={!!isSubmitting}
								colorButton={
									themeContext.SECONDARY_BACKGROUND_COLOR
								}
								padding={10}
								width={isSubmitting ? 40 : 270}
								borderRadius={
									isSubmitting ? 20 : 3
								}
							/>
						</ButtonContainer>
					</FormContainer>
				)}
			</Formik>
			{/* <Wrapper>
                <InputWrapper>
                    <Input
                    placeholder='Fullname'
                    returnKeyType={'next'}
                    autoCapitalize='words'
                    onChangeText={text => setfullName(text)}
                    underlineColorAndroid='transparent'
                    onSubmitEditing={() => emailInput.focus()}
                    />
                </InputWrapper>
                <InputWrapper>
                    <Input
                    placeholder='Email'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    onChangeText={text => setemail(text)}
                    underlineColorAndroid='transparent'
                    ref={(input) => {this.emailInput = input }}
                    />
                </InputWrapper>
                <InputWrapper>
                    <Input
                    placeholder='Username'
                    autoCapitalize='none'
                    onChangeText={text => setusername(text)}
                    underlineColorAndroid='transparent'
                    />
                </InputWrapper>
                <InputWrapper>
                    <Input
                    placeholder='Password'
                    secureTextEntry
                    onChangeText={text => setpassword(text)}
                    underlineColorAndroid='transparent'
                    />
                </InputWrapper>
                <ButtonConfirm onPress={() => _onSignupPress()} disabled={() => _checkIfDisabled()}>
                    <ButtonConfirmText>
                        {signup}
                    </ButtonConfirmText>
                </ButtonConfirm>
            </Wrapper> */}
		</Root>
	)
}

export default SignupForm
// export default compose(
//         graphql(signupMutation),
//         connect(undefined, { login }),
//             )(SignupForm);
