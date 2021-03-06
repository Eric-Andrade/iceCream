import React from 'react'
import styled from 'styled-components/native'
import HeadPaymentMethodComponent from './HeadPaymentMethodComponent'
import SubHeadPaymentMethodComponent from './SubHeadPaymentMethodComponent'
import PaymentMethodsListComponent from './PaymentMethodsListComponent'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`

const PaymentMetodComponent = () => (
	<Root>
		<HeadPaymentMethodComponent />
		<SubHeadPaymentMethodComponent />
		<PaymentMethodsListComponent />
	</Root>
)

export default PaymentMetodComponent
