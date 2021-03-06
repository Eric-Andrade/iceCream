import React, {useLayoutEffect} from 'react'
import styled from 'styled-components/native'
import GetOnePaymentMethodComponent from '@components/Settings/AccountComponent/PaymentMethodsComponent/GetOnePaymentMethodComponent'

const Root = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.BACKGROUND_COLOR};
`

const GetOnePaymentMethodScreen = ({navigation, route}) => {
	const {item} = route.params
	useLayoutEffect(() => {
		navigation.setOptions({headerTitle: item.details})
	}, [navigation, route])

	return (
		<Root>
			<GetOnePaymentMethodComponent />
		</Root>
	)
}

export default GetOnePaymentMethodScreen
