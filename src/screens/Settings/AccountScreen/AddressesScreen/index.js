import React from 'react'
import styled from 'styled-components/native'
import AddressesComponent from '@components/Settings/AccountComponent/AddressesComponent'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.theme.BACKGROUND_COLOR};
`

const AddressesScreen = () => (
	<Root>
		<AddressesComponent />
	</Root>
)

export default AddressesScreen
