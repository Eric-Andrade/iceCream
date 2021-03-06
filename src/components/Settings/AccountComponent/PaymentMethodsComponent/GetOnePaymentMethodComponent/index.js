import React from 'react'
import styled from 'styled-components/native'
import SubHeadGetOnePaymentMethodComponent from './SubHeadGetOnePaymentMethodComponent'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	background-color: transparent;
`

const GetOnePaymentMethodComponent = () => (
	<Root>
		<SubHeadGetOnePaymentMethodComponent />
	</Root>
)

export default GetOnePaymentMethodComponent
