import React from 'react'
import styled from 'styled-components/native'
import PreviousOrdersComponent from '@components/Settings/AccountComponent/OrdersComponent/PreviousOrdersComponent'

const Root = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.BACKGROUND_COLOR};
`

const PreviousOrdersScreen = () => (
	<Root>
		<PreviousOrdersComponent />
	</Root>
)

export default PreviousOrdersScreen
